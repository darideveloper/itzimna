// Sections
import CardsSection from "@/components/layouts/CardsSection"
import Hero from "@/components/layouts/Hero"
import Gallery from "@/components/layouts/Gallery"

export default async function HomePage() {

  return (
    <>
      <Hero/>
      <CardsSection 
        id="last-properties"
      />
      <Gallery />
    </>
  )
}