import { fetchJWT } from "@/libs/apiServer"

export async function GET(request) {

  // Get page from get params 
  const url = new URL(request.url)
  const page = url.searchParams.get('page')
  const featured = url.searchParams.get('featured')

  const endpoint = `properties?page=${page}${featured ? `&featured=${featured}` : ''}`
  const apiResponse = await fetchJWT(request, endpoint, 'GET')

  // Return formatted response
  const data = await apiResponse.json()
  return new Response(JSON.stringify(data), {
    status: apiResponse.status,
    headers: { 
      'Content-Type': 'application/json',
    },
  })
}
