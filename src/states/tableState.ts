import { create } from "zustand";

interface TableState {
  cellW: number;
  setCellW: (num: number) => void;
  cellH: number;
  setCellH: (num: number) => void;
}

const useTableState = create<TableState>((set) => ({
  cellW: 30,
  setCellW: (num) => set({ cellW: num }),
  setCellH: (num) => set({ cellH: num }),
  cellH: 10,
}));
