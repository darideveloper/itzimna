/**
 * Fetch using auth system (basic token)
 * Method to use in server API routes.
 * 
 * @param {Request} request - Request object from the server
 * @param {string} endpoint - API endpoint to fetch
 * @param {string} method - HTTP method to use
 * @param {string} body - JSON stringified or boday data to send
 * @param {string} langDefault - Default language
 */
export async function fetchAuth(
  request,
  endpoint,
  method,
  body,
  langDefault = "es"
) {
  // Env vars
  const apiBaseUrl = process.env.API_BASE_URL
  const apiToken = process.env.API_TOKEN

  // Get lang from headers
  const lang = request.headers.get("lang") || langDefault

  const res = await fetch(`${apiBaseUrl}/${endpoint}`, {
    method: method,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Token ${apiToken}`,
      "Accept-Language": lang,
    },
    body: body,
  })
  return res
}
