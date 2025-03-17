// Libs
import { getProperties } from "@/libs/api/properties"
import { getTranslations } from "next-intl/server"

// Components
import Image from "next/image"

// Sections
import Filters from "@/components/layouts/Filters"
import CardsSection from "@/components/layouts/CardsSection"


const PropertySearch = async () => {
  // Fetch data on the server
  const properties = await getProperties()
  const propertyCards = properties.propertiesData || []

  const t = await getTranslations("Search")

  return (
    <div>
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
      <div className="container mx-auto !pt-6 !pb-16">

        {/* Filters */}
        <div
          className={`
            max-w-5xl
            mx-auto
          `}
        >
          <Filters />
        </div>

        {/* Results */}
        <CardsSection
          id="last-properties"
          title={t('title')}
          initialData={properties.propertiesData}
          initialTotalProperties={properties.pages}
          variant="dark"
          className={`
            !pt-0
          `}
        />

      </div>


    </div>
  )
}

export default PropertySearch
