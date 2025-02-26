// Sections
import CardsSection from "@/components/layouts/CardsSection"
import Hero from "@/components/layouts/Hero"
import Gallery from "@/components/layouts/Gallery"

// LIbs
import { getPropertiesSummary } from "@/libs/api/properties"
import { getTranslations } from "next-intl/server"


export default async function HomePage() {
  // Get initial properties data
  const lastProperties = await getPropertiesSummary(1)
  const featuredProperties = await getPropertiesSummary(1, true)

  const t = await getTranslations('Home')
  return (
    <>
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
