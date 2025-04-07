// Icons
import { FaMapMarkerAlt, FaArrowsAlt, FaBuilding } from "react-icons/fa"

//libs
import Image from "next/image"
import { useTranslations } from "next-intl"

// UI Components
import Button from "@/components/ui/Button"
import TransitionLink from "@/components/utils/TransitionLink"

/**
 * Property card component
 *
 * @param {object} props - Props object
 * @param {string} props.name - Property name
 * @param {string} props.shortDescription - Property short description
 * @param {string} props.imageSrc - Property image URL
 * @param {string} props.company - Property company builder
 * @param {string} props.location - Property location
 * @param {string} props.price - Property price like "1,000.00"
 * @param {string} props.meters - Property size in square meters like "99.00"
 * @param {Array} props.tags - Property tags (array of strings)
 * @param {string} props.href - URL to route to
 * @param {string} props.className - Additional classes
 * @returns {JSX.Element} Property card component
 */
export default function PropertyCard({
  name,
  shortDescription,
  imageSrc,
  company,
  location,
  price,
  meters,
  tags = [],
  href,
  className,
}) {

  const t = useTranslations("PropertyCard")

  return (
    <TransitionLink href={href}>
      <div
        className={`
          property-card
          rounded-2xl
          shadow-sm hover:shadow-lg
          hover:shadow-green
          hover:scale-105
          duration-300
          bg-grey
          overflow-hidden
          border-white hover:border-green
          text-green
          cursor-pointer
          ${className}
        `}
        data-aos="zoom-in"
      >
        <div
          className={`
          relative
          w-full
          h-64
          overflow-hidden
          group
        `}
        >
          <Image
            src={imageSrc || "/images/test.svg"}
            alt={name}
            fill
            className={`
              object-cover
              transition-transform duration-500
              group-hover:scale-110
            `}
            priority
            sizes="100%"
          />

          {/* Tags badges */}
          <div
            className={`
              tags
              absolute
              top-4
              right-4
              flex
              flex-wrap
              items-end
              justify-end
              w-11/12
              gap-1
            `}
          >
            {
              tags.map((tag, index) => (
                <div
                  key={index}
                  className={`
                    bg-green/70 first:bg-green
                    px-3
                    py-1
                    rounded-full
                    flex
                    items-center
                    z-10
                    capitalize
                    
                  `}
                >
                  <span
                    className={`
                      text-sm
                      font-medium
                      text-white
                  `}
                  >
                    {tag}
                  </span>
                </div>
              ))
            }
          </div>
          {/* Description overlay */}
          <div
            className={`
            absolute
            inset-0
            bg-green/70
            opacity-0
            group-hover:opacity-100
            transition-opacity
            duration-300
            flex
            items-center
            justify-center
            p-4
        `}
          >
            <p
              className={`
                text-white
                text-sm
                opacity-0
                group-hover:opacity-100
                transition-opacity
                duration-300
                delay-100
              `}
            >
              {shortDescription}
            </p>
          </div>
        </div>
        <div className={`p-5`}>
          <h2
            className={`
              text-xl
              font-semibold
              text-green
              mb-2
              transition-colors
              duration-200
              hover:text-yellow
              capitalize
          `}
          >
            {name}
          </h2>
          <div
            className={`
              flex
              items-center
              text-gray-800
              mb-4
            `}
          >
            <FaMapMarkerAlt
              className={`
                w-4
                h-4
                mr-1
                text-green
            `}
            />
            <span className={`text-sm`}>{location}</span>
          </div>
          <div
            className={`
              flex
              items-center
              justify-between
              text-gray-800
              mb-4
          `}
          >
            <div className="flex items-center">
              <FaBuilding
                className={`
                  w-4
                  h-4
                  mr-1
                  text-green
              `}
              />
              <span
                className={`
                  text-sm
                  text-green
              `}
              >
                {company}
              </span>
            </div>
            <div
              className={`
            flex
            items-center
          `}
            >
              <FaArrowsAlt
                className={`
                w-4
                h-4
                mr-2
                text-green
              `}
              />
              <span className={`text-sm`}>
                {meters} m<sup>2</sup>
              </span>
            </div>
          </div>
        </div>
        <div
          className={`
            flex
            flex-wrap-reverse
            items-center
            justify-center md:justify-between lg:justify-center
            p-5
            pt-0
        `}
        >
          <Button
            className={`
              w-full md:w-32 lg:w-full
              mt-2
            `}
          >
            {t("cta")}
          </Button>
          <span
            className={`
              text-2xl
              font-bold
              text-green
              hover:text-yellow
              transition-colors
              duration-200
            `}
          >
            ${price}
          </span>
        </div>
      </div>
    </TransitionLink>
  )
}
