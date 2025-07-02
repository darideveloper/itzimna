"use client"

// Components
import SearchResult from "../ui/SearchResult"
import Pagination from "../ui/Pagination"
import { useState, useEffect } from "react"
import { useGlobalSearchStore } from "@/store/globalsearch"

/**
 * SearchResults container component that displays multiple search results
 * 
 * @param {Object} props - Component props
 * @param {string} props.className - Additional CSS classes
 * @returns {JSX.Element} SearchResults component
 */
const SearchResults = ({ 
  className = "" 
}) => {

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
    error
  } = useGlobalSearchStore()

  // Load default results on component mount
  useEffect(() => {
    if (results.length === 0 && !loading) {
      loadDefaultResults()
    }
  }, [])

  // Handle page change
  const handlePageChange = async (page) => {
    await changePage(page)
  }

  if (loading) {
    return (
      <div className={`search-results-container py-8 ${className}`}>
        <div className="flex flex-col gap-4">
          {/* Loading skeletons - this looks good than the loading spinner */}
          {[...Array(5)].map((_, index) => (
            <div
              key={index}
              className={`
                flex
                flex-col md:flex-row
                gap-4
                p-4
                bg-white
                rounded-lg
                border
                border-grey
                animate-pulse
              `}
            >
              {/* Thumbnail skeleton */}
              <div className="flex-shrink-0">
                <div
                  className={`
                    w-full md:w-80
                    h-48 md:h-45
                    bg-grey
                    rounded-lg
                  `}
                />
              </div>
              
              {/* Content skeleton */}
              <div className="flex-1 space-y-3">
                <div className="h-6 bg-grey rounded w-3/4"></div>
                <div className="flex gap-4">
                  <div className="h-4 bg-grey rounded w-20"></div>
                  <div className="h-4 bg-grey rounded w-24"></div>
                  <div className="h-4 bg-grey rounded w-16"></div>
                </div>
                <div className="space-y-2">
                  <div className="h-4 bg-grey rounded"></div>
                  <div className="h-4 bg-grey rounded w-5/6"></div>
                  <div className="h-4 bg-grey rounded w-4/6"></div>
                </div>
                <div className="h-8 bg-grey rounded w-24"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    )
  }

  if (results.length === 0 && !loading) {
    return (
      <div className={`search-results-container py-8 ${className}`}>
        <div className="text-center py-12">
          <div className="mb-4">
            <svg
              className="mx-auto h-12 w-12 text-gray-400"
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
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            {error ? "Error de búsqueda" : "No se encontraron resultados"}
          </h3>
          <p className="text-gray-500">
            {error ? error : (query ? `No hay resultados para "${query}"` : "Realiza una búsqueda para ver resultados")}
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className={`search-results-container py-8 ${className}`}>
      {/* Results header */}
      {query && (
        <div className="mb-6">
          <h2 className="text-xl font-semibold text-green-dark mb-2">
            Resultados para "{query}"
          </h2>
          {totalResults > 0 && (
            <p className="text-gray-600 text-sm">
              Aproximadamente {totalResults.toLocaleString()} resultados
            </p>
          )}
        </div>
      )}
      
      {/* Results list */}
      <div className="flex flex-col gap-6">
        {results.map((result, index) => (
          <SearchResult
            key={result.id || index}
            id={result.id}
            image={result.image}
            title={result.title}
            description={result.description}
          />
        ))}
      </div>
      
      {/* Pagination */}
      {results.length > 0 && totalPages > 1 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
          variant="light"
          className="mt-4"
        />
      )}
    </div>
  )
}

export default SearchResults 