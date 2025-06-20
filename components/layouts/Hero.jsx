// Components
import { fontTitle } from "@/libs/fonts"

// Sections
import Filters from "@/components/layouts/Filters"

// Libs
import { marked } from 'marked';

// Styles
import "@/css/markdown.sass"

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

  // Split title by ':' character
  const titleParts = title ? title.split(':') : [''];
  const titleTop = titleParts[0]?.trim() || '';
  const titleBottom = titleParts.slice(1).join(':').trim() || '';

  return (
    <div
      id={id}
      className={`
        hero
        relative
        w-full
        bg-cover
        py-24 md:pb-52 md:pt-24
        ${className}
        z-10
      `}
      style={{
        backgroundImage: `url(${bgImage})`,
        
      }}
    >
      <div
        className={`
          overlay-effect
          absolute
          inset-0
            
          z-10
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
            z-30
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
          <div
            className={`
              title-wrapper
              w-full
            `}
          >
            <h1
              className={`
                title
                mb-8
                text-center
                // black text in home and white in search
                ${filtersShowSubmit ? 'text-green-dark' : 'text-white'}
                !mt-0
                ${fontTitle.className}
              `}
            >
              {/* Split text only in home */}
              {
                filtersShowSubmit ? (
                  <>
                    <span className="block text-2xl sm:text-3xl md:text-4xl">{titleTop}</span>
                    {titleBottom && <span className="block text-4xl sm:text-5xl md:text-6xl mt-4">{titleBottom}</span>}
                  </>
                ) : (
                  <span className="block text-4xl sm:text-5xl md:text-6xl mt-4">{title}</span>
                )
              }
            </h1>
          </div>

          <div
            className="text-green-dark markdown"
            dangerouslySetInnerHTML={{ __html: description ? marked(description) : '' }}
          />

          {/* Search filters */}
          <div className="relative z-50 mb-16">
            <Filters
              showSubmit={filtersShowSubmit}
            />
          </div>

        </div>
      </div>
    </div>
  )
}

export default HeroSection
