// Components
import Link from "next/link"

// Libs
import { fontTitle } from "@/libs/fonts"
import { clsx } from "clsx"
import { marked } from "marked"

/**
 * SearchResult component that mimics YouTube search result layout
 * 
 * @param {Object} props - Component props
 * @param {number} props.id - Result ID
 * @param {string} props.image - Result image URL
 * @param {string} props.title - Result title
 * @param {string} props.description - Result description (2 lines max)
 * @param {string} props.className - Additional CSS classes
 * @param {string} props.type - Result type ("post" or "property")
 * @returns {JSX.Element} SearchResult component
 */
const SearchResult = ({ 
  id,
  image,
  title, 
  description, 
  type,
  className = "" 
}) => {

  const typesUrls = {
    post: 'blog',
    property: 'desarrollos',
  }
  const href = `./${typesUrls[type]}/${id}-${title.toLowerCase().replace(/ /g, "-")}`

  return (
    <Link
      className={clsx(
        "search-result",
        "flex",
        "flex-col",
        "md:flex-row",
        "bg-white",
        "rounded-2xl",
        "shadow-md",
        "hover:shadow-lg",
        "duration-300",
        "border",
        "border-gray-200 hover:border-green-dark",
        "p-4",
        className
      )}
      href={href}
      target="_blank"
    >
      {/* Left side - Image */}
      <div className="flex-shrink-0">
        <div
          className={clsx(
            "w-full",
            "md:w-72",
            "h-40",
            "md:h-32",
            "bg-cover",
            "bg-center",
            "rounded-lg"
          )}
          style={{
            backgroundImage: `url(${image || "/images/home-banner.jpg"})`
          }}
        />
      </div>

      {/* Right side - Content */}
      <div className={clsx("flex-1", "ml-0", "md:ml-4", "mt-4", "md:mt-0", "flex", "flex-col", "justify-between")}>
        <div>
          {/* Title */}
          <h3
            className={clsx(
              "text-lg",
              "text-green-dark",
              "line-clamp-2",
              "mb-3",
              fontTitle.className
            )}
          >
            {title}
          </h3>

          {/* Description */}
          <div
            className={clsx(
              "text-green-dark",
              "text-sm",
              "line-clamp-2",
              "leading-relaxed",
              "mb-4"
            )}
            dangerouslySetInnerHTML={{ __html: marked.parse(description) }}
          />
        </div>

        {/* View Details Button */}
        <div>
          <span
            className={clsx(
              "bg-green",
              "hover:bg-green-dark",
              "text-white",
              "px-6",
              "py-2",
              "rounded-lg",
              "text-sm",
              "font-medium",
              "transition-colors",
              "duration-200"
            )}
          >
            View Details
          </span>
        </div>
      </div>
    </Link>
  )
}

export default SearchResult 