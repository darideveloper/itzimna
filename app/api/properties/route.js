import { fetchJWT } from "@/libs/apiServer"

export async function GET(request) {

  // Get page from get params 
  const url = new URL(request.url)
  const getParams = url.searchParams

  const endpoint = `properties?${getParams}`
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
