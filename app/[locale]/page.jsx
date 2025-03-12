// Sections
import CardsSection from "@/components/layouts/CardsSection"
import Hero from "@/components/layouts/Hero"
import Gallery from "@/components/layouts/Gallery"

// LIbs
import { getPropertiesSummary } from "@/libs/api/properties"
import { getTranslations } from "next-intl/server"


export default async function HomePage() {

  // Translations
  const t = await getTranslations('Home')
  const tMeta = await getTranslations('Meta')

  // Get initial properties data
  const lastProperties = await getPropertiesSummary(1)
  const featuredProperties = await getPropertiesSummary(1, true)

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "headline": tMeta('title'),
    'description': tMeta('description.home'),
    'keywords': tMeta('keywords'),
    "publisher": {
      "@type": "Organization",
      "name": tMeta('title'),
      "logo": {
        "@type": "ImageObject",
        "url": "/images/logo.webp"
      }
    },
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": "/"
    },
    "image": {
      "@type": "ImageObject",
      "url": "/images/home-banner.jpg"
    }
  }
  

  return (
    <>
      {/* Render json ld */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <Hero />
      <CardsSection
        id="last-properties"
        title={t('LastProperties.title')}
        initialData={lastProperties.propertiesData}
        initialTotalProperties={lastProperties.pages}
      />

      <CardsSection
        id="featured-properties"
        title={t('FeaturedProperties.title')}
        filterFeatured={true}
        initialData={featuredProperties.propertiesData}
        initialTotalProperties={featuredProperties.pages}
      />
      <Gallery />
    </>
  )
}
