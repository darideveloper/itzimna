"use client"

// Components
import SearchResult from "../ui/SearchResult"
import Pagination from "../ui/Pagination"
import { useEffect } from "react"
import { useGlobalSearchStore } from "@/store/globalsearch"

// Icons
import { FaSearch } from "react-icons/fa"

// Libs
import { clsx } from "clsx"
import { useTranslations, useLocale } from "next-intl"

/**
 * SearchResults container component that displays multiple search results
 *
 * @param {Object} props - Component props
 * @param {string} props.className - Additional CSS classes
 * @returns {JSX.Element} SearchResults component
 */
const SearchResults = ({ className = "" }) => {
  // Translations
  const t = useTranslations("SearchResults")
  
  // Get current locale
  const locale = useLocale()
  
  // Global search store
  const {
    results,
    loading,
    query,
    totalResults,
    currentPage,
    totalPages,
    changePage,
    loadDefaultResults,
    searchProperties,
    error,
    setLocale,
  } = useGlobalSearchStore()

  // Load default results on component mount
  useEffect(() => {
    if (results.length === 0 && !loading) {
      loadDefaultResults()
    }
  }, [])

  // Update locale in store and reload results when locale changes
  useEffect(() => {
    setLocale(locale)
    // Reload results with new locale
    if (query) {
      // If there's an active search query, reload with that query
      searchProperties(query, currentPage)
    } else {
      // If no query, load default results
      loadDefaultResults()
    }
  }, [locale, setLocale, query, searchProperties, loadDefaultResults])

  // Handle page change
  const handlePageChange = async (page) => {
    // Scroll to top of the page
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    })

    await changePage(page)
  }

  // Show results and total results
  useEffect(() => {
    console.log(results)
    console.log(totalResults)
  }, [results, totalResults])

  if (loading) {
    return (
      <div className={clsx("py-8", "container")}>
        <div className={clsx("flex", "flex-col", "gap-4")}>
          {/* Loading skeletons - this looks good than the loading spinner */}
          {[...Array(5)].map((_, index) => (
            <div
              key={index}
              className={clsx(
                "flex",
                "flex-col",
                "md:flex-row",
                "gap-4",
                "p-4",
                "bg-white",
                "rounded-lg",
                "border",
                "border-grey",
                "animate-pulse",
              )}
            >
              {/* Thumbnail skeleton */}
              <div className="flex-shrink-0">
                <div
                  className={clsx(
                    "w-full",
                    "md:w-80",
                    "h-48",
                    "md:h-45",
                    "bg-grey",
                    "rounded-lg",
                  )}
                />
              </div>

              {/* Content skeleton */}
              <div className={clsx("flex-1", "space-y-3")}>
                <div
                  className={clsx("h-6", "bg-grey", "rounded", "w-3/4")}
                ></div>
                <div className={clsx("flex", "gap-4")}>
                  <div
                    className={clsx("h-4", "bg-grey", "rounded", "w-20")}
                  ></div>
                  <div
                    className={clsx("h-4", "bg-grey", "rounded", "w-24")}
                  ></div>
                  <div
                    className={clsx("h-4", "bg-grey", "rounded", "w-16")}
                  ></div>
                </div>
                <div className={clsx("space-y-2")}>
                  <div className={clsx("h-4", "bg-grey", "rounded")}></div>
                  <div
                    className={clsx("h-4", "bg-grey", "rounded", "w-5/6")}
                  ></div>
                  <div
                    className={clsx("h-4", "bg-grey", "rounded", "w-4/6")}
                  ></div>
                </div>
                <div
                  className={clsx("h-8", "bg-grey", "rounded", "w-24")}
                ></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    )
  }

  if (!results || (results.length === 0 && !loading)) {
    return (
      <div>
        <div className={clsx("text-center", "pt-12")}>
          <div className={clsx("mb-4")}>
            <span
              className={clsx(
                "mx-auto",
                "w-full",
                "h-full",
                "flex",
                "items-center",
                "justify-center",
              )}
            >
              <FaSearch className={clsx("text-green", "text-6xl")} />
            </span>
          </div>
          <h3
            className={clsx("text-lg", "font-medium", "text-gray-900", "mb-2")}
          >
            {error ? t("errorTitle") : t("noResultsTitle")}
          </h3>
          <p className={clsx("text-gray-500")}>
            {error
              ? error
              : query
                ? t("noResultsForQuery", { query })
                : t("performSearch")}
          </p>
        </div>
      </div>
    )
  }

  return (
    <section
      className={clsx(
        "search-results-container",
        "py-8",
        "container",
        className,
      )}
    >
      {/* Pagination */}
      {results.length > 0 && totalPages > 1 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
          variant="light"
          className={clsx("!px-0", "!py-0", "!mt-8")}
        />
      )}

      <div>
        {/* Results header */}
        {query && (
          <div className={clsx("my-6")}>
            <h2
              className={clsx(
                "text-xl",
                "font-semibold",
                "text-green-dark",
                "mb-2",
              )}
            >
              {t("resultsForQuery", { query })}
            </h2>
            {totalResults > 0 && (
              <p className={clsx("text-gray-600", "text-sm")}>
                {t("approximatelyResults", { count: totalResults.toLocaleString() })}
              </p>
            )}
          </div>
        )}

        {/* Results list */}
        <div className={clsx("flex", "flex-col", "gap-6")}>
          {Array.isArray(results) &&
            results.map((result, index) => {
              // Skip invalid results
              if (!result || typeof result !== "object") {
                console.warn("Invalid result at index", index, result)
                return null
              }

              return (
                <SearchResult
                  key={index}
                  id={result.id}
                  image={result.image}
                  title={result.title}
                  description={result.description}
                  type={result.type}
                  extra={result.extra}
                />
              )
            })}
        </div>
      </div>
      {/* Pagination */}
      {results.length > 0 && totalPages > 1 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
          variant="light"
          className={clsx("!px-0", "!py-0", "!mt-0")}
        />
      )}
    </section>
  )
}

export default SearchResults
