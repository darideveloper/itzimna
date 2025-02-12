"use client"

// Libs
import { useTranslations } from "next-intl"
import { useEffect, useState } from "react"
import { getProperties } from "@/libs/apiClient"

// Components
import PropertyCard from "@/components/ui/PropertyCard"
import Pagination from "@/components/layouts/Pagination"
import Title from "@/components/ui/Title"
import Spinner from "@/components/ui/Spinner"

/**
 * Cards section component
 *
 * @param {String} id - Section ID
 * @param {String} title - Section title
 * @param {Boolean} filterFeatured - Filter featured properties. Default is false
 * @returns {JSX.Element} Cards section component
 */
export default function CardsSection({
  id,
  title,
  filterFeatured = false,
}) {
  // States
  const [propertiesData, setPropertiesData] = useState([])
  const [page, setPage] = useState(1)
  const [lastPage, setLastPage] = useState(1)
  const [isLoading, setIsLoading] = useState(false)
  const [totalPages, setTotalProperties] = useState(0)

  // Effects
  useEffect(() => {
    // Enable loading
    setIsLoading(true)

    // Update properties data when change page
    getProperties(page, filterFeatured).then(({ propertiesData, count }) => {
      
      setPropertiesData(propertiesData)

      // Move to top of the section
      if (lastPage !== page) {
        document.querySelector(`#${id}`).scrollIntoView({ behavior: "smooth" })
      }

      // Update total properties
      console.log({ count, propertiesData })
      setTotalProperties(Math.ceil(count / 8))

      // Hide loading spinner
      setTimeout(() => {
        setIsLoading(false)
      }, 1500)
    })
  }, [page])

  // Get translations
  // const t = useTranslations("Home.CardsSection")
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
        <Title>{title}</Title>

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
              category={card.category}
              href={`/properties/${card.id}`}
              className={""}
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
