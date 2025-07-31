// Components
import Link from "next/link"
import Button from "./Button"

// Libs
import { fontTitle } from "@/libs/fonts"
import { clsx } from "clsx"
import { marked } from "marked"
import { useTranslations } from "next-intl"


/**
 * SearchResult component that mimics YouTube search result layout
 *
 * @param {Object} props - Component props
 * @param {number} props.id - Result ID
 * @param {string} props.image - Result image URL
 * @param {string} props.title - Result title
 * @param {string} props.description - Result description (2 lines max)
 * @param {string} props.extra - Result extra
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
  extra,
  slug,
  className = "",
}) => {

  // Translations
  const t = useTranslations('Buscar')

  // Defensive checks for required props
  if (!id || !title || !type) {
    console.warn('SearchResult: Missing required props', { id, title, type })
    return null
  }

  const typesUrls = {
    post: "blog",
    property: "desarrollos",
    link: "link",
  }

  // Fallback for unknown types
  const urlType = typesUrls[type] || 'desarrollos'
  
  // Safe URL generation
  let href = `./${urlType}/${id}-${slug}`
  if (urlType === "link") {
    href = slug
  }

  // Safe fallback values
  const safeImage = image || "/images/home-banner.jpg"
  const safeTitle = title || "Sin título"
  const safeDescription = description || "Sin descripción disponible"

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
            "h-40 md:h-36",
            "bg-cover",
            "bg-center",
            "rounded-lg"
          )}
          style={{
            backgroundImage: `url(${safeImage})`
          }}
        />
      </div>

      {/* Right side - Content */}
      <div
        className={clsx(
          "flex-1",
          "ml-0 md:ml-4",
          "mt-4 md:mt-0",
          "flex",
          "flex-col",
          "justify-between"
        )}
      >
        <div>
          {/* Title */}
          <h3
            className={clsx(
              "text-lg",
              "text-green-dark",
              "line-clamp-2",
              "mb-3",
              "text-center md:text-left",
              fontTitle.className
            )}
          >
            {safeTitle}
          </h3>

          {/* Description */}
          <div
            className={clsx(
              "text-green-dark",
              "text-sm",
              "line-clamp-2",
              "leading-relaxed",
              "mb-4",
              "text-justify md:text-left",
            )}
            dangerouslySetInnerHTML={{ __html: marked.parse(safeDescription) }}
          />
        </div>

        <div className={clsx("flex", "justify-start", "w-full")}>
          <Button
            className={clsx(
              "w-full",
              "md:w-auto",
              "md:px-12",
              "!text-sm",
              "text-center md:text-left"
            )}
            scaleHover={false}
          >
            {t('cardDetails')}
          </Button>
        </div>
      </div>
    </Link>
  )
}

export default SearchResult
