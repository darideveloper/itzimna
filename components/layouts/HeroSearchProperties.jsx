// Sections
import Filters from "@/components/layouts/Filters"
import Hero from "@/components/layouts/templates/Hero"

// Libs
import { clsx } from "clsx"

// Styles
import "@/css/markdown.sass"

/**
 * Hero section component
 *
 * @param {Object} props - Component props
 * @param {string} props.id - Component id
 * @param {string} props.className - Component classes
 * @param {string} props.title - Title text
 * @param {string} props.description - Description text
 * @param {string} props.bgImage - Background image url
 * @param {boolean} props.filtersShowSubmit - Show submit button on filters. Default is true
 * @returns {JSX.Element} Hero section component
 */
export default function HeroSearchProperties() {
  return (
    <Hero
      id={"search-hero"}
      title={"Buscar propiedades"}
      bgImage={"/images/hero-buscar.webp"}
    >
      {/* Search filters */}
      <div className={clsx("relative", "z-50")}>
        <Filters showSubmit={false} />
      </div>
    </Hero>
  )
}
