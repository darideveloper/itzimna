"use client"

// Libs
import { useTranslations } from "next-intl"
import { useEffect, useState } from "react"
import { getPropertiesSummary } from "@/libs/api/property"

// Components
import PropertyCard from "@/components/ui/PropertyCard"
import Pagination from "@/components/layouts/Pagination"
import Title from "@/components/ui/Title"
import Spinner from "@/components/ui/Spinner"

/**
 * Cards section component
 * 
 * @param {String} id - Section ID
 * @returns {JSX.Element} Cards section component
 */
export default function CardsSection({
  id,
}) {

  // States
  const [propertiesData, setPropertiesData] = useState([])
  const [page, setPage] = useState(1)
  const [lastPage, setLastPage] = useState(1)
  const [isLoading, setIsLoading] = useState(false)
  const [totalPages, setTotalPages] = useState(1)

  // Effects
  useEffect(() => {
    // Enable loading
    setIsLoading(true)

    // Update properties data when change page and when component mounts
    getPropertiesSummary(page).then(({ results, count }) => {

      // Update properties data and total pages
      setPropertiesData(results)
      setTotalPages(Math.ceil(count / 8))

      // Move to top of the section
      if (lastPage !== page) {
        document.querySelector(`#${id}`).scrollIntoView({ behavior: "smooth" })
      }

      // Hide loading spinner
      setTimeout(() => {
        setIsLoading(false)
      }, 1500)
    })
  }, [page])

  // Get translations
  const t = useTranslations("Home.CardsSection")
  return (
    <section
      className={`
        cards
        w-full
        relative
        py-12
      `}
      id={id}
    >
      <div
        className={`
          container
        `}
      >
        <Title>{t("title")}</Title>

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
          `}
        >
          {/* Loading spinner */}
          <Spinner isLoading={isLoading} />

          {/* Cards */}
          {
            propertiesData.map((card) => (
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
              category={card.category}
              href={`/desarrollos/${card.slug}/${card.id}`}

            />
          ))}
        </div>

        <Pagination
          currentPage={page}
          totalPages={totalPages}
          onPageChange={(newPage) => {
            setLastPage(page)
            setPage(newPage)
          }}
        />
      </div>
    </section>
  )
}
