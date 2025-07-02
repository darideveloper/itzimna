// Components
import { fontTitle } from "@/libs/fonts"

// Sections
import Filters from "@/components/layouts/Filters"

// Libs
import { marked } from "marked"
import { useTranslations } from "next-intl"
import { clsx } from "clsx"

// Styles
import "@/css/markdown.sass"

/**
 * Hero section component
 *
 * @param {Object} props - Component props
 * @param {string} props.className - Component classes
 * @returns {JSX.Element} Hero section component
 */
const HeroHome = ({className = ""}) => {
  // Translations
  const t = useTranslations('Home')  

  // Data
  const title = t('HeroSection.title')
  const description = t('HeroSection.description')
  const bgImage = "/images/hero.webp"

  // Split title by ':' character
  const titleParts = title ? title.split(":") : [""]
  const titleTop = titleParts[0]?.trim() || ""
  const titleBottom = titleParts.slice(1).join(":").trim() || ""


  return (
    <div
      id={"hero"}
      className={clsx(
        "hero",
        "relative",
        "w-full",
        "bg-cover",
        "py-24",
        "md:pb-52",
        "md:pt-24",
        "z-10",
        className
      )}
      style={{
        backgroundImage: `url(${bgImage})`,
      }}
    >
      <div
        className={clsx(
          "overlay-effect",
          "absolute",
          "inset-0",
          "z-10"
        )}
      />
      <div
        className={clsx(
          "container",
          "relative",
          "h-full",
          "flex",
          "flex-col",
          "items-center",
          "justify-center",
          "px-4",
          "sm:px-6",
          "lg:px-8",
          "z-30"
        )}
      >
        <div
          className={clsx(
            "text-center",
            "max-w-5xl",
            "w-full",
            "mx-auto"
          )}
        >
          <div
            className={clsx(
              "title-wrapper",
              "w-full"
            )}
          >
            <h1
              className={clsx(
                "title",
                "mb-8",
                "text-center",
                "text-green-dark",
                "!mt-0",
                fontTitle.className
              )}
            >
              {/* Split text only in home */}

              <span className={clsx("block", "text-2xl", "sm:text-3xl", "md:text-4xl")}>
                {titleTop}
              </span>
              {titleBottom && (
                <span className={clsx("block", "text-4xl", "sm:text-5xl", "md:text-6xl", "mt-4")}>
                  {titleBottom}
                </span>
              )}
            </h1>
          </div>

          <div
            className={clsx("text-green-dark", "markdown")}
            dangerouslySetInnerHTML={{
              __html: description ? marked(description) : "",
            }}
          />

          {/* Search filters */}
          <div className={clsx("relative", "z-50", "mb-16")}>
            <Filters showSubmit={true} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default HeroHome