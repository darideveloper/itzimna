// Sections
import CardsSection from "@/components/layouts/CardsSection"
import Hero from "@/components/layouts/Hero"
import Gallery from "@/components/layouts/Gallery"

// LIbs
import { getTranslations } from "next-intl/server"

// Utils components
import AOSInit from '@/components/utils/AOSInit'


export default async function HomePage({ params }) {

  // Translations
  const t = await getTranslations('Home')
  const tMeta = await getTranslations('Meta')

  const { locale } = await params

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "headline": tMeta('title'),
    'description': tMeta('description.home'),
    'keywords': tMeta('keywords').split(','),
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

      {/* Enable aos in page */}
      <AOSInit />

      <Hero 
        title={t('HeroSection.title')}
        description={t('HeroSection.description')}
        bgImage="/images/hero.webp"
        className={`
        `}
      />

      <Gallery locale={locale} />


      <CardsSection
        id="last-properties"
        title={t('LastProperties.title')}
        locale={locale}
      />

      <CardsSection
        id="featured-properties"
        title={t('FeaturedProperties.title')}
        filterFeatured={true}
        locale={locale}
      />
      
    </>
  )
}
