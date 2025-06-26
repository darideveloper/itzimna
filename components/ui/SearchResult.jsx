// Components
import Image from "next/image"
import { fontTitle } from "@/libs/fonts"



/**
 * SearchResult component that mimics YouTube search result layout
 * 
 * @param {Object} props - Component props
 * @param {number} props.id - Result ID
 * @param {string} props.image - Result image URL
 * @param {string} props.title - Result title
 * @param {string} props.description - Result description (2 lines max)
 * @param {string} props.className - Additional CSS classes
 * @returns {JSX.Element} SearchResult component
 */
const SearchResult = ({ 
  id,
  image,
  title, 
  description, 
  className = "" 
}) => {

  return (
    <div
      className={`
        search-result
        flex
        flex-col md:flex-row
        bg-white
        rounded-2xl
        shadow-md
        hover:shadow-lg
        transition-shadow
        duration-200
        border
        border-gray-200
        hover:border-green-dark
        p-4
        ${className}
      `}
    >
      {/* Left side - Image */}
      <div className="flex-shrink-0">
        <div
          className={`
            w-full md:w-72
            h-40 md:h-32
            bg-cover
            bg-center
            rounded-lg
          `}
          style={{
            backgroundImage: `url(${image || "/images/home-banner.jpg"})`
          }}
        />
      </div>

      {/* Right side - Content */}
      <div className="flex-1 ml-0 md:ml-4 mt-4 md:mt-0 flex flex-col justify-between">
        <div>
          {/* Title */}
          <h3
            className={`
              text-lg
              text-green-dark
              line-clamp-2
              mb-3
              ${fontTitle.className}
            `}
          >
            {title}
          </h3>

          {/* Description */}
          <p
            className={`
              text-green-dark
              text-sm
              line-clamp-2
              leading-relaxed
              mb-4
            `}
          >
            {description}
          </p>
        </div>

        {/* View Details Button */}
        <div>
          <button
            className={`
              bg-green
              hover:bg-green-dark
              text-white
              px-6
              py-2
              rounded-lg
              text-sm
              font-medium
              transition-colors
              duration-200
            `}
          >
            View Details
          </button>
        </div>
      </div>
    </div>
  )
}

export default SearchResult 