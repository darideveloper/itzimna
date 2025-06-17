// Libs
import { getTranslations } from "next-intl/server"
import { getBreadcrumb } from "@/libs/jsonLd"

// Components
import Image from "next/image"
import Button from "@/components/ui/Button"

// Sections
import CardsSection from "@/components/layouts/CardsSection"
import Hero from "@/components/layouts/Hero"

// Icons
import { FaArrowUp } from "react-icons/fa"

const PropertySearch = async (props) => {
  
  // Translations
  const t = await getTranslations("Search")
  const tMeta = await getTranslations("Meta")

  const searchParams = await props.searchParams

  // Get search params when page loads
  const locationName = searchParams["ubicacion-nombre"]
  const metersTo = searchParams["metros-hasta"]
  const priceTo = searchParams["precio-hasta"]
  let description = t('title')
  description += locationName ? ` ${t('summary.location')} '${locationName}'` : ""
  description += metersTo ? ` ${t('summary.size')} ${metersTo} m²`: ""
  description += priceTo ? ` ${t('summary.price')} ${priceTo} MXN` : ""

  // Metadata
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    'headline': t("title") + " | " + tMeta('title'),
    'description': description,
    'datePublished': new Date().toISOString(),
    'author': {
      '@type': 'Person',
      'name': tMeta('author'),
    },
    'keywords': tMeta('keywords').split(','),
    'publisher': {
      '@type': 'Organization',
      'name': 'Itzamna',
      'logo': {
        '@type': 'ImageObject',
        'url': `${process.env.NEXT_PUBLIC_HOST}/images/logo.webp`,
      },
    },
    'mainEntityOfPage': {
      '@type': 'WebPage',
      '@id': `${process.env.NEXT_PUBLIC_HOST}/es/buscar-propiedades`,
    },
    "image": {
      "@type": "ImageObject",
      "url": "/images/home-banner.jpg"
    },
    "breadcrumb": {
      "@type": "BreadcrumbList",
      "itemListElement": getBreadcrumb(`${process.env.NEXT_PUBLIC_HOST}/es/buscar-propiedades`)
    }
  }

  return (
    <div
      className={`
        pb-12
      `}
    >
      {/* Render json ld */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <Hero
        title={t('title')}
        bgImage="/images/hero-buscar.webp"
        className={`
          !pb-16
          !pt-16
        `}
        filtersShowSubmit={false}
      />

      <Image
        src="/images/hero.webp"
        width={1220}
        height={720}
        className={`
          w-full
          h-[100vh]
          fixed
          inset-0
          top-0
          left-0
          -z-20
          object-cover
        `}
        alt="bg image"
      />

      <div
        className={`
          overlay-effect
          inset-0
          fixed
          h-[100vh]
          bg-green
          -z-10
          opacity-80
        `}
      />

      {/* Results */}
      <CardsSection
        id="search-properties"
        initialData={[]}
        initialTotalProperties={0}
        variant="dark"
        className={`
          !py-8          
        `}
        useAos={false}
        useSearchQuery={true}
        transparentModal={true}
        loadingTimeOut={0}
        queryRequired={true}
      />

      {/* Go top button */}
      <Button
        className={`
          fixed
          bottom-4
          right-4
          z-30
          !rounded-full
          !p-2
          group
        `}
        variant="ghost"
        href="#hero"
      >
        <FaArrowUp
          className={`
            text-white
            text-2xl
            group-hover:text-green-dark
          `}
        />
      </Button>

    </div>
  )
}

export default PropertySearch


export async function generateMetadata({ params, searchParams }) {
  const { locale } = params
  const t = await getTranslations("Search")
  const tMeta = await getTranslations("Meta")

  // Extract search parameters
  const locationName = searchParams?.["ubicacion-nombre"]
  const metersTo = searchParams?.["metros-hasta"]
  const priceTo = searchParams?.["precio-hasta"]

  // Create description
  let description = t("title")
  description += locationName ? ` ${t("summary.location")} '${locationName}'` : ""
  description += metersTo ? ` ${t("summary.size")} ${metersTo} m²` : ""
  description += priceTo ? ` ${t("summary.price")} ${priceTo} MXN` : ""

  // Metadata
  const domain = process.env.NEXT_PUBLIC_HOST
  const canonicalPath = `/${locale}/buscar-propiedades`
  const canonicalUrl = `${domain}${canonicalPath}`
  const image = {
    url: `${domain}/images/home-banner.jpg`,
    width: 1200,
    height: 720,
    alt: t("title"),
  }

  return {
    title: `${t("title")} | ${tMeta("title")}`,
    description,
    lang: locale,
    keywords: tMeta("keywords"),

    // Canonical and alternate links
    alternates: {
      canonical: canonicalUrl,
      languages: {
        en: `${domain}/en/buscar-propiedades`,
        es: `${domain}/es/buscar-propiedades`,
        'x-default': canonicalUrl,
      },
    },

    // Open Graph metadata
    openGraph: {
      title: `${t("title")} | ${tMeta("title")}`,
      description,
      url: canonicalUrl,
      siteName: tMeta("title"),
      images: [image],
      locale,
      type: "website",
    },

    // Twitter metadata
    twitter: {
      card: "summary_large_image",
      title: `${t("title")} | ${tMeta("title")}`,
      description,
      images: [image],
      creator: "@DeveloperDari",
    },
  }
}
