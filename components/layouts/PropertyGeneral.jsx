import Slider from '@/components/layouts/templates/Slider'
import Title from '@/components/ui/Title'

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
 */
export default function PropertyGeneral({ name, price, category, location, company, short_description, images }) {

  return (
    <div
      className={`
        property-general
      `}
    >
      <div
        className={`
          header
        `}
      >
        <Title
          className={`
            capitalize
            !mt-0
          `}
        >
          {name}
        </Title>

        <p>
          $ {price} MXN
        </p>
      </div>


      {/* TODO: Render category here, as tag badg */}
      <p>
        {category}
      </p>

      {/* Render location here with icon */}
      <p>
        {location}
      </p>

      {/* Render location here with icon */}
      <p
        className={`
          capitalize
        `}
      >
        {company}
      </p>

      <p>
        {short_description}
      </p>

      <Slider
        id="property-gallery"
        imagesData={images}
        maxSlides={1}
      />
    </div>
  )
}