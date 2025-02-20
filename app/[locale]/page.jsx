// Sections
import CardsSection from "@/components/layouts/CardsSection"
import Hero from "@/components/layouts/Hero"
import Gallery from "@/components/layouts/Gallery"

// LIbs
import { getProperties } from "@/libs/apiClient"
import { getTranslations } from "next-intl/server"


export default async function HomePage() {
  // Get initial properties data
  const lastProperties = await getProperties(1)
  const featuredProperties = await getProperties(1, true)

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
