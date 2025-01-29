// Icons 
import { FaMapMarkerAlt, FaArrowsAlt, FaHome, FaBuilding, FaUser } from "react-icons/fa";

//libs
import Image from "next/image";

// UI Components
import Button from "./Button";

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
          shadow-lg
          transition-transform transform
          hover:scale-105 
          bg-black
          overflow-hidden
          border-2
          border-green-light
          text-white
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
        {/* Category badge !todo need to change the opacity -- done */}
        <div
          className={`
              absolute
              top-4
              right-4
              bg-black/60
              px-3
              py-1
              rounded-full
              flex
              items-center
              z-10
            `}
        >
          <FaHome
            className={`
              w-4
              h-4
              mr-2
              text-green-light
            `}
          />
          <span className={`text-sm font-medium`}>{category}</span>
        </div>
        {/* Description overlay */}
        <div
          className={`
              absolute
              inset-0
              bg-black/60
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
      <div className="p-5">
        <h2
          className={`
              text-xl
              font-semibold
              text-green-light
              mb-2
              transition-colors
              duration-200
            `}
        >
          {name}
        </h2>
        <div
          className={`
              flex
              items-center
              justify-between
              mb-4
            `}
        >
          <div
            className={`
                flex
                items-center
                text-white
                hover:opacity-80
                transition-colors
                duration-200
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
                text-white
                hover:opacity-80
                transition-colors
                duration-200
              `}
          >
            <FaBuilding
              className={`
                      w-4
                      h-4
                      mr-1
                      text-green-light
                `}
            />
            <span className={`text-sm text-green-light`}>{company}</span>
          </div>
        </div>
        <div
          className={`
              flex
              items-center
              text-white
              hover:opacity-80
              transition-colors
              duration-200
              mb-4
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
        <div
          className={`
              flex
              items-center
              text-white
              hover:opacity-80
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
        <span
          className={`
              text-2xl
              font-bold
              text-yellow
            `}
        >
          {price}
        </span>
        {/* don't remove, we may need it later
        <button
          className="px-4 py-2 bg-[#234B5C] text-white rounded-md transition-all duration-300 
                     hover:bg-[#1a3a47] hover:shadow-lg active:transform active:scale-95"
        >
          View Details
        </button> */}
        <Button
          className={`
            px-4
            py-2
            bg-green-light
            font-thin
            text-black
            rounded-md
            transition-all
            duration-300
          `}
        >
          View Details
        </Button>
      </div>
    </div>
  );
}