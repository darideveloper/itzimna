/**
 * Fetch last properties from local API
 * 
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
 * @returns {String} return.propertiesData[].slug - Property slug from name
 * @returns {Number} return.count - Total count of properties
 */
export async function getPropertiesSummary(page = 1, filterFeatured = false) {
  const host = process.env.NEXT_PUBLIC_HOST
  let endpoint = `${host}/api/properties?page=${page}`
  if (filterFeatured) {
    endpoint += `&featured=true`
  }
  const res = await fetch(endpoint)
  const jsonData = await res.json()
  const results = await jsonData.results
  const count = await jsonData.count

  return { results, count }
}

/**
 * get all properties names
 * 
 * @returns {Array} - Properties names (name, id and slug)
 * @returns {String} return[].name - Property name
 * @returns {String} return[].id - Property id
 * @returns {String} return[].slug - Property slug
 */
export async function getPropertiesNames() {

  /**
   * Get slug from text
   * 
   * @param {String} text - Text to convert to slug
   * @returns {String} - Slug
   */

  const host = process.env.NEXT_PUBLIC_HOST
  let endpoint = `${host}/api/properties?page-size=10000&only-names=true`
  const res = await fetch(endpoint)
  const jsonData = await res.json()
  const propertiesNames = await jsonData.results

  return propertiesNames
}

/**
 * Fetch single property data from local API
 * 
 * @param {Number} id - Property ID
 * 
 * @returns {Object} - Properties data and count
 * @returns {Array} return.propertiesData - Properties data
 * @returns {Object} return.propertiesData[].banner - Property banner image
 * @returns {String} return.propertiesData[].banner.url - Property banner image URL
 * @returns {String} return.propertiesData[].banner.alt - Property banner image alt text
 * @returns {String} return.propertiesData[].company - Property company builder
 * @returns {String} return.propertiesData[].category - Property category
 * @returns {String} return.propertiesData[].description - Property description (in markdown)
 * @returns {Integer} return.propertiesData[].id - Property ID
 * @returns {Object} return.propertiesData[].images - Property images data
 * @returns {String} return.propertiesData[].images[].url - Property image URL
 * @returns {String} return.propertiesData[].images[].alt - Property image alt text
 * @returns {String} return.propertiesData[].location - Property location
 * @returns {String} return.propertiesData[].meters - Property size in square meters like "99.00"
 * @returns {String} return.propertiesData[].name - Property name
 * @returns {String} return.propertiesData[].price - Property price like "1,000.00"
 * @returns {String} return.propertiesData[].seller - Property seller name
 * @returns {String} return.propertiesData[].short_description - Property short description
 * @returns {String} return.propertiesData[].slug - Property slug from name
 */
export async function getProperty(id, accessToken, refreshToken, lang) {
  
  const host = process.env.NEXT_PUBLIC_HOST
  let endpoint = `${host}/api/properties/?details=true&id=${id}`
  const res = await fetch(endpoint, {
    headers: {
      'accessToken': accessToken,
      'refreshToken': refreshToken,
      'lang': lang
    }
  })

  // Validate if property exists
  if (res.status === 404) {
    return null
  }

  // Return property data
  const property = await res.json()
  return property
}