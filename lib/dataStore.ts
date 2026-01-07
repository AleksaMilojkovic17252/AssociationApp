import { File, Paths } from "expo-file-system";

import { create } from "zustand";

import { DataType } from "@/model/dataType";

export interface DataState {
  file: File;
  items: DataType[];
  selectedItem?: DataType;
  loadItems: () => void;
  addItem: (item: DataType) => void;
  selectItem: (item?: DataType) => void;
  removeItem: (item: DataType) => void;
}

export const useAssociationStore = create<DataState>((set, get) => ({
  items: [],
  file: new File(Paths.document, "association_data.txt"),
  selectedItem: undefined,
  loadItems: () => {
    const file = get().file;
    if (!file.exists) return;

    const rawContent = file.textSync();
    const lines = rawContent.split("\n").filter((line) => line.trim() !== "");

    const dataLines = lines.slice(2);

    const items: DataType[] = dataLines
      .map((line) => {
        const matches = [...line.matchAll(/"([^"]*)"/g)];

        if (matches.length >= 2) {
          return {
            title: matches[0][1],
            description: matches[1][1],
          };
        }
        return null;
      })
      .filter((item) => item !== null);
    set({ items });
  },
  addItem: (newItem) => {
    if (get().items.some((x) => x.title == newItem.title))
      throw new Error("Can't have 2 items with the same title");
    const file = get().file;
    const cleanTitle = newItem.title.replace(/"/g, '""');
    const cleanDescription = newItem.description.replace(/"/g, '""');

    const newEntry = `"${cleanTitle}" : "${cleanDescription}"\n`;

    if (file.exists) {
      const current = file.textSync();
      file.write(current + newEntry);
    } else {
      const header = "Version: 1\nTitle : Description\n";
      file.write(header + newEntry);
    }
    set((state) => ({
      items: [
        ...state.items,
        { ...newItem, id: state.items.length.toString() },
      ],
    }));
  },
  removeItem: (item) => {
    const updatedItems = get().items.filter(
      (data) => data.title !== item.title
    );
    let newFileContent = "Version: 1\nTitle : Description : Location\n";
    updatedItems.forEach((item) => {
      newFileContent += `"${item.title}" : "${item.description}"\n`;
    });
    get().file.write(newFileContent);
    set({ items: updatedItems });
  },
  selectItem: (item) => {
    set({
      selectedItem: item,
    });
  },
}));
