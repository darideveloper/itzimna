// Libs
import { getTranslations } from "next-intl/server"

// Components
import Image from "next/image"

// Sections
import CardsSection from "@/components/layouts/CardsSection"
import Hero from "@/components/layouts/Hero"


const PropertySearch = async () => {

  // Translations
  const t = await getTranslations("Search")

  return (
    <div
      className={`
        pb-12
      `}
    >
      <Hero 
        title={t('title')}
        bgImage="/images/hero-buscar.webp"
        className={`
          min-h-[700px] lg:min-h-[800px]
        `}
      />

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
          object-cover
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

      {/* Results */}
      <CardsSection
        id="last-properties"
        initialData={[]}
        initialTotalProperties={0}
        variant="dark"
        className={`
          !py-8          
        `}
        useAos={false}
        useSearchQuery={true}
      />

    </div>
  )
}

export default PropertySearch
