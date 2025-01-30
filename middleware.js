import { NextResponse } from 'next/server'
import createMiddleware from 'next-intl/middleware'
import { routing } from '@/i18n/routing'
import { api } from '@/libs/api'

export default async function middleware(request) {

  const url = new URL(request.url)
  const pathname = url.pathname

  // Check if the request is for an API route
  // if (pathname.includes('/api')) {
  // }

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
  matcher: ['/', '/(es|en)/:path*'],
}
