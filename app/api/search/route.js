import { fetchJWT } from "@/libs/jwt"
import { cookies } from "next/headers"

export async function GET(request) {

  const cookieStore = await cookies()
  let accessToken = cookieStore.get('accessToken')?.value || ''
  let refreshToken = cookieStore.get('refreshToken')?.value || ''
  let lang = request.cookies.get("NEXT_LOCALE")?.value || ''

  // Get data from headers if not exist
  if (!accessToken || !refreshToken) {
    accessToken = request.headers.get('accessToken') || ''
    refreshToken = request.headers.get('refreshToken') || ''
  }
  
  if (!lang) {
    lang = request.headers.get('lang') || 'es'
  }

  // Read all params
  const getParams = new URLSearchParams(request.url.split('?')[1])

  // Build the search endpoint with all query parameters
  const endpoint = `search?${getParams}`

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