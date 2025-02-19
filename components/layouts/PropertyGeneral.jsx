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
      {/* Centered Property Name */}
      <div
        className={`
        text-center
        p-6
        pb-3
      `}
      >
        <Title
          className={`
          capitalize
          text-3xl
          font-bold
          text-gray-800
          !mt-0
        `}
        >
          {name}
        </Title>
      </div>
      {/* Content Section */}
      <div
        className={`
        px-6
        pb-4
      `}
      >
        {/* Price TODO: need to find better position*/}
        <p
          className={`
          text-2xl
          font-semibold
          text-emerald-600
          text-center
          mb-4
        `}
        >
          $ {price} MXN
        </p>
        {/* Tags and Info Section */}
        <div
          className={`
          flex
          flex-wrap
          justify-center
          gap-2
          mb-4
        `}
        >
          <Badge className={``}>
            <IconText
              icon={<FaTag className="text-white" />}
              text={category}
              iconStyle="h-4 w-4"
              className="inline"
            />
          </Badge>
        </div>
        {/* Location and Company */}
        <div
          className={`
          flex
          justify-between
          mr-2
          ml-2
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
        {/* Description */}
        <div
          className={`
          border-t
          border-gray-200
          pt-4
          mb-6
          mx-auto
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
