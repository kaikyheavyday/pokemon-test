import { create } from "zustand";

type Store = {
  query: IQuery;
  cart: ICart[];
  search: string;
  isMenu: boolean;
  setQuery: (query: IQuery) => void;
  setCart: (cart: ICart[]) => void;
  setSearch: (value: string) => void;
  setIsMenu: (val: boolean) => void;
};

export const useStore = create<Store>()((set) => ({
  query: {
    offset: 0,
    limit: 12,
  },
  cart: [],
  search: "",
  isMenu: true,
  setQuery: (query: IQuery) => set(() => ({ query })),
  setCart: (cart: ICart[]) => set(() => ({ cart })),
  setSearch: (value: string) => set(() => ({ search: value })),
  setIsMenu: (val: boolean) => set(() => ({ isMenu: val })),
}));
