import { NextResponse } from 'next/server'
import createMiddleware from 'next-intl/middleware'
import { routing } from '@/i18n/routing'

export default async function middleware(request) {

  const url = new URL(request.url)
  const pathname = url.pathname

  // Check if the request is for an API route
  if (pathname.includes('/api')) {

    const username = process.env.DASHBOARD_USER
    const password = process.env.DASHBOARD_PASSWORD
    const endpoint = `${process.env.DASHBOARD_HOST}/api/login/`

    try {
      const authResponse = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      })

      if (!authResponse.ok) {
        console.error('Authentication failed')
        return new NextResponse(
          JSON.stringify({ error: 'Authentication failed' }),
          { status: 401, headers: { 'Content-Type': 'application/json' } }
        )
      }

      const data = await authResponse.json()
      const token = data.data.token

      const responseWithCookie = NextResponse.next()
      responseWithCookie.cookies.set('Authorization', `Token ${token}`, { httpOnly: true })
      console.debug('Token set:', token)

      responseWithCookie.headers.set('Authorization', `Token ${token}`)
      console.debug('Token added to headers:', token)
      return responseWithCookie

    } catch (error) {
      console.error('Login failed:', error.message)
      return new NextResponse(
        JSON.stringify({ error: 'Authentication error', details: error }),
        { status: 500, headers: { 'Content-Type': 'application/json' } }
      )
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
