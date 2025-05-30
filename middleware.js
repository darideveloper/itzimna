import { NextResponse } from 'next/server'
import createMiddleware from 'next-intl/middleware'
import { routing } from '@/i18n/routing'

export default async function middleware(request) {

  const url = new URL(request.url)
  const pathname = url.pathname
  console.debug(`Incoming request for ${pathname}`)

  // Check if the request already has a locale in the URL
  const hasLocale = /^\/(es|en)(\/|$)/.test(pathname)

  // Check for the `lang` cookie
  const langCookie = request.cookies.get('NEXT_LOCALE')?.value

  // If there's no locale in the URL and no `lang` cookie, redirect to the default locale
  if (!hasLocale && !langCookie) {
    console.debug('Locale missing and no lang cookie found, redirecting to default...')
    url.pathname = `/${routing.defaultLocale}${pathname}`
    const response = NextResponse.redirect(url)
    response.headers.set('x-current-path', url.pathname)
    return response
  }

  // If the `lang` cookie exists but no locale is in the URL, redirect to the cookie's locale
  if (!hasLocale && langCookie && routing.locales.includes(langCookie)) {
    console.debug(`Locale missing, but lang cookie found: ${langCookie}. Redirecting...`)
    url.pathname = `/${langCookie}${pathname}`
    const response = NextResponse.redirect(url)
    response.headers.set('x-current-path', url.pathname)
    return response
  }

  // Add internationalization middleware for other routes
  console.debug('Proceeding with internationalization...')
  const response = await createMiddleware(routing)(request)
  response.headers.set('x-current-path', pathname)
  return response
}

export const config = {
  matcher: ['/', '/(es|en)/:path*'],
}
