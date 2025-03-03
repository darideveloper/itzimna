"use client"
//Libs

import { useState, useEffect, useRef } from "react"
import { getPropertiesSummaryNames } from "@/libs/api/properties"

/**
 * A search bar component with autocomplete functionality using property names from API.
 * Enhanced with keyboard navigation for suggestions.
 *
 * @param {object} props - Props object
 * @param {string} [props.placeholder="Search..."] - Placeholder text
 * @param {function} props.onSearch - Function to run when search is submitted
 * @param {string} [props.className=""] - Additional classes
 *
 * @returns {JSX.Element} Search bar component
 */
const SearchBar = ({ placeholder, onSearch, className = "" }) => {
  const [searchTerm, setSearchTerm] = useState("")
  const [suggestions, setSuggestions] = useState([])
  const [showSuggestions, setShowSuggestions] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [selectedSuggestionIndex, setSelectedSuggestionIndex] = useState(-1)

  const suggestionsRef = useRef(null)
  const inputRef = useRef(null)

  // Fetch suggestions when search term changes
  useEffect(() => {
    const fetchSuggestions = async () => {
      if (searchTerm.length > 1) {
        setIsLoading(true)
        try {
          // Get properties from API
          const properties = await getPropertiesSummaryNames()

          // Filter properties based on search term
          const filteredProperties = properties.filter((property) =>
            property.name.toLowerCase().includes(searchTerm.toLowerCase())
          )

          setSuggestions(filteredProperties)
          setShowSuggestions(filteredProperties.length > 0)
          // Reset selection index when suggestions change
          setSelectedSuggestionIndex(-1)
        } catch (error) {
          console.error("Error fetching property names:", error)
          setSuggestions([])
        } finally {
          setIsLoading(false)
        }
      } else {
        setSuggestions([])
        setShowSuggestions(false)
        setSelectedSuggestionIndex(-1)
      }
    }

    const timeoutId = setTimeout(fetchSuggestions, 300)
    return () => clearTimeout(timeoutId)
  }, [searchTerm])

  // Scroll selected suggestion into view
  useEffect(() => {
    if (selectedSuggestionIndex >= 0 && suggestionsRef.current) {
      const suggestionElements =
        suggestionsRef.current.querySelectorAll(".suggestion-item")
      if (suggestionElements[selectedSuggestionIndex]) {
        suggestionElements[selectedSuggestionIndex].scrollIntoView({
          block: "nearest",
          behavior: "smooth",
        })
      }
    }
  }, [selectedSuggestionIndex])

  // Handle suggestion selection
  const handleSuggestionClick = (property) => {
    setSearchTerm(property.name)
    setShowSuggestions(false)
    onSearch(property) // Pass the entire property object to the parent
  }

  // Handle keyboard navigation
  const handleKeyDown = (e) => {
    if (!showSuggestions || suggestions.length === 0) return

    // Arrow Down
    if (e.key === "ArrowDown") {
      e.preventDefault()
      setSelectedSuggestionIndex((prev) =>
        prev < suggestions.length - 1 ? prev + 1 : prev
      )
    }

    // Arrow Up
    else if (e.key === "ArrowUp") {
      e.preventDefault()
      setSelectedSuggestionIndex((prev) => (prev > 0 ? prev - 1 : 0))
    }

    // Enter
    else if (e.key === "Enter" && selectedSuggestionIndex >= 0) {
      e.preventDefault()
      const selectedProperty = suggestions[selectedSuggestionIndex]
      handleSuggestionClick(selectedProperty)
    }

    // Escape
    else if (e.key === "Escape") {
      setShowSuggestions(false)
      setSelectedSuggestionIndex(-1)
      inputRef.current?.blur()
    }
  }

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault()
    if (searchTerm.trim()) {
      // If there's a matching suggestion, use that; otherwise just use the search term
      const matchingProperty = suggestions.find(
        (p) => p.name.toLowerCase() === searchTerm.toLowerCase()
      )

      if (matchingProperty) {
        onSearch(matchingProperty)
      } else {
        onSearch({ name: searchTerm })
      }
    }
  }

  // Handle input focus
  const handleFocus = () => {
    if (suggestions.length > 0) {
      setShowSuggestions(true)
    }
  }

  // Handle input blur
  const handleBlur = () => {
    // Delay hiding suggestions to allow for click events on the suggestions
    setTimeout(() => setShowSuggestions(false), 200)
  }

  return (
    <div
      className={`search-wrapper 
      relative 
      flex-grow 
      ${className}`}
    >
      <form onSubmit={handleSubmit}>
        <input
          ref={inputRef}
          type="text"
          placeholder={placeholder || "Search..."}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onFocus={handleFocus}
          onBlur={handleBlur}
          onKeyDown={handleKeyDown}
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
      </form>

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
      {showSuggestions && (
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
            overflow-y-auto`}
        >
          {suggestions.map((property, index) => (
            <div
              key={property.id}
              className={`
                px-4 
                py-2 
                text-left 
                text-gray-800 
                hover:bg-gray-100 
                cursor-pointer
                suggestion-item
                ${selectedSuggestionIndex === index ? "bg-gray-100" : ""}`}
              onMouseDown={() => handleSuggestionClick(property)}
              onMouseEnter={() => setSelectedSuggestionIndex(index)}
            >
              {property.name}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default SearchBar
