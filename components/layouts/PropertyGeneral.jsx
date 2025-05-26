// Icons
import { FaMapMarkerAlt, FaBuilding, FaTag, FaArrowsAlt } from "react-icons/fa"

// Components
import Slider from "@/components/layouts/templates/Slider"
import Title from "@/components/ui/Title"
import Badge from "@/components/ui/Badge"
import IconText from "@/components/ui/IconText"

/**
 * Property details layout for desarrollos page (property details page)
 *
 * @param {Object} props - Property details
 * @param {String} props.name - Property name
 * @param {String} props.price - Property price like "1,000.00"
 * @param {String} props.category - Property category
 * @param {String} props.location - Property location
 * @param {String} props.company - Property company
 * @param {String} props.short_description - Property short description
 * @param {Array} props.images - Array of image objects for the slider
 */
export default function PropertyGeneral({
  name,
  price,
  category,
  location,
  company,
  meters,
  short_description,
  images,
}) {
  return (
    <div>

      <div 
        className={`
          content
          flex
          flex-col md:flex-row
          w-full
          gap-6
          align-items-center
          justify-center
        `}
      >

        {/* Top info */}
        <header
          className={`
            flex
            flex-col md:flex-row
            justify-between 
            items-start
            gap-4
            w-full md:w-1/2 lg:w-2/3
          `}
        >
          {/* Centered Property Name */}
          <div
            className={`
            left
            flex
            flex-col
            justify-between
            items-start
            w-full
          `}
          >
            <Title
              className={`
                capitalize
                text-3xl
                text-gray-800
                md:!text-left
                w-full
                !mt-0
                !mb-2
              `}
            >
              {name}
            </Title>

            {/* Price and Category */}
            <div
              className={`
              right
              w-full
              flex
              flex-col
              justify-center
              items-center md:items-start
            `}
            >
              {/* Price */}
              <p
                className={`
                text-2xl
                font-semibold
                text-emerald-600
                text-left
                my-2
              `}
              >
                $ {price}
              </p>

              {/* Tags and Info Section */}
              <div
                className={`
                flex
                flex-wrap
                justify-start
                gap-2
                mb-4
              `}
              >
                <Badge className={``}>
                  <IconText
                    icon={<FaTag className="text-white" />}
                    text={category}
                    iconStyle="h-4 w-4"
                    className="inline text-white"
                  />
                </Badge>
              </div>
            </div>

            {/* Content Section */}
            <div
              className={`
                w-full              
              `}
            >

              {/* Location and Company */}
              <div
                className={`
                  flex
                  flex-wrap
                  justify-center md:justify-start
                  gap-4
                  items-center md:items-start
                  mx-2
                  w-full
                  -ml-0 md:ml-2
                `}
              >
                <IconText icon={<FaMapMarkerAlt />} text={location} />
                <IconText text={`${meters} m²`} icon={<FaArrowsAlt />} />
                <IconText
                  icon={<FaBuilding />}
                  text={company}
                  className="capitalize"
                />
              </div>
            </div>

          </div>


        </header>

        {/* Description */}
        <div
          className={`
            border-t
            border-green md:border-transparent
            pt-4 md:pt-0
            my-4
            mx-auto
            text-center md:text-left
            w-full md:w-1/2 lg:w-2/3
            flex
            flex-col
            align-items-center
            justify-center
          `}
        >
          <p
            className={`
            text-gray-600
            leading-relaxed
          `}
          >
            {short_description}
          </p>
        </div>
      </div>

      {/* Full-width Image Slider Section */}
      <div>
        <Slider id="property-gallery" imagesData={images} maxSlides={1} />
      </div>
    </div>
  )
}
