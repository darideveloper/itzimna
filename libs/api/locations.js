// Global variables
const host = process.env.NEXT_PUBLIC_HOST

/**
 * Save a lead using lecal API
 */
export async function getLocations(locale) {
  
  let endpoint = `${host}/api/locations/`
  const res = await fetch(endpoint, {
    headers: {
      'locale': locale
    }
  })
  const jsonData = await res.json()

  return jsonData
}
