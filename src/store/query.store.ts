import { create } from "zustand";

type Store = {
  query: IQuery;
  setQuery: (query: IQuery) => void;
};

export const useStore = create<Store>()((set) => ({
  query: {
    offset: 0,
    limit: 12,
  },
  setQuery: (query: IQuery) => set(() => ({ query })),
}));
