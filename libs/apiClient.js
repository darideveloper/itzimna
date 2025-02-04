/**
 * Fetch last properties from local API
 * @param {Number} page - Page number
 * @returns {Object} - Properties data and count
 * @returns {Array} return.propertiesData - Properties data
 * @returns {Number} return.count - Total count of properties
 */
export async function getLastProperties(page = 1) {
  const host = process.env.NEXT_PUBLIC_HOST
  const propertiesRes = await fetch(`${host}/api/properties?page=${page}`)
  const propertiesJson = await propertiesRes.json()
  const propertiesData = await propertiesJson.results
  const count = await propertiesJson.count

  return { propertiesData, count }
}