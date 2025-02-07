"use client"

// Libs
import { useTranslations } from "next-intl"
import { useEffect, useState } from "react"
import { getProperties } from "@/libs/apiClient"

// Components
import PropertyCard from "@/components/ui/PropertyCard"
import Pagination from "../ui/Pagination"
import Title from "../ui/Title"
import Spinner from "@/components/ui/Spinner"


/**
 * Cards section component
 *
 * @param {Array} propertiesData - Properties data
 * @param {Object} propertiesData[].banner - Property banner image
 * @param {String} propertiesData[].banner.url - Property banner image URL
 * @param {String} propertiesData[].banner.alt - Property banner image alt text
 * @param {String} propertiesData[].company - Property company builder
 * @param {String} propertiesData[].category - Property category
 * @param {Integer} propertiesData[].id - Property ID
 * @param {String} propertiesData[].location - Property location
 * @param {String} propertiesData[].meters - Property size in square meters like "99.00"
 * @param {String} propertiesData[].name - Property name
 * @param {String} propertiesData[].price - Property price like "1,000.00"
 * @param {String} propertiesData[].seller - Property seller name
 * @param {String} propertiesData[].short_description - Property short description
 * @param {String} id - Section ID
 * @returns {JSX.Element} Cards section component
 */
export default function CardsSection({ initialPropertiesData, totalProperties, id }) {

  // States
  const [propertiesData, setPropertiesData] = useState(initialPropertiesData)
  const [page, setPage] = useState(1)
  const [lastPage, setLastPage] = useState(1)
  const [isLoading, setIsLoading] = useState(false)
  const totalPages = Math.ceil(totalProperties / 8)

  // Effects
  useEffect(() => {
    // Enable loading
    setIsLoading(true)

    // Update properties data when change page
    getProperties(page).then(({ propertiesData }) => {
      setPropertiesData(propertiesData)

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

        <Title>
          {t("title")}
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
          `}
        >
          {/* Loading spinner */}
          <Spinner isLoading={isLoading} />

          {/* Cards */}
          {propertiesData.map(card => (
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
