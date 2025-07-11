import { fetchAuth } from "@/libs/jwt"

export async function GET(request) {

  const lang = request.headers.get('lang') || 'es'

  if (!lang) {
    lang = request.headers.get('lang') || 'es'
  }

  // Read all params
  const getParams = new URLSearchParams(request.url.split('?')[1])

  // Build the search endpoint with all query parameters
  const endpoint = `search?${getParams}`

  const apiResponse = await fetchAuth(
    request,
    endpoint,
    'GET',
    null,
    lang
  )

  // Return formatted response
  const data = await apiResponse.json()
  return new Response(JSON.stringify(data), {
    status: apiResponse.status,
    headers: { 
      'Content-Type': 'application/json',
    },
  })
}