// Sections
import CardsSection from "@/components/layouts/CardsSection"
import Hero from "@/components/layouts/Hero"

// LIbs
import { getLastProperties } from "@/libs/apiClient"


export default async function HomePage() {

  // Get data from api in server side
  const { propertiesData, count } = await getLastProperties()

  return (
    <>
      <Hero/>
      <CardsSection 
        initialPropertiesData={propertiesData}
        totalProperties={count}
        id="last-properties"
      />
    </>
  )
}