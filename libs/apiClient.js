/**
 * Fetch last properties from local API
 * @param {Number} page - Page number
 * @returns {Array} Properties data 
 */
export async function getLastProperties(page = 1) {
  const host = process.env.NEXT_PUBLIC_HOST
  const propertiesRes = await fetch(`${host}/api/properties?page=${page}`)
  const propertiesJson = await propertiesRes.json()
  const propertiesData = await propertiesJson.results

  return propertiesData
}