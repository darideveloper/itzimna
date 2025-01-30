import { fetchJWT } from "@/libs/api"

export async function GET(request) {

  const apiResponse = await fetchJWT(request, 'properties/', 'GET')

  // Return formatted response
  const data = await apiResponse.json()
  return new Response(JSON.stringify(data), {
    status: apiResponse.status,
    headers: { 
      'Content-Type': 'application/json',
    },
  })
}
