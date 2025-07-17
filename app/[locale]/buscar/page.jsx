// Libs
import { getTranslations } from "next-intl/server"
import { getBreadcrumb } from "@/libs/jsonLd"

// Sections
import HeroSearch from "@/components/layouts/HeroSearch"

// Components
import SearchResults from "@/components/layouts/SearchResults"

// Utils components
import AOSInit from '@/components/utils/AOSInit'

const BuscarPage = async (props) => {
  
  // Translations
  const t = await getTranslations("Buscar")
  const tMeta = await getTranslations("Meta")

  const { locale } = await props.params

  // Metadata
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    'headline': t("title") + " | " + tMeta('title'),
    'description': t("description"),
    'datePublished': new Date().toISOString(),
    'author': {
      '@type': 'Person',
      'name': tMeta('author'),
    },
    'keywords': tMeta('keywords').split(','),
    'publisher': {
      '@type': 'Organization',
      'name': 'Itzamna Real Estate',
      'logo': {
        '@type': 'ImageObject',
        'url': `${process.env.NEXT_PUBLIC_HOST}/images/logo.webp`,
      },
    },
    'mainEntityOfPage': {
      '@type': 'WebPage',
      '@id': `${process.env.NEXT_PUBLIC_HOST}/${locale}/buscar`,
    },
    "image": {
      "@type": "ImageObject",
      "url": "/images/home-banner.jpg"
    },
    "breadcrumb": {
      "@type": "BreadcrumbList",
      "itemListElement": getBreadcrumb(`${process.env.NEXT_PUBLIC_HOST}/${locale}/buscar`)
    }
  }

  return (
    <>
      {/* Render json ld */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Enable aos in page */}
      <AOSInit />

      <HeroSearch
        className={`
          !pb-16
          !pt-16
        `}
        locale={locale}
      />

      {/* Search Results Section */}
      <div
        className={`
          mx-auto
          pb-12
        `}
      >
        <SearchResults />
      </div>
    </>
  )
}

export default BuscarPage

export async function generateMetadata({ params }) {
  const { locale } = await params
  const t = await getTranslations("Buscar")
  const tMeta = await getTranslations("Meta")

  // Metadata
  const domain = process.env.NEXT_PUBLIC_HOST
  const canonicalPath = `/${locale}/buscar`
  const canonicalUrl = `${domain}${canonicalPath}`
  const image = {
    url: `${domain}/images/home-banner.jpg`,
    width: 1200,
    height: 720,
    alt: t("title"),
  }

  return {
    title: `${t("title")} | ${tMeta("title")}`,
    description: t("description"),
    lang: locale,
    keywords: tMeta("keywords"),

    // Canonical and alternate links
    alternates: {
      canonical: canonicalUrl,
      languages: {
        "es": `${domain}/es/buscar`,
        "en": `${domain}/en/buscar`,
        "x-default": `${domain}/es/buscar`,
      },
    },

    // Open Graph meta tags
    openGraph: {
      title: `${t("title")} | ${tMeta("title")}`,
      description: t("description"),
      url: canonicalUrl,
      siteName: tMeta("title"),
      images: [image],
      locale: locale,
      type: "website",
    },

    // Twitter meta tags
    twitter: {
      card: "summary_large_image",
      title: `${t("title")} | ${tMeta("title")}`,
      description: t("description"),
      images: [image.url],
    },
  }
} 