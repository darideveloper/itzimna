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

  setLocale: (locale) => set({ locale }),
  
  // Main search function
  searchProperties: async (searchQuery, page = 1) => {
    const state = get()
    
    console.log('searchProperties called with:', { searchQuery, page, locale: state.locale })
    
    // Set loading state
    set({ loading: true, error: null })
    
    try {
      // Call global search API
      const response = await globalSearchAPI(searchQuery, page, state.locale)
      
      console.log('API response:', response)
      
      // Calculate pagination info from response
      const totalResults = response.count || 0
      // Use API pagination info if available, otherwise calculate
      const totalPages = response.total_pages || Math.ceil(totalResults / 8) // 8 results per page
      const hasNextPage = response.next !== null
      const hasPrevPage = response.previous !== null
      
      console.log('Calculated pagination:', { totalResults, totalPages, hasNextPage, hasPrevPage })
      
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
    
    console.log('changePage called with:', page)
    console.log('Current state:', { 
      query: state.query, 
      currentPage: state.currentPage, 
      totalPages: state.totalPages 
    })
    
    // Validate page number
    if (page < 1) {
      console.log('Page number too low:', page)
      return
    }
    if (state.totalPages > 0 && page > state.totalPages) {
      console.log('Page number too high:', page, 'max:', state.totalPages)
      return
    }
    
    // Call searchProperties with current query and new page
    console.log('Calling searchProperties with:', state.query, page)
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