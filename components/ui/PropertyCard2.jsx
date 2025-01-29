// Icons
import { FaMapMarkerAlt, FaArrowsAlt, FaHome } from "react-icons/fa";

//libs
import Image from "next/image";

// UI Components
import Button from "./Button";

export default function PropertyCard2({
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
        <div className="">
          <p
            className={`
                text-sm
                mb-3
                opacity-80
              `}
          >
            {description}
          </p>
        </div>
        <div
          className={`
              flex
              items-center
              text-white
              mb-4
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
              `}
          />
          <span className={`text-sm`}>{location}</span>
        </div>
        <div
          className={`
              grid
              grid-cols-2
              gap-4`}
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
            <FaArrowsAlt
              className={`
                            w-4
                            h-4
                            mr-2
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
                `}
          >
            <FaHome
              className={`w-4
                  h-4
                  mr-2
            `}
            />
            <span className={`text-sm`}>{category}</span>
          </div>
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
        {/* don't remove, we may need it later<button
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
