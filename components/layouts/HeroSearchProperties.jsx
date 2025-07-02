// Sections
import Filters from "@/components/layouts/Filters"
import Hero from "@/components/layouts/templates/Hero"

// Libs
import { clsx } from "clsx"
import { useTranslations } from "next-intl"

// Styles
import "@/css/markdown.sass"

/**
 * Hero section component
 *
 * @param {Object} props - Component props
 * @param {string} props.className - Component classes
 * @returns {JSX.Element} Hero section component
 */
export default function HeroSearchProperties({ className = "" }) {

  // Translations
  const t = useTranslations("SearchProperties")
  const title = t("title")
  const bgImage = "/images/hero-buscar.webp"

  return (
    <Hero
      id={"search-hero"}
      title={title}
      bgImage={bgImage}
      className={className}
    >
      {/* Search filters */}
      <div className={clsx("relative", "z-50")}>
        <Filters showSubmit={false} />
      </div>
    </Hero>
  )
}
