// Global variables
const host = process.env.NEXT_PUBLIC_HOST

/**
 * Fetch last properties from local API
 * 
 * @param {String} locale - Locale ('es', 'en')
 * @param {Number} page - Page number
 * @param {Boolean} filterFeatured - Filter only featured properties
 * @param {String} searchQuery - Search query (additional filters)
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
export async function getProperties(locale, page = 1, filterFeatured = false, searchQuery = "") {

  // Get data
  let endpoint = `${host}/api/properties?page=${page}`
  if (searchQuery) {
    endpoint += `&${searchQuery}`
  }
  if (filterFeatured) {
    endpoint += `&featured=true`
  }
  const propertiesRes = await fetch(endpoint, {
    // Send locale in headers
    headers: {
      'lang': locale
    }
  })
  const propertiesJson = await propertiesRes.json()
  const propertiesData = await propertiesJson.results

  // Count number of pages
  const pages = await Math.ceil(propertiesJson.count / 8)

  // Format tags in each property
  propertiesData.forEach((property) => {
    property.tags = property.tags.map((tag) => {
      return tag.name
    })
  })

  return { propertiesData, pages }
}

/**
 * Get all properties names from local API
 * 
 * @returns {Array} - Properties names (name, id and slug)
 * @returns {String} return - Properties data
 * @returns {String} return[].name - Property name
 * @returns {String} return[].id - Property id
 * @returns {String} return[].slug - Property slug
 * @returns {String} return[].location - Property location (in lang)
 * @returns {String} return[].company - Property company name
 */
export async function getPropertiesSummary(locale) {
  
  let endpoint = `${host}/api/properties?page-size=10000&summary=true`
  const res = await fetch(endpoint, {
    headers: {
      'lang': locale
    }
  })
  const jsonData = await res.json()
  const propertiesSummary = await jsonData.results

  return propertiesSummary
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
 * @returns {String} return.propertiesData[].google_maps_src - Google maps iframe src
 * @returns {String} return.propertiesData[].updated_at - Updated at date (timestamp)
 * @returns {Array} return.propertiesData[].tags - Property tags
 * @returns {String} return.propertiesData[].tags[].name - Property tag name
 * @returns {String} return.propertiesData[].tags[].id - Property tag id
 * @returns {String} return.propertiesData[].tags[].slug - Property tag slug
 * @returns {Object} return.propertiesData[].related_properties[] - Related properties data
 */
export async function getProperty(id, lang) {
  
  let endpoint = `${host}/api/properties/?details=true&id=${id}`
  const res = await fetch(endpoint, {
    headers: {
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