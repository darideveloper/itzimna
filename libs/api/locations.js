// Global variables
const host = process.env.NEXT_PUBLIC_HOST

/**
 * Save a lead using lecal API
 */
export async function getLocations() {
  
  let endpoint = `${host}/api/locations/`
  const res = await fetch(endpoint)
  const jsonData = await res.json()

  return jsonData
}
