// Icons
import {
  FaMapMarkerAlt,
  FaArrowsAlt,
  FaBuilding,
  FaUser,
} from "react-icons/fa";

//libs
import Image from "next/image";

// UI Components
import Button from "@/components/ui/Button";

/**
 * PropertyCard is a component that displays a property card with an image, description, name, location, price, and other details.
 * 
 * @param {object} props - Component props
 * @param {number} props.id - Property ID
 * @param {string} props.name - Property name
 * @param {string} props.description - Property description
 * @param {string} props.imageSrc - Image URL
 * @param {string} props.company - Company name
 * @param {string} props.location - Location
 * @param {number} props.price - Price
 * @param {string} props.seller - Seller name
 * @param {number} props.meters - Size in m2
 * @param {string} props.category - Category
 * @param {string} props.className - Additional classes
 * @returns {ReactElement} - PropertyCard component
 */
export default function PropertyCard({
  id,
  name,
  description,
  imageSrc,
  company,
  location,
  price,
  seller,
  meters,
  category,
  className,
}) {
  return (
    <div
      className={`
          property-card
          rounded-2xl
          shadow-lg hover:shadow-green-light
          bg-gray-100
          overflow-hidden
          border-2
          border-green-light
          text-gray-800
          cursor-pointer
          ${className}
        `}
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
          src={imageSrc || "images/test.svg"}
          alt={name}
          fill
          className={`
              object-cover
              transition-transform duration-500
              group-hover:scale-110
            `}
          priority
        />
        {/* Category badge */}
        <div
          className={`
              absolute
              top-4
              right-4
              bg-green-light/80
              px-3
              py-1
              rounded-full
              flex
              items-center
              z-10
            `}
        >
          <span className={`
            text-sm
            font-medium
            text-white
            `}
          >{category}</span>
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
            {description}
          </p>
        </div>
      </div>
      <div className={`p-5`}>
        <h2
          className={`
              text-xl
              font-semibold
              text-green-light
              mb-2
              transition-colors
              duration-200
              hover:text-yellow
          `}
        >
          {name}
        </h2>
        <div
          className={`
              flex
              items-center
              text-gray-800
              hover:text-green-light
              transition-colors
              duration-200
              mb-4
            `}
        >
          <FaMapMarkerAlt
            className={`
                w-4
                h-4
                mr-1
                text-green-light
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
              hover:text-green-light
              transition-colors
              duration-200
              mb-4
          `}
        >
          <div className="flex items-center">
            <FaBuilding
              className={`
                  w-4
                  h-4
                  mr-1
                  text-green-light
              `}
            />
            <span
              className={`
                  text-sm
                  text-yellow
              `}
            >
              {company}
            </span>
          </div>
          <div className={
            `flex
            items-center
            `}
          >
            <FaArrowsAlt
              className={`
                w-4
                h-4
                mr-2
                text-green-light
              `}
            />
            <span className={`text-sm`}>
              {meters} m<sup>2</sup>
            </span>
          </div>
        </div>
        <div
          className={`
            flex
            items-center
            hover:text-green-light
            transition-colors
            duration-200
            mb-2
        `}
        >
          <FaUser
            className={`
                w-4
                h-4
                mr-2
                text-green-light
            `}
          />
          <span className={`text-sm`}>Listed by: {seller}</span>
        </div>
      </div>
      <div
        className={`
            flex
            items-center
            justify-between
            p-5
            pt-0
        `}
      >
        <Button
          className={`
            px-4 py-2
            bg-green-light hover:bg-yellow 
            font-thin
            text-white
            rounded-md
            transition-all
            duration-300
            hover:scale-105
            hover:shadow-md hover:shadow-yellow
            hover:-translate-y-1 hover:-translate-x-1
          `}
        >
          View Details
        </Button>
        <span
          className={`
              text-2xl
              font-bold
              text-yellow
              hover:text-green-light
              transition-colors
              duration-200
            `}
        >
          ${new Intl.NumberFormat('en-US').format(price)}
        </span>
      </div>
    </div>
  );
}