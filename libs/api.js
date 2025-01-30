import axios from 'axios'
import createAuthRefreshInterceptor from 'axios-auth-refresh'
import { getCookie, setCookie, deleteCookie } from 'cookies-next'


// Create an axios instance
export const api = axios.create({
  baseURL: process.env.API_BASE_URL,
  withCredentials: true, // Include cookies if needed
})

// Auto refresh the token
const refreshAuthLogic = async (failedRequest) => {
  try {
    // Call backend to refresh the token
    const refresh = getCookie('refreshToken')
    console.log('>>> refresh', refresh)
    const response = await axios.post(process.env.API_BASE_URL + '/token/refresh/', {
      // Get the refresh token from storage
      refresh: getCookie('refreshToken'),
    })

    // Update the access token in cookies
    const accessToken = response.data.data.access
    setCookie('accessToken', accessToken)

    // Update the failed request's headers with the new token
    failedRequest.response.config.headers['Authorization'] = `Bearer ${accessToken}`

    return Promise.resolve()

  } catch (error) {
    try {
      // Attempt to log in with username and password
      const loginResponse = await axios.post(process.env.API_BASE_URL + '/token/', {
        username: process.env.API_USER,
        password: process.env.API_PASS,
      })

      // Save access and refresh tokens
      const accessToken = loginResponse.data.data.access
      const refreshToken = loginResponse.data.data.refresh
      setCookie('accessToken', accessToken) // Ensure this matches the response structure
      setCookie('refreshToken', refreshToken) // Ensure this matches the response structure

      // Update the failed request's headers with the new token
      failedRequest.response.config.headers['Authorization'] = `Bearer ${accessToken}`

      return Promise.resolve()
    } catch (loginError) {
      console.error('Login failed:', loginError)
      // Handle login failure (e.g., redirect to login page)
      deleteCookie('accessToken')
      deleteCookie('refreshToken')
      return Promise.reject(loginError)
    }
  }
}

// Attach the refresh logic to axios
createAuthRefreshInterceptor(api, refreshAuthLogic)

// Add a request interceptor to attach the access token to every request
api.interceptors.request.use((config) => {
  const accessToken = getCookie('accessToken')
  if (accessToken) {
    config.headers['Authorization'] = `Bearer ${accessToken}`
  }
  return config
})