import { fetchJWT } from "@/libs/jwt"
import { cookies } from "next/headers"

export async function GET(request) {

  const cookieStore = await cookies()
  let accessToken = cookieStore.get('accessToken')?.value || ''
  let refreshToken = cookieStore.get('refreshToken')?.value || ''

  // Get data from headers if not exist
  if (!accessToken || !refreshToken) {
    accessToken = request.headers.get('accessToken') || ''
    refreshToken = request.headers.get('refreshToken') || ''
  }

  const lang = request.headers.get('lang') || 'es'

  let endpoint = `locations/`

  const apiResponse = await fetchJWT(
    request,
    endpoint,
    'GET',
    null,
    accessToken,
    refreshToken,
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
