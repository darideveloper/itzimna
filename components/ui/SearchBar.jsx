"use client"

//Libs
import { useState, useEffect, useRef } from "react"
import { getPropertiesSummary } from "@/libs/api/properties"
import { useLocale } from "next-intl";

//Components
import TransitionLink from "@/components/utils/TransitionLink"

// Icons
import { FaSearch, FaCircleNotch } from "react-icons/fa";
import { FaX } from "react-icons/fa6";

/**
 * A search bar component with autocomplete functionality using property names from API.
 * Enhanced with keyboard navigation for suggestions.
 *
 * @param {object} props - Props object
 * @param {string} [props.placeholder="Search..."] - Placeholder text
 * @param {string} [props.className=""] - Additional classes
 * @param {Function} props.onChange - On change event
 * @param {boolean} props.isOpen - Is open state
 * @returns {JSX.Element} Search bar component
 */
const SearchBar = ({ placeholder, className = "", onChange, isOpen }) => {

  // States
  const [searchTerm, setSearchTerm] = useState("")
  const [options, setOptions] = useState([])
  const [suggestions, setSuggestions] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [isInputFocused, setIsInputFocused] = useState(false)

  // Refs
  const suggestionsRef = useRef(null)
  const inputRef = useRef(null)

  const lang = useLocale()

  useEffect(() => {
    // Load options on initial render
    const fetchSuggestions = async () => {
      setIsLoading(true)
      try {
        let properties = await getPropertiesSummary(lang)

        // Add search text to each property (name, location and company)
        properties = properties.map((property) => {
            const searchText = `${property.location} - ${property.name} (${property.company})`
            property["searchText"] = searchText
            return property
          }
        )
        
        setOptions(properties)
      } catch (error) {
        console.error("Error fetching property names:", error)
        setOptions([])
      } finally {
        setIsLoading(false)
      }
    }
    fetchSuggestions()
  }, [])

  // Update suggestions based on search term
  useEffect(() => {

    // If search term is empty, clear suggestions
    if (searchTerm.trim() === "") {
      setSuggestions([])
      return
    }

    // Filter options based on search term in name
    const regex = new RegExp(searchTerm, "i")
    const filteredSuggestions = options.filter((property) => 
      regex.test(property.searchText)
    )
    setSuggestions(filteredSuggestions)

    onChange(searchTerm)

  }, [searchTerm])

  return (
    <div
      className={`
        search-wrapper 
        relative 
        flex-grow 
        ${className}
      `}
    >
      <input
        ref={inputRef}
        type="text"
        placeholder={placeholder || "Search..."}
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className={`
          outline-none 
          focus:outline-none 
          text-white 
          w-full 
          p-3 
          rounded 
          bg-transparent 
          border-2 
          border-white/20 
          focus:border-white/80 
          duration-200
        `}
        onFocus={() => setIsInputFocused(true)}
        onBlur={() => setIsInputFocused(false)}
      />

      {/* Search Icon */}
      <button
        className={`
          icon-wrapper
          absolute 
          right-3 
          top-1/2 
          transform 
          -translate-y-1/2 
          text-gray-500 
          p-2
          z-20
          ${(!searchTerm || isLoading) && "pointer-events-none"}
        `}
        onClick={() => {
          // Reset search term if not loading
          if (searchTerm && !isLoading) {
            setSearchTerm("")
            inputRef.current.focus()
          }
        }}
      >

        {isLoading ? 
        
        /* Loading icon when fetiching data */
        (

          <FaCircleNotch 
            className={`
              animate-spin
              w-6
              h-6
            `}
          />
        ) : 
        
          searchTerm ?

          /* Close icon when searching */
          (
            <FaX 
              className={`
                w-4
                h-4
                ${isInputFocused ? "text-white" : "text-white/40"}
              `}
              onClick={() => setSearchTerm("")}
            />
          )
          :

          /* Search icon by default */
          (
            <FaSearch 
              className={`
                w-5
                h-5
                ${isInputFocused ? "text-white" : "text-white/40"}
              `}
            />
          )
        }
      </button>

      {/* Suggestions Dropdown */}
      {suggestions && isOpen && (
        <div
          ref={suggestionsRef}
          className={`
            absolute 
            top-full 
            left-0 
            right-0 
            mt-1 
            z-10 
            bg-green-dark
            rounded-sm 
            shadow-lg 
            max-h-60 
            overflow-y-auto
          `}
        >
          {suggestions.map((property, index) => (
            <TransitionLink
              key={property.id}
              href={`/desarrollos/${property.id}-${property.slug}`}
              className={`
                block
                py-2
                my-1
                text-white hover:text-black
                duration-200
                hover:bg-yellow
                capitalize
                font-bold
              `}
            >
              {property.searchText}
            </TransitionLink>
          ))}
        </div>
      )}
    </div>
  )
}

export default SearchBar
