"use client"

//Libs
import { useState, useEffect, useRef } from "react"
import { getPropertiesSummaryNames } from "@/libs/api/properties"

//Components
import TransitionLink from "@/components/utils/TransitionLink"

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
  const [searchTerm, setSearchTerm] = useState("")
  const [options, setOptions] = useState([])
  const [suggestions, setSuggestions] = useState([])
  const [isLoading, setIsLoading] = useState(false)

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
        options([])
      } finally {
        setIsLoading(false)
      }
    }
    fetchSuggestions()
  }, [])

  // Monitor options and suggestions
  useEffect(() => {
    console.log({ options, suggestions })
  }, [options, suggestions])

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
          <div
            className={`
              h-5 
              w-5 
              animate-spin 
              rounded-full 
              border-2 
              border-solid 
              border-current 
              border-r-transparent
            `}
          />
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
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
            bg-white 
            border 
            border-gray-200 
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
              className="block"
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
