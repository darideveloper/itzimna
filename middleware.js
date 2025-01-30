import { NextResponse } from 'next/server'
import createMiddleware from 'next-intl/middleware'
import { routing } from '@/i18n/routing'

export default async function middleware(request) {

  const url = new URL(request.url)
  const pathname = url.pathname
  console.debug(`Incoming request for ${pathname}`)

  // Check if the request is for an API route
  if (pathname.includes('/api')) {

    console.debug('API route detected, checking access token...')

    // Global response
    const nextResponse = NextResponse.next()

    // Global content type
    nextResponse.headers.set('Content-Type', 'application/json')

    /**
     * Update tokens in cookies
     * 
     * @param {string} accessToken - jwt access token
     * @param {string} refreshToken - jwt refresh token
     * @returns {string} newAccessToken
     */
    async function setResponseTokensHeaders(accessToken, refreshToken) {
      // Update cookies
      nextResponse.cookies.set('accessToken', accessToken, { httpOnly: true })
      nextResponse.cookies.set('refreshToken', refreshToken, { httpOnly: true })
    }

    const apiUser = process.env.API_USER
    const apiPass = process.env.API_PASS
    const apiBaseUrl = process.env.API_BASE_URL
    const accessToken = request.cookies.get('accessToken')?.value
    const refreshToken = request.cookies.get('refreshToken')?.value
    // console.debug({ apiUser, apiPass, apiBaseUrl, accessToken, refreshToken })

    // Validate current access token
    const validationResponse = await fetch(`${apiBaseUrl}/token/validate/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${accessToken}`
      },
    })

    // Add current token to response
    if (validationResponse.ok) {
      console.debug('Access token is valid')
      return nextResponse
    }
    console.debug('Access token is invalid')

    // Try to refresh access token when it's expired
    const refreshResponse = await fetch(`${apiBaseUrl}/token/refresh/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ refresh: refreshToken }),
    })

    // Catch refresh failure
    if (refreshResponse.ok) {
      console.debug('Access token refreshed')
      const jsonData = await refreshResponse.json()
      const newAccessToken = jsonData.data.access
      setResponseTokensHeaders(newAccessToken, refreshToken)
      return nextResponse
    }
    console.debug('Refresh token is invalid')

    // Try to log in when refresh token is expired
    const loginResponse = await fetch(`${apiBaseUrl}/token/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username: apiUser, password: apiPass }),
    })

    if (loginResponse.ok) {
      // Save tokens
      console.debug('Login successful')
      const jsonData = await loginResponse.json()
      const newAccessToken = jsonData.data.access
      const newRefreshToken = jsonData.data.refresh
      setResponseTokensHeaders(newAccessToken, newRefreshToken)
      return nextResponse
    } else {
      // Raise login error
      console.error('Login failed:', loginResponse)
      deleteCookie('accessToken')
      deleteCookie('refreshToken')
      return NextResponse.error(loginResponse)
    }

  }

    // Check if the request already has a locale in the URL
    const hasLocale = /^\/(es|en)(\/|$)/.test(pathname)

    // Check for the `lang` cookie
    const langCookie = request.cookies.get('NEXT_LOCALE')?.value

    // If there's no locale in the URL and no `lang` cookie, redirect to the default locale
    if (!hasLocale && !langCookie) {
      console.debug('Locale missing and no lang cookie found, redirecting to default...')
      url.pathname = `/${routing.defaultLocale}${pathname}`
      return NextResponse.redirect(url)
    }

    // If the `lang` cookie exists but no locale is in the URL, redirect to the cookie's locale
    if (!hasLocale && langCookie && routing.locales.includes(langCookie)) {
      console.debug(`Locale missing, but lang cookie found: ${langCookie}. Redirecting...`)
      url.pathname = `/${langCookie}${pathname}`
      return NextResponse.redirect(url)
    }

    // Add internationalization middleware for other routes
    console.debug('Proceeding with internationalization...')
    return createMiddleware(routing)(request)
  }

  export const config = {
    matcher: ['/', '/(es|en)/:path*', '/api/:path*'],
  }
