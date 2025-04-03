import { NextResponse } from 'next/server'
import createMiddleware from 'next-intl/middleware'
import { routing } from '@/i18n/routing'

export default async function middleware(request) {
  const url = new URL(request.url)
  const pathname = url.pathname
  console.debug(`Incoming request for ${pathname}`)

  // Check if the request already has a locale in the URL
  const hasLocale = /^\/(es|en)(\/|$)/.test(pathname)

  // If the request is for the root path `/`, serve it in Spanish without redirecting
  if (pathname === '/') {
    console.debug('Serving root path `/` in Spanish without redirect')
    url.pathname = `/es`
    return NextResponse.rewrite(url)
  }

  // Add internationalization middleware for other routes
  console.debug('Proceeding with internationalization...')
  return createMiddleware(routing)(request)
}

export const config = {
  matcher: ['/', '/(es|en)/:path*'],
}
