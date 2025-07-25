"use client"

// Components
import Hero from "./templates/Hero"

// Libs
import { useState, useRef, useCallback, useEffect } from "react"
import { useGlobalSearchStore } from "@/store/globalsearch"
import { clsx } from "clsx"
import { useTranslations } from "next-intl"

// Icons
import { FaSearch } from "react-icons/fa"
import { FaX } from "react-icons/fa6"

// Utility function for debouncing
const debounce = (func, delay) => {
  let timeoutId
  return (...args) => {
    clearTimeout(timeoutId)
    timeoutId = setTimeout(() => func.apply(null, args), delay)
  }
}

/**
 * HeroSearch section component with search input
 *
 * @param {Object} props - Component props
 * @param {string} props.className - Component classes
 * @returns {JSX.Element} HeroSearch section component
 */
const HeroSearch = ({ className = "", locale = "es" }) => {
  // Translations and data
  const t = useTranslations("Buscar")
  const title = t("title")
  const placeholder = t("placeholder")
  const bgImage = "/images/hero-buscar.webp"

  // Global search store
  const { searchProperties, setLocale } = useGlobalSearchStore()

  // Local states
  const [localSearchTerm, setLocalSearchTerm] = useState("")
  const [isInputFocused, setIsInputFocused] = useState(false)

  // Refs
  const inputRef = useRef(null)

  // Debounced search function
  const debouncedSearch = useCallback(
    debounce(async (searchTerm) => {
      await searchProperties(searchTerm)
    }, 500), // 500ms delay
    [searchProperties]
  )

  // Handle search input change
  const handleInputChange = (e) => {
    const value = e.target.value
    setLocalSearchTerm(value)
  }

  // Handle keyup for search
  const handleKeyUp = (e) => {
    const searchTerm = e.target.value.trim()
    debouncedSearch(searchTerm)
  }

  // Handle clear search
  const handleClearSearch = () => {
    setLocalSearchTerm("")
    inputRef.current.focus()
  }

  // Set locale to zustand when load
  useEffect(() => {
    setLocale(locale)
  }, [locale])

  return (
    <Hero
      id={"search-hero"}
      title={title}
      bgImage={bgImage}
      className={clsx(className)}
    >
      <div
        className={clsx("relative", "z-50", "mb-16", "max-w-4xl", "mx-auto")}
      >
        <div
          className={clsx(
            "search-container",
            "mt-8",
            "w-full",
            "mx-auto",
            "px-6",
            "md:px-16",
            "py-10",
            "rounded-xl",
            "bg-black",
            "backdrop-filter",
            "backdrop-blur"
          )}
        >
          <div className={clsx("search-wrapper", "relative", "flex-grow")}>
            <input
              ref={inputRef}
              type="text"
              placeholder={placeholder}
              value={localSearchTerm}
              onChange={handleInputChange}
              onKeyUp={handleKeyUp}
              className={clsx(
                "outline-none",
                "focus:outline-none",
                "text-white",
                "w-full",
                "p-3",
                "rounded",
                "bg-transparent",
                "border-2",
                "border-white/20",
                "focus:border-white/80",
                "duration-200",
                "placeholder-white/60"
              )}
              onFocus={() => setIsInputFocused(true)}
              onBlur={() => setIsInputFocused(false)}
            />

            {/* Search Icon */}
            <button
              className={clsx(
                "icon-wrapper",
                "absolute",
                "right-3",
                "top-1/2",
                "transform",
                "-translate-y-1/2",
                "text-gray-500",
                "p-2",
                "z-20",
                "cursor-pointer",
                "hover:text-white"
              )}
              onClick={handleClearSearch}
            >
              {localSearchTerm ? (
                /* Close icon when searching */
                <FaX
                  className={clsx(
                    "w-4",
                    "h-4",
                    isInputFocused ? "text-white" : "text-white/40",
                    "hover:text-white",
                    "cursor-pointer"
                  )}
                />
              ) : (
                /* Search icon by default */
                <FaSearch
                  className={clsx(
                    "w-5",
                    "h-5",
                    isInputFocused ? "text-white" : "text-white/40",
                    "pointer-events-none"
                  )}
                />
              )}
            </button>
          </div>
        </div>
      </div>
    </Hero>
  )
}

export default HeroSearch
