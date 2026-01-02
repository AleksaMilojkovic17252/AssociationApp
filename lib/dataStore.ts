import { DataType } from "@/model/dataType";
import { File, Paths } from "expo-file-system";
import { create } from "zustand";

const SOH = "\u0001"; // SOH

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
    const parts = rawContent.split(SOH).filter((part) => part.trim() !== "");
    const parsedItems = parts.map((block, index) => {
      const [title, ...descLines] = block.trim().split("\n");
      return {
        title: title.trim(),
        description: descLines.join("\n").trim(),
      };
    });
    set({ items: parsedItems });
  },
  addItem: (newItem) => {
    if (get().items.some((x) => x.title == newItem.title))
      throw new Error("Can't have 2 items with the same title");
    const file = get().file;
    const newEntry = `${newItem.title}\n${newItem.description}\n${SOH}\n`;
    if (file.exists) {
      const currentContent = get().file.textSync();
      file.write(currentContent + newEntry);
    } else {
      file.create();
      file.write(newEntry);
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
    const newFileContent = updatedItems
      .map((item) => `${item.title}\n${item.description}\n${SOH}\n`)
      .join("");
    get().file.write(newFileContent);
    set({ items: updatedItems });
  },
  selectItem: (item) => {
    set({
      selectedItem: item,
    });
  },
}));
