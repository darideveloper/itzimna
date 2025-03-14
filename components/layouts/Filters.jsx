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
    { value: "50", label: "50" },
    { value: "100", label: "100" },
    { value: "500", label: "500" },
    { value: "1000", label: "1000" },
    { value: "5000", label: "5000" },
    { value: "10000", label: "10000" },
  ]

  const pricesOptions = [
    { value: "100000", label: "100,000" },
    { value: "500000", label: "500,000" },
    { value: "1500000", label: "1,500,000" },
    { value: "2000000", label: "2,000,000" },
    { value: "5000000", label: "5,000,000" },
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
          prefix={t("selectPrefix")}
          postfix="m²"
        />
        <Select
          options={pricesOptions}
          placeholder={t("pricePlaceholder")}
          onChange={handleSelectChange}
          prefix={t("selectPrefix")}
          postfix="MXN"
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