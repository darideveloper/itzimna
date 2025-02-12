import { cookies } from "next/headers"

export async function fetchJWT(
  request,
  endpoint,
  method,
  body,
  accessTokenDefault,
  refreshTokenDefault,
  langDefault
) {
  // Env vars
  const apiUser = process.env.API_USER
  const apiPass = process.env.API_PASS
  const apiBaseUrl = process.env.API_BASE_URL
  const host = process.env.NEXT_PUBLIC_HOST

  // get cookies
  const cookieStore = await cookies()
  let accessToken = cookieStore.get("accessToken")?.value || null
  let refreshToken = cookieStore.get("refreshToken")?.value || null
  let lang = request.cookies.get("NEXT_LOCALE")?.value || null

  console.debug("jwt 1", { accessToken, refreshToken, lang, endpoint })

  // Use default values if not cookies
  if (!accessToken) {
    accessToken = accessTokenDefault
  }
  if (!refreshToken) {
    refreshToken = refreshTokenDefault
  }
  if (!lang) {
    lang = langDefault
  }

  console.debug("jwt 2", { accessToken, refreshToken, lang, endpoint })
  

  const cookiesOptions = {
    httpOnly: true,
    path: "/",
    sameSite: "Lax",
  }

  async function getRequestEndpoint(token) {
    const res = await fetch(`${apiBaseUrl}/${endpoint}`, {
      method: method,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
        "Accept-Language": lang,
      },
      body: body,
    })
    return res
  }

  // Try to fetch with current access token
  const response = await getRequestEndpoint(accessToken)

  // Return response if valid
  if (response.ok) {
    console.debug("Access token working")
    return response
  }
  console.debug("Access token expired")

  // Try to refresh access token when it's expired
  const refreshResponse = await fetch(`${apiBaseUrl}/token/refresh/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ refresh: refreshToken }),
  })

  // Catch refresh failure
  if (refreshResponse.ok) {
    console.debug("Refresh token working")
    const jsonData = await refreshResponse.json()
    const newAccessToken = jsonData.data.access

    // Update cookies
    cookieStore.set("accessToken", newAccessToken, cookiesOptions)

    return await getRequestEndpoint(newAccessToken)
  }
  console.debug("Refresh token expired")

  // Try to log in when refresh token is expired
  const loginResponse = await fetch(`${apiBaseUrl}/token/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ username: apiUser, password: apiPass }),
  })

  if (loginResponse.ok) {
    console.debug("Logged")
    const jsonData = await loginResponse.json()
    const newAccessToken = jsonData.data.access
    const newRefreshToken = jsonData.data.refresh

    // Update cookies
    cookieStore.set("accessToken", newAccessToken, cookiesOptions)
    cookieStore.set("refreshToken", newRefreshToken, cookiesOptions)

    return await getRequestEndpoint(newAccessToken)
  } else {
    console.debug("Login error")
  }
}
