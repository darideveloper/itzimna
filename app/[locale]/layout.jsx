// Internationzation
import { NextIntlClientProvider } from 'next-intl'
import { getMessages } from 'next-intl/server'
import { notFound } from 'next/navigation'
import { routing } from '@/i18n/routing'
import { getTranslations } from 'next-intl/server'
import { headers } from 'next/headers'

// Fonts
import { fontBody } from '@/libs/fonts'

// Global components
import Header from '@/components/layouts/Header'
import Footer from '@/components/layouts/Footer'
import VideoModal from '@/components/ui/VideoModal'
import Script from 'next/script'

// Css
import '@/css/globals.sass'

/**
 * Main layout with locale (header, footer, and children)
 * 
 * @param {object} props - Props object
 * @param {object} props.children - Children components
 * @param {object} props.params - Parameters object
 * @returns 
 */
export default async function LocaleLayout({ children, params }) {

  // Ensure that the incoming `locale` is valid
  const { locale } = await params
  if (!routing.locales.includes(locale)) {
    notFound()
  }

  // Providing all messages to the client
  // side is the easiest way to get started
  const messages = await getMessages()

  return (
    <html lang={locale}>
      <body
        className={`
          ${fontBody.className}
        `}
      >
        {/* Google Tag Manager Script */}
        <Script
          strategy="afterInteractive"
          src="https://www.googletagmanager.com/gtag/js?id=G-J33X5K048Q"
        />
        <Script
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-J33X5K048Q');
          `,
          }}
        />

        <NextIntlClientProvider messages={messages}>
          <Header />
          <main>
            {/* <VideoModal /> */}
            {children}
          </main>
          <Footer />
        </NextIntlClientProvider>
      </body>
    </html>
  )
}

export async function generateMetadata({ params }, parent) {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'Meta' })

  // Try to get the current path from the parent metadata context (Next.js 14+)
  let currentPath = ''
  if (parent?.pathname) {
    currentPath = parent.pathname
  } else if (typeof headers === 'function') {
    // Fallback: get from headers (set by middleware)
    const headersList = await headers()
    currentPath = headersList.get('x-current-path') || `/${locale}`
  } else {
    currentPath = `/${locale}`
  }

  const domain = process.env.NEXT_PUBLIC_HOST
  // Remove locale from URL to get the base path for canonical
  const canonicalPath = currentPath.replace(/^\/(en|es)/, '')
  const canonicalUrl = `${domain}/${locale}${canonicalPath}`

  const image = {
    url: `${domain}/images/home-banner.webp`,
    width: 800,
    height: 600,
    alt: t('title'),
  }

  return {
    title: {
      default: t('title'),
      template: `%s | ${t('title')}`,
    },
    description: t('description.home'),
    keywords: t('keywords'),
    authors: [
      { "name": t('title') }
    ],
    icons: "/favicon.ico",

    // Canonical and alternate links
    alternates: {
      canonical: canonicalUrl,
      languages: {
        en: `${domain}/en${canonicalPath}`,
        es: `${domain}/es${canonicalPath}`,
        'x-default': `${domain}${canonicalPath}`,
      },
    },

    // Open Graph metadata
    openGraph: {
      title: {
        default: t('title'),
        template: `%s | ${t('title')}`,
      },
      description: t('description.home'),
      url: canonicalUrl,
      siteName: t('title'),
      images: [image],
      locale,
      type: "website",
    },

    // Twitter metadata
    twitter: {
      card: "summary_large_image",
      title: {
        default: t('title'),
        template: `%s | ${t('title')}`,
      },
      description: t('description.home'),
      images: [image],
      creator: "@DeveloperDari",
    },
  }
}
