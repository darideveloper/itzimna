// Libs
import { getProperties } from "@/libs/api/properties"
import { getTranslations } from "next-intl/server"

// Components
import Image from "next/image"

// Sections
import Filters from "@/components/layouts/Filters"
import CardsSection from "@/components/layouts/CardsSection"


const PropertySearch = async ({ params }) => {

  const { locale } = await params

  // Fetch data on the server
  const properties = await getProperties(locale)

  const t = await getTranslations("Search")

  return (
    <div
      className={`
        pb-12
      `}
    >
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

      {/* Filters */}
      <div
        className={`
          container
          !max-w-5xl
          !mt-16
          md:!mb-40 lg:!mb-56
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
        useAos={false}
      />

    </div>
  )
}

export default PropertySearch
