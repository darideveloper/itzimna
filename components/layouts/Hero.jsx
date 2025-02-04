// Libs
import { useTranslations } from "next-intl"

// Components
import Title from "@/components/ui/Title"

const HeroSection = () => {
  const t = useTranslations("Home.HeroSection")

  return (
    <div
      className={`
        relative
        h-screen
        w-full
        overflow-hidden
        bg-[url('/images/hero.webp')]
        bg-cover
        bg-center
        bg-fixed
     `}
    >

      <div
        className={`
            overlay-effect
            absolute
            inset-0
            bg-green/60
        `}
      ></div>

      <div
        className={`
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
            max-w-4xl
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
          >
            {t("description")}
          </p>
        </div>
      </div>
    </div>
  )
}

export default HeroSection
