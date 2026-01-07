import { DataType } from "@/model/dataType";
import { File, Paths } from "expo-file-system";
import { create } from "zustand";

export interface DataState {
  file: File;
  items: DataType[];
  selectedItem?: DataType;
  loadItems: () => void;
  addItem: (item: DataType) => void;
  selectItem: (item?: DataType) => void;
  removeItem: (item: DataType) => void;
}

const escapeData = (text: string) => text.replace(/:/g, "/:");

const unescapeData = (text: string) => text.replace(/\/:/g, ":");

export const useAssociationStore = create<DataState>((set, get) => ({
  items: [],
  file: new File(Paths.document, "association_data.txt"),
  selectedItem: undefined,

  loadItems: () => {
    const file = get().file;
    if (!file.exists) return;

    const rawContent = file.textSync();
    const lines = rawContent.split("\n").filter((line) => line.trim() !== "");

    const dataLines = lines.slice(1);

    const items: DataType[] = dataLines
      .map((line) => {
        const parts = line.split(/(?<!\/):/);

        if (parts.length >= 2) {
          return {
            title: unescapeData(parts[0].trim()),
            description: unescapeData(parts[1].trim()),
          };
        }
        return null;
      })
      .filter((item): item is DataType => item !== null);

    set({ items });
  },

  addItem: (newItem) => {
    if (get().items.some((x) => x.title === newItem.title))
      throw new Error("Can't have 2 items with the same title");

    const file = get().file;

    const safeTitle = escapeData(newItem.title);
    const safeDescription = escapeData(newItem.description);

    const newEntry = `${safeTitle} : ${safeDescription}\n`;

    if (file.exists) {
      const current = file.textSync();
      file.write(current + newEntry);
    } else {
      const header = "1\n";
      file.write(header + newEntry);
    }

    set((state) => ({
      items: [...state.items, newItem],
    }));
  },

  removeItem: (item) => {
    const updatedItems = get().items.filter(
      (data) => data.title !== item.title
    );

    let newFileContent = "1\n";
    updatedItems.forEach((it) => {
      newFileContent += `${escapeData(it.title)} : ${escapeData(
        it.description
      )}\n`;
    });

    get().file.write(newFileContent);
    set({ items: updatedItems });
  },

  selectItem: (item) => {
    set({ selectedItem: item });
  },
}));
