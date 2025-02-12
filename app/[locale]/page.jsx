// Sections
import CardsSection from "@/components/layouts/CardsSection"
import Hero from "@/components/layouts/Hero"
import Gallery from "@/components/layouts/Gallery"

// LIbs
import { getProperties } from "@/libs/apiClient"
import { getTranslations } from "next-intl/server"

export default async function HomePage() {
  // Get data from api in server side
  const { propertiesData, count } = await getProperties()
  const t = await getTranslations('Home')
  return (
    <>
      <Hero />
      <CardsSection
        id="last-properties"
        title={t('LastProperties.title')}
      />

      <CardsSection
        id="featured-properties"
        title={t('FeaturedProperties.title')}
        filterFeatured={true}
      />
      <Gallery />
    </>
  )
}
