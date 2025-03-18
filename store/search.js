import { create } from 'zustand'

export const useSearchStore = create((set) => ({
  selectedLocation: {value: "", label: ""},
  selectedSize: {value: "", label: ""},
  selectedPrice: {value: "", label: ""},
  searchQuery: "",
  setSelectedLocation: (location) => set({ selectedLocation: location }),
  setSelectedSize: (size) => set({ selectedSize: size }),
  setSelectedPrice: (price) => set({ selectedPrice: price }),
  setSearchQuery: (query) => set({ searchQuery: query }),
}))