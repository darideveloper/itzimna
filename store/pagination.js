import { create } from 'zustand'

export const usePaginationStore = create((set) => ({
  pageNew: 1, // new properties current page
  pageFeatured: 1, // featured properties current page
  pageResults: 1, // search results current page
  setPageNew: (page) => set(() => ({ pageNew: page })),
  setPageFeatured: (page) => set(() => ({ pageFeatured: page })),
  setPageResults: (page) => set(() => ({ pageResults: page })),
}))