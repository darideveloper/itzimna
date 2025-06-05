// Global variables
const host = process.env.NEXT_PUBLIC_HOST

/**
 * Save a lead using lecal API
 */
export async function getBestDevelopmentsImages(locale) {

  let endpoint = `${host}/api/best-developments-images/`
  const res = await fetch(endpoint, {
    headers: {
      'lang': locale
    }
  })
  const jsonData = await res.json()

  return jsonData
}
