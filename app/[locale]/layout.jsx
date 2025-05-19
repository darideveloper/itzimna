// Internationzation
import { NextIntlClientProvider } from 'next-intl'
import { getMessages } from 'next-intl/server'
import { notFound } from 'next/navigation'
import { routing } from '@/i18n/routing'
import { getTranslations } from 'next-intl/server'

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

export async function generateMetadata({ params }) {

  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'Meta' })

  const image = {
    url: `${process.env.NEXT_PUBLIC_HOST}/images/home-banner.webp`,
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

    // Open Graph metadata
    openGraph: {
      title: {
        default: t('title'),
        template: `%s | ${t('title')}`,
      },
      description: t('description.home'),
      url: `${process.env.NEXT_PUBLIC_HOST}/${locale}`,
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
