// Libs
import { useTranslations } from "next-intl"

// Components
import Title from "@/components/ui/Title"

// Sections
import Filters from "@/components/layouts/Filters"


const HeroSection = ({ id = "hero", className = "" }) => {
  const t = useTranslations("Home.HeroSection")

  return (
    <div
      id={id}
      className={`
        hero
        relative
        h-auto md:h-[120vh]
        w-full
        md:overflow-hidden
        bg-[url('/images/hero.webp')]
        bg-cover
        bg-center
        bg-fixed
        ${className}
        py-24 md:py-0
      `}
    >
      <div
        className={`
          overlay-effect
          absolute
          inset-0
          bg-green/60
        `}
      />
      <div
        className={`
          container
          relative
          h-full
          flex
          flex-col
          items-center
          justify-center
          px-4
          sm:px-6
          lg:px-8
        `}
      >
        <div
          className={`
            text-center
            max-w-5xl
            w-full
            mx-auto
          `}
        >
          <Title
            isH1={true}
            className={`
              text-white
              !mt-0
            `}
          >
            {t("title")}
          </Title>
          <p
            className={`
              text-xl
              sm:text-2xl
              text-gray-200
              max-w-2xl
              mx-auto
            `}
            data-aos="fade-up"
            data-aos-delay="600"
          >
            {t("description")}
          </p>
          
          {/* Search filters */}
          <Filters />

        </div>
      </div>
    </div>
  )
}

export default HeroSection
