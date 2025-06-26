import { create } from 'zustand'
import { globalSearchAPI } from '@/libs/api/global-search'

export const useGlobalSearchStore = create((set, get) => ({
  // Search state
  query: "",
  results: [],
  loading: false,
  error: null,
  
  // Pagination state
  currentPage: 1,
  totalPages: 1,
  totalResults: 0,
  hasNextPage: false,
  hasPrevPage: false,
  
  // Search actions
  setQuery: (query) => set({ query }),
  
  setLoading: (loading) => set({ loading }),
  
  setError: (error) => set({ error }),
  
  // Main search function
  searchProperties: async (searchQuery, page = 1) => {
    const state = get()
    
    // Set loading state
    set({ loading: true, error: null })
    
    try {
      // Call global search API
      const response = await globalSearchAPI(searchQuery, page, 6)
      
      // Calculate pagination info from response
      const totalResults = response.count
      const totalPages = Math.ceil(totalResults / 6) // 6 results per page
      const hasNextPage = response.next !== null
      const hasPrevPage = response.previous !== null
      
      // Update state with results
      set({
        query: searchQuery,
        results: response.results,
        currentPage: page,
        totalPages,
        totalResults,
        hasNextPage,
        hasPrevPage,
        loading: false,
        error: null
      })
      
      return response
    } catch (error) {
      console.error('Search error:', error)
      set({
        loading: false,
        error: 'Error al realizar la búsqueda. Intenta de nuevo.',
        results: []
      })
      throw error
    }
  },
  
  // Page change function
  changePage: async (page) => {
    const state = get()
    
    if (page < 1 || page > state.totalPages) return
    
    await state.searchProperties(state.query, page)
  },
  
  // Clear search
  clearSearch: () => set({
    query: "",
    results: [],
    currentPage: 1,
    totalPages: 1,
    totalResults: 0,
    hasNextPage: false,
    hasPrevPage: false,
    error: null
  }),
  
  // Initialize with default results (no search query)
  loadDefaultResults: async () => {
    const state = get()
    await state.searchProperties("", 1)
  }
})) 