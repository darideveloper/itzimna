// Api calls
/**
 * Fetch last properties from local API
 * @param {Number} page - Page number
 * @param {Boolean} filterFeatured - Filter only featured properties
 * 
 * @returns {Object} - Properties data and count
 * @returns {Array} return.propertiesData - Properties data
 * @returns {Object} return.propertiesData[].banner - Property banner image
 * @returns {String} return.propertiesData[].banner.url - Property banner image URL
 * @returns {String} return.propertiesData[].banner.alt - Property banner image alt text
 * @returns {String} return.propertiesData[].company - Property company builder
 * @returns {String} return.propertiesData[].category - Property category
 * @returns {Integer} return.propertiesData[].id - Property ID
 * @returns {String} return.propertiesData[].location - Property location
 * @returns {String} return.propertiesData[].meters - Property size in square meters like "99.00"
 * @returns {String} return.propertiesData[].name - Property name
 * @returns {String} return.propertiesData[].price - Property price like "1,000.00"
 * @returns {String} return.propertiesData[].seller - Property seller name
 * @returns {String} return.propertiesData[].short_description - Property short description
 * @returns {Number} return.count - Total count of properties
 */
export async function getProperties(page = 1, filterFeatured = false) {
  const host = process.env.NEXT_PUBLIC_HOST
  let endpoint = `${host}/api/properties?page=${page}`
  if (filterFeatured) {
    endpoint += `&featured=true`
  }
  const propertiesRes = await fetch(endpoint)
  const propertiesJson = await propertiesRes.json()
  const propertiesData = await propertiesJson.results
  const count = await propertiesJson.count

  return { propertiesData, count }
}