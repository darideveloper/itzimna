// Components
import Button from "@/components/ui/Button"
import Select from "@/components/ui/Select"
import SearchBar from "@/components/ui/SearchBar"

// Libs
import { useTranslations } from "next-intl"
import { useState } from "react"

// Icons
import { FaSearch } from "react-icons/fa";


export default function Filters() {

  // Translations
  const t = useTranslations("Filters")

  // States
  const [readySubmit, setReadySubmit] = useState(false)

  // Handlers
  const handleSearch = (term) => {
    console.log("Search term:", term)
  }

  const handleSelectChange = (value) => {
    console.log("Selected value:", value)
  }

  // Data
  const dataListOptions = [
    { value: "data1", label: "Data 1" },
    { value: "data2", label: "Data 2" },
    { value: "data3", label: "Data 3" },
  ]

  const sizesOptions = [
    { value: "small", label: "Small" },
    { value: "medium", label: "Medium" },
    { value: "large", label: "Large" },
  ]

  const pricesOptions = [
    { value: "low", label: "$0 - $50" },
    { value: "medium", label: "$50 - $100" },
    { value: "high", label: "$100+" },
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
          options={dataListOptions}
          placeholder="Data List"
          onChange={handleSelectChange}
        />
        <Select
          options={sizesOptions}
          placeholder="Sizes"
          onChange={handleSelectChange}
        />
        <Select
          options={pricesOptions}
          placeholder="Prices"
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
            Search
          </p>
        </Button>
      </div>
    </div>
    )
}