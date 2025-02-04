"use client"

// Libs
import { useTranslations } from "next-intl"
import { useEffect, useState } from "react"
import { getLastProperties } from "@/libs/apiClient"

// Components
import PropertyCard from "@/components/ui/PropertyCard"
import Pagination from "../ui/Pagination"
import Title from "../ui/Title"



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
 * @returns {JSX.Element} Cards section component
 */
export default function CardsSection({ initialPropertiesData }) {

  // States
  const [propertiesData, setPropertiesData] = useState(initialPropertiesData)
  const [page, setPage] = useState(1)
  const [isLoading, setIsLoading] = useState(false)

  // Effects
  useEffect(() => {
    console.log("Page changed to: ", page)

    // Enable loading
    setIsLoading(true)

    // Update properties data when change page
    getLastProperties(page).then(data => {
      console.log("Data fetched: ", data)
      setPropertiesData(data)
      setIsLoading(false)
    })
  }, [page])


  // Get translations
  const t = useTranslations("Home.CardsSection")
  return (
    <section
      className={`
          px-4
          md:px-8
          lg:px-16
      `}
    >
      <Title className={`
          text-3xl
          sm:text-4xl
          font-bold
          mt-12
          text-blue 
        `}
        isH1={false}
      >
        {t("title")}
      </Title>

      <br />

      <div
        className={`
          container
          grid
          grid-cols-1
          sm:grid-cols-2
          lg:grid-cols-3
          xl:grid-cols-4
          gap-6
        `}
      >
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

      <button
        onClick={() => setPage(page + 1)}
      >
        next
      </button>

      <Pagination />

    </section>
  )
}
