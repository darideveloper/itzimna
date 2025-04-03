// Components
import Title from "@/components/ui/Title"

// Sections
import Filters from "@/components/layouts/Filters"

/**
 * Hero section component
 * 
 * @param {Object} props - Component props
 * @param {string} props.id - Component id
 * @param {string} props.className - Component classes
 * @param {string} props.title - Title text
 * @param {string} props.description - Description text
 * @param {string} props.bgImage - Background image url
 * @param {boolean} props.filtersShowSubmit - Show submit button on filters. Default is true
 * @returns {JSX.Element} Hero section component
 */
const HeroSection = ({ id = "hero", className = "", title, description, bgImage, filtersShowSubmit = true }) => {

  return (
    <div
      id={id}
      className={`
        hero
        relative
        w-full
        md:overflow-hidden
        bg-cover
        bg-center
        bg-fixed
        py-24 md:pb-52 md:pt-24
        ${className}
      `}
      style={{
        backgroundImage: `url(${bgImage})`
      }}
    >
      <div
        className={`
          overlay-effect
          absolute
          inset-0
          bg-green/60
        `}
      />
      <div
        className={`
          container
          relative
          h-full
          flex
          flex-col
          items-center
          justify-center
          px-4
          sm:px-6
          lg:px-8
        `}
      >
        <div
          className={`
            text-center
            max-w-5xl
            w-full
            mx-auto
          `}
        >
          <Title
            isH1={true}
            className={`
              text-white
              !mt-0
            `}
          >
            {title}
          </Title>
          <p
            className={`
              text-xl
              sm:text-2xl
              text-gray-200
              max-w-2xl
              mx-auto
            `}
            data-aos="fade-up"
            data-aos-delay="600"
          >
            {description}
          </p>
          
          {/* Search filters */}
          <Filters 
            showSubmit={filtersShowSubmit}
          />

        </div>
      </div>
    </div>
  )
}

export default HeroSection
