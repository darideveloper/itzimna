"use client"

//Libs
import { useState, useEffect, useRef } from "react"
import { getPropertiesSummaryNames } from "@/libs/api/properties"

//Components
import TransitionLink from "@/components/utils/TransitionLink"

// Icons
import { FaSearch, FaCircleNotch  } from "react-icons/fa";


/**
 * A search bar component with autocomplete functionality using property names from API.
 * Enhanced with keyboard navigation for suggestions.
 *
 * @param {object} props - Props object
 * @param {string} [props.placeholder="Search..."] - Placeholder text
 * @param {string} [props.className=""] - Additional classes
 *
 * @returns {JSX.Element} Search bar component
 */
const SearchBar = ({ placeholder, className = "" }) => {

  // States
  const [searchTerm, setSearchTerm] = useState("")
  const [options, setOptions] = useState([])
  const [suggestions, setSuggestions] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [isInputFocused, setIsInputFocused] = useState(false)

  // Refs
  const suggestionsRef = useRef(null)
  const inputRef = useRef(null)

  useEffect(() => {
    // Load options on initial render
    const fetchSuggestions = async () => {
      setIsLoading(true)
      try {
        const properties = await getPropertiesSummaryNames()
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
      regex.test(property.name)
    )
    setSuggestions(filteredSuggestions)

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
      <div
        className={`
          absolute 
          right-3 
          top-1/2 
          transform 
          -translate-y-1/2 
          text-gray-500 
          pointer-events-none
        `}
      >
        {isLoading ? (
          <FaCircleNotch 
            className={`
              animate-spin
              w-6
              h-6
            `}
          />
        ) : (
          <FaSearch 
            className={`
              w-5
              h-5
              ${isInputFocused ? "text-white" : "text-white/40"}
            `}
          />
        )}
      </div>

      {/* Suggestions Dropdown */}
      {suggestions && (
        <div
          ref={suggestionsRef}
          className={`
            absolute 
            top-full 
            left-0 
            right-0 
            mt-1 
            z-10 
            bg-black
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
                text-white
                duration-200
                hover:opacity-80
                hover:bg-green/20
              `}
            >
              {property.name}
            </TransitionLink>
          ))}
        </div>
      )}
    </div>
  )
}

export default SearchBar
