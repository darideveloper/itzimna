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

  // read all params
  const getParams = new URLSearchParams(request.url.split('?')[1])

  // Get id from params and remove it from the params
  const id = getParams.get('id', null)
  getParams.delete('id')

  let endpoint
  if (id) {
    endpoint = `properties/${id}?${getParams}`
  } else {
    endpoint = `properties?${getParams}`
  }

  const apiResponse = await fetchJWT(
    request,
    endpoint,
    'GET',
    null,
    accessToken,
    refreshToken,
    lang
  )

  // // Debug
  // // Save html error response in a local temp html file
  // const htmlError = await apiResponse.text()
  // if (!apiResponse.ok) {
  //   console.error('Error:', htmlError)
  // }

  // Return formatted response
  const data = await apiResponse.json()
  return new Response(JSON.stringify(data), {
    status: apiResponse.status,
    headers: { 
      'Content-Type': 'application/json',
    },
  })
}
