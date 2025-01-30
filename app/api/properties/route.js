export async function GET(request) {

  // Get envs and cookies
  const apiBaseUrl = process.env.API_BASE_URL
  const endpoint = `${apiBaseUrl}/properties/`
  const token = request.cookies.get('accessToken').value
  const lang = request.cookies.get('NEXT_LOCALE').value
  console.debug({ apiBaseUrl, endpoint, token, lang })

  // Api call with token
  const apiResponse = await fetch(endpoint, {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${token}`, // from middleware.js
      'Accept-Language': lang,
    }
  })
  
  // Return formatted response
  const data = await apiResponse.json()
  return new Response(JSON.stringify(data), {
    status: apiResponse.status,
    headers: { 
      'Content-Type': 'application/json',
    },
  })
}
