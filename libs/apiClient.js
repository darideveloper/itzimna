/**
 * Fetch last properties from local API
 * @param {Number} page - Page number
 * @returns {Object} - Properties data and count
 * @returns {Array} return.propertiesData - Properties data
 * @returns {Number} return.count - Total count of properties
 */
export async function getProperties(page = 1, filterFeatured = false) {
  const host = process.env.NEXT_PUBLIC_HOST
  let endpoint = `${host}/api/properties?page=${page}`
  if (filterFeatured) {
    endpoint += `&featured=true`
  }
  const propertiesRes = await fetch(endpoint)
  console.log({propertiesRes, endpoint})
  const propertiesJson = await propertiesRes.json()
  const propertiesData = await propertiesJson.results
  const pages = await Math.ceil(propertiesJson.count / 8)

  return { propertiesData, pages }
}