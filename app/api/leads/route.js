import { fetchJWT } from "@/libs/jwt"
import { cookies } from "next/headers"


export async function POST(request) {

  const cookieStore = await cookies()
  let accessToken = cookieStore.get('accessToken')?.value || ''
  let refreshToken = cookieStore.get('refreshToken')?.value || ''

  // Get data from headers if not exist
  if (!accessToken || !refreshToken) {
    accessToken = request.headers.get('accessToken') || ''
    refreshToken = request.headers.get('refreshToken') || ''
  }

  // Get post json data
  const jsonData = await request.json()

  const apiResponse = await fetchJWT(
    request,
    "leads/",
    'POST',
    JSON.stringify(jsonData),
    accessToken,
    refreshToken,
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
