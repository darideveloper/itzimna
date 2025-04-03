"use client"

// Components
import Button from "@/components/ui/Button"
import Select from "@/components/ui/Select"
import SearchBar from "@/components/ui/SearchBar"
import TransitionLink from "@/components/utils/TransitionLink"

// Libs
import { useTranslations } from "next-intl"
import { useState, useEffect } from "react"
import { getLocations } from "@/libs/api/locations"
import { useLocale } from "next-intl";
import { useSearchParams } from "next/navigation";

// Icons
import { FaSearch } from "react-icons/fa"

// Zustand
import { useSearchStore } from "@/store/search"

// Data
import { pricesOptions, sizesOptions } from "@/data/filters"

/**
 * Filters component
 * 
 * @param {Object} props - Component props
 * @param {boolean} props.showSubmit - Show submit button on filters. Default is true
 * @returns {JSX.Element} Filters component
 */
export default function Filters({ showSubmit = true, updateUrlRealTime = true }) {

  // Translations
  const t = useTranslations("Filters")

  // Locale
  const locale = useLocale()

  // Search store
  const selectedLocation = useSearchStore(state => state.selectedLocation)
  const selectedSize = useSearchStore(state => state.selectedSize)
  const selectedPrice = useSearchStore(state => state.selectedPrice)
  const searchQuery = useSearchStore(state => state.searchQuery)

  const setSelectedLocation = useSearchStore(state => state.setSelectedLocation)
  const setSelectedSize = useSearchStore(state => state.setSelectedSize)
  const setSelectedPrice = useSearchStore(state => state.setSelectedPrice)
  const setSearchQuery = useSearchStore(state => state.setSearchQuery)

  // Local state
  const [readySubmit, setReadySubmit] = useState(false)
  const [locations, setLocations] = useState([])

  // Inputs states
  const [locationIsOpen, setLocationIsOpen] = useState(false)
  const [sizeIsOpen, setSizeIsOpen] = useState(false)
  const [priceIsOpen, setPriceIsOpen] = useState(false)
  const [searchIsOpen, setSearchIsOpen] = useState(false)

  // Get query params
  const [...searchParams] = useSearchParams()


  // Effects

  useEffect(() => {

    // Load locations data when component is mounted
    const loadLocations = async () => {

      // get data from api
      const locations = await getLocations(locale)

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
  }, [locale])


  useEffect(() => {

    /**
     * get query params for range filters
     * 
     * @param {Object} value - selected value
     * @param {array} options - options for the filter
     * @param {string} paramName - name of the parameter
     */
    function getRangeQueryParam(selectedOption, options, paramName) {
      const queryText = `${paramName}-desde=0&${paramName}-hasta=${selectedOption.value}`
      return queryText
    }

    // Skip validations if not locations
    if (locations.length === 0) return

    // Update query when any filter is changed
    const queryParts = []
    let locationQuery = ""
    let sizeQuery = ""
    let priceQuery = ""
    if (selectedLocation?.value) {
      locationQuery = `ubicacion=${selectedLocation.value}&ubicacion-nombre=${selectedLocation.label}`
      queryParts.push(locationQuery)
    }
    if (selectedSize?.value) {
      sizeQuery = getRangeQueryParam(selectedSize, sizesOptions, "metros")
      queryParts.push(sizeQuery)
    }
    if (selectedPrice?.value) {
      priceQuery = getRangeQueryParam(selectedPrice, pricesOptions, "precio")
      queryParts.push(priceQuery)
    }
    const fullQuery = queryParts.join("&")
    setSearchQuery(fullQuery)

    // Enable submit button when fill any filter
    const ready = (
      selectedLocation?.value || selectedSize?.value || selectedPrice?.value
    ) && fullQuery != searchQuery

    if (ready) {
      
      // Update ready state
      setReadySubmit(true)

      // Update url without redirect
      if (updateUrlRealTime) {
        const currentPage = window.location.href.split('?')[0]
        history.pushState(null, "", `${currentPage}?${fullQuery}`)
      }
    } else {
      setReadySubmit(false)
    }
    
    
  }, [selectedLocation, selectedSize, selectedPrice])


  useEffect(() => {
    
    // Update zustand states when page loads (and locations change)
    let query = ""
    for (const param of searchParams) {

      const [key, value] = param

      if (key === "ubicacion" && locations.length > 0) {
        const selectedLocation = locations.find(location => location.value.toString() === value)
        setSelectedLocation(selectedLocation)
      } else if (key === "metros-hasta") {
        const selectedSize = sizesOptions.find(size => size.value === value)
        setSelectedSize(selectedSize)
      } else if (key === "precio-hasta") {
        const selectedPrice = pricesOptions.find(price => price.value === value)
        setSelectedPrice(selectedPrice)
      }

      // Compose query
      query += `${key}=${value}&`
    }

    // Remove last "&" from query sand save in zustand
    query = query.slice(0, -1)
    setSearchQuery(query)
  }, [locations])


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
        rounded-xl
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
            grid-cols-1 md:grid-cols-3 ${showSubmit && 'lg:grid-cols-4'}
            gap-4
          `}
      >
        <Select
          options={locations}
          placeholder={t("locationPlaceholder")}
          onChange={setSelectedLocation}
          value={selectedLocation}
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
          value={selectedSize}
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
          value={selectedPrice}
          prefix={t("selectPrefix")}
          postfix="MXN"
          isOpen={priceIsOpen}
          setIsOpen={(newState) => {
            closeAll()
            setSearchIsOpen(false)
            setPriceIsOpen(newState)
          }}
        />

        {
          showSubmit 
          &&
            <TransitionLink
              // Dynamic link with query
              href={`/buscar?${searchQuery}`}
              className={`
                md:col-span-3 lg:col-span-1
                self-center
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
        }
      </div>
    </div>
  )
}