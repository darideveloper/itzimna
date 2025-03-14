// Components
import Button from "@/components/ui/Button"
import Select from "@/components/ui/Select"
import SearchBar from "@/components/ui/SearchBar"

// Libs
import { useTranslations } from "next-intl"
import { useState, useEffect } from "react"
import { getLocations } from "@/libs/api/locations"

// Icons
import { FaSearch } from "react-icons/fa";


export default function Filters() {

  // Translations
  const t = useTranslations("Filters")

  // States
  const [readySubmit, setReadySubmit] = useState(false)
  const [lcoations, setLocations] = useState([])

  // Effects

  useEffect(() => {
    // Load locations
    const loadLocations = async () => {

      // get data from api
      const locations = await getLocations()

      // Format data
      const locationsData = locations.map((location) => {
        return {
          value: location.id,
          label: location.name
        }
      })
      setLocations(locationsData)
    }
    loadLocations()
  }, [])


  // Handlers
  const handleSearch = (term) => {
    console.log("Search term:", term)
  }

  const handleSelectChange = (value) => {
    console.log("Selected value:", value)
  }

  // Filters fixed data
  const sizesOptions = [
    { value: "1", label: "Small" },
    { value: "2", label: "Medium" },
    { value: "3", label: "Large" },
  ]

  const pricesOptions = [
    { value: "1", label: "$0 - $50" },
    { value: "2", label: "$50 - $100" },
    { value: "3", label: "$100+" },
  ]

  return (
    <div
      className = {`
        search-container
        mt-8
        w-full
        mx-auto
        px-6 md:px-16
        py-10
        rounded
        bg-green-dark/80
        backdrop-filter
        backdrop-blur
      `}
    >
      {/* Serach bar */}
      <div
        className={`
          relative
          flex
          items-center
          bg-green-dark
        `}
      >
        <SearchBar
          placeholder={t("searchPlaceholder")}
          onSearch={handleSearch}
        />
      </div>

      {/* Select row */}
      <div
        className={`
            mt-4
            grid
            grid-cols-1
            md:grid-cols-3 lg:grid-cols-4
            gap-4
          `}
      >
        <Select
          options={lcoations}
          placeholder={t("locationPlaceholder")}
          onChange={handleSelectChange}
        />
        <Select
          options={sizesOptions}
          placeholder={t("sizePlaceholder")}
          onChange={handleSelectChange}
        />
        <Select
          options={pricesOptions}
          placeholder={t("pricePlaceholder")}
          onChange={handleSelectChange}
        />
        <Button
          type="submit"
          className={`
            flex
            items-center
            justify-center
            flex-row
            gap-3
            md:col-span-3 lg:col-span-1
          `}
          disabled={!readySubmit}
        >
          <FaSearch />
          <p>
            {t("searchButton")}
          </p>
        </Button>
      </div>
    </div>
    )
}