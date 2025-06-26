/**
 * Global search API function - calls the real backend API
 * @param {string} query - Search query
 * @param {number} page - Page number (default: 1)
 * @param {number} limit - Results per page (default: 6)
 * @returns {Promise<Object>} Search results from real API
 */
export const globalSearchAPI = async (query = "", page = 1, limit = 6) => {
  try {
    // Build the API URL - uses our Next.js API route
    const baseUrl = '/api/search'
    const params = new URLSearchParams()
    
    if (query.trim()) {
      params.append('q', query.trim())
    }
    params.append('page', page.toString())
    
    const url = `${baseUrl}?${params.toString()}`
    
    // Make the API request
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
    
    if (!response.ok) {
      throw new Error(`API request failed with status ${response.status}`)
    }
    
    const data = await response.json()
    return data
    
  } catch (error) {
    console.error('Global search API error:', error)
    throw error
  }
}
