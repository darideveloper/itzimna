// Components
import Button from "@/components/ui/Button"
import Select from "@/components/ui/Select"
import SearchBar from "@/components/ui/SearchBar"
import TransitionLink from "@/components/utils/TransitionLink"

// Libs
import { useTranslations } from "next-intl"
import { useState, useEffect } from "react"
import { getLocations } from "@/libs/api/locations"

// Icons
import { FaSearch } from "react-icons/fa"


export default function Filters() {

  // Translations
  const t = useTranslations("Filters")

  // Data
  const [readySubmit, setReadySubmit] = useState(false)
  const [lcoations, setLocations] = useState([])
  const [selectedLocation, setSelectedLocation] = useState({})
  const [selectedSize, setSelectedSize] = useState({})
  const [selectedPrice, setSelectedPrice] = useState({})
  const [query, setQuery] = useState("")

  // Inputs states
  const [locationIsOpen, setLocationIsOpen] = useState(false)
  const [sizeIsOpen, setSizeIsOpen] = useState(false)
  const [priceIsOpen, setPriceIsOpen] = useState(false)
  const [searchIsOpen, setSearchIsOpen] = useState(false)


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

  // Effects

  useEffect(() => {
    // Load locations data when component is mounted
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

  useEffect(() => {

    /**
     * get query params for range filters
     * 
     * @param {Object} value - selected value
     * @param {array} options - options for the filter
     * @param {string} paramName - name of the parameter
     */
    function getRangeQueryParam(selectedOption, options, paramName) {
      const selectedOptionIndex = options.findIndex(option => option.value === selectedOption.value)
      const prevOption = options[selectedOptionIndex - 1] || { value: 0 }
      const queryText = `${paramName}-desde=${prevOption.value}&${paramName}-hasta=${selectedOption.value}`
      return queryText
    }

    // Enable submit button when fill any filter
    const ready = selectedLocation.value || selectedSize.value || selectedPrice.value
    if (ready) {
      setReadySubmit(true)
    }

    // Update query when any filter is changed
    const queryParts = []
    let locationQuery = ""
    let sizeQuery = ""
    let priceQuery = ""
    if (selectedLocation.value) {
      locationQuery = `ubicacion=${selectedLocation.value}&ubicacion-nombre=${selectedLocation.label}`
      queryParts.push(locationQuery)
    }
    if (selectedSize.value) {
      sizeQuery = getRangeQueryParam(selectedSize, sizesOptions, "metros")
      queryParts.push(sizeQuery)
    }
    if (selectedPrice.value) {
      priceQuery = getRangeQueryParam(selectedPrice, pricesOptions, "precio")
      queryParts.push(priceQuery)
    }
    const fullQuery = queryParts.join("&")
    setQuery(fullQuery)
  }, [selectedLocation, selectedSize, selectedPrice])

  // Hanlders
  function closeAll() {
    setLocationIsOpen(false)
    setSizeIsOpen(false)
    setPriceIsOpen(false)
  }

  return (
    <div
      className={`
        search-container
        mt-8
        w-full
        mx-auto
        px-6 md:px-16
        py-10
        rounded
        bg-black
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
        `}
      >
        <SearchBar
          placeholder={t("searchPlaceholder")}
          onChange={() => {
            closeAll()
            setSearchIsOpen(true)
          }}
          isOpen={searchIsOpen}
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
          onChange={setSelectedLocation}
          isOpen={locationIsOpen}
          setIsOpen={(newState) => {
            closeAll()
            setSearchIsOpen(false)
            setLocationIsOpen(newState)
          }}
        />
        <Select
          options={sizesOptions}
          placeholder={t("sizePlaceholder")}
          onChange={setSelectedSize}
          // Prefix and postfix for the select
          prefix={t("selectPrefix")}
          postfix="m²"
          onOpen={() => closeAll()}
          isOpen={sizeIsOpen}
          setIsOpen={(newState) => {
            closeAll()
            setSearchIsOpen(false)
            setSizeIsOpen(newState)
          }}
        />
        <Select
          options={pricesOptions}
          placeholder={t("pricePlaceholder")}
          onChange={setSelectedPrice}
          prefix={t("selectPrefix")}
          postfix="MXN"
          isOpen={priceIsOpen}
          setIsOpen={(newState) => {
            closeAll()
            setSearchIsOpen(false)
            setPriceIsOpen(newState)
          }}
        />
        <TransitionLink
          // Dynamic link with query
          href={`/buscar?${query}`}
          className={`
            md:col-span-3 lg:col-span-1
          `}
          // Disable click when no filters are selected
          disabled={!readySubmit}
        >
          {/* Use button only for style */}
          <Button
            disabled={!readySubmit}
            className={`
              w-full
              flex
              items-center
              justify-center
              flex-row
              gap-3
            `}
            // No onclick (used TransitionLink)
          >
            <FaSearch />
            <p>
              {t("searchButton")}
            </p>
          </Button>
        </TransitionLink>
      </div>
    </div>
  )
}