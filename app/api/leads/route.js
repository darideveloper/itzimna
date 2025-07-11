import { fetchAuth } from "@/libs/jwt"


export async function POST(request) {

  const lang = request.headers.get('lang') || 'es'

  // Get post json data
  const jsonData = await request.json()

  const apiResponse = await fetchAuth(
    request,
    "leads/",
    'POST',
    JSON.stringify(jsonData),
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
