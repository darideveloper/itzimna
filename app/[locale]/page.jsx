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
        initialPropertiesData={propertiesData}
        totalProperties={count}
        id="last-properties"
        title={t('LastProperties.title')}
      />

      <CardsSection
        initialPropertiesData={propertiesData}
        totalProperties={count}
        id="featured-properties"
        title={t('FeaturedProperties.title')}
      />
      <Gallery />
    </>
  )
}
