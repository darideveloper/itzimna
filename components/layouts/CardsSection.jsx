"use client"

// Libs
import { useEffect, useState } from "react"
import { getProperties } from "@/libs/api/properties"
import { useTranslations } from "next-intl"

// Components
import PropertyCard from "@/components/ui/PropertyCard"
import Pagination from "@/components/ui/Pagination"
import Title from "@/components/ui/Title"
import Spinner from "@/components/ui/Spinner"

// Zustand
import { useSearchStore } from "@/store/search"

/**
 * Cards section component
 *
 * @param {String} id - Section ID
 * @param {String} title - Section title
 * @param {Boolean} filterFeatured - Filter featured properties. Default is false
 * @param {String} className - Section class name
 * @param {String} variant - Section variant. Default is "light" (light or dark)
 * @param {Boolean} useSearchQuery - Use search query from zustand. Default is false
 * @param {Boolean} transparentModal - Transparent modal. Default is false
 * @param {Number} loadingTimeOut - Loading spinner timeout. Default is 1500
 * @param {String} locale - Locale. Default is "es"
 * @param {Boolean} queryRequired - Query required. Default is false
 * @param {Boolean} useAos - Use AOS (Animate On Scroll). Default is true
 * @returns {JSX.Element} Cards section component
 */
export default function CardsSection({
  id,
  title,
  filterFeatured = false,
  className = "",
  variant = "light",
  useSearchQuery = false,
  transparentModal = false,
  loadingTimeOut = 1500,
  locale = "es",
  queryRequired = false,
  useAos = true,
}) {
  // States
  const [propertiesData, setPropertiesData] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [totalPages, setTotalProperties] = useState(0)
  const [page, setPage] = useState(1)

  // Zustand
  let searchQuery = useSearchStore((state) => state.searchQuery)
  if (!useSearchQuery) searchQuery = ""

  // Translations
  const t = useTranslations("CardsSection")

  // Effects
  useEffect(() => {
    if (queryRequired && searchQuery.length < 3) {
      return
    }

    // Enable loading
    setIsLoading(true)

    // Update properties data when change page
    getProperties(locale, page, filterFeatured, searchQuery).then(
      ({ propertiesData, pages }) => {
        setPropertiesData(propertiesData)

        // Update total properties
        setTotalProperties(pages)

        // Hide loading spinner
        setTimeout(() => {
          setIsLoading(false)
        }, loadingTimeOut)
      }
    )
  }, [page, searchQuery])

  return (
    <section
      className={`
        cards
        w-full
        py-12
        ${useAos && "relative"}
        ${className}
      `}
      id={id}
    >
      <div
        className={`
          container
          min-h-[250px]
        `}
      >
        <Title
          className={`
            ${variant === "dark" && "!text-white"}
          `}
        >
          {title}
        </Title>

        <br />

        <div
          className={`
            grid
            grid-cols-1
            sm:grid-cols-2
            md:grid-cols-2
            lg:grid-cols-4
            gap-6
            relative
            items-center
          `}
        >
          {/* Loading spinner */}
          <Spinner isLoading={isLoading} transparentModal={transparentModal} />

          {/* Cards */}
          {propertiesData.map((card) => (
            <PropertyCard
              key={card.id}
              name={card.name}
              shortDescription={card.short_description}
              imageSrc={card.banner.url}
              company={card.company}
              location={card.location}
              price={card.price}
              meters={card.meters}
              created_at={card.created_at}
              tags={[card.category, ...card.tags]}
              href={`/desarrollos/${card.id}-${card.slug}`}
              className={""}
              useAos={useAos}
            />
          ))}
        </div>

        {!isLoading && propertiesData.length === 0 && (
          <Title className="text-center text-white">
            {t("noPropertiesFound")}
          </Title>
        )}

        {!isLoading && propertiesData.length > 0 && totalPages > 1 && (
          <Pagination
            currentPage={page}
            totalPages={totalPages}
            onPageChange={(newPage) => {
              // Update states
              setPage(newPage)

              // Move to top of the section
              setTimeout(() => {
                document
                  .querySelector(`#${id}`)
                  .scrollIntoView({ behavior: "smooth" })
              }, 500)
            }}
            className="mt-6"
            variant={variant}
          />
        )}
      </div>
    </section>
  )
}
