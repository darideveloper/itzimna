import { fetchAuth } from "@/libs/jwt"

export async function GET(request) {

  const lang = request.headers.get('lang') || 'es'

  let endpoint = `locations/`

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
