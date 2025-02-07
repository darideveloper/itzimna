// Sections
import CardsSection from "@/components/layouts/CardsSection"
import Hero from "@/components/layouts/Hero"
import Gallery from "@/components/layouts/Gallery"

// LIbs
import { getProperties } from "@/libs/apiClient"


export default async function HomePage() {

  // Get data from api in server side
  const { propertiesData, count } = await getProperties()

  return (
    <>
      <Hero/>
      <CardsSection 
        initialPropertiesData={propertiesData}
        totalProperties={count}
        id="last-properties"
      />
      <Gallery />
    </>
  )
}