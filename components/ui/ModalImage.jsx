// Components
import Image from 'next/image'

/**
 * ModalImage component
 * @param {Object} props - Component props
 * @param {String} props.image - Image src
 * @param {String} props.alt - Image alt
 * @param {Function} props.hideModel - Function to hide the modal
 * @returns {JSX.Element} ModalImage component
 */
export default function ModalImage({ image, alt, hideModel }) {
  return (
    <div
      className={`
        modal-image
        absolute
        top-0
        left-0
        h-screen
        w-screen
        flex
        items-center
        justify-center
        z-30
        bg-green-dark/40
        p-2
        ${image ? "z-30" : "-z-10"}
        ${image ? "opacity-100" : "opacity-0"}
      `}
      onClick={hideModel}
    >
      <div 
        className={`
          image-wrapper
          h-[50vh] sm:h-[60vh] md:h-[70vh] lg:h-[80vh]
          w-auto
          bg-green-dark
          p-3
          rounded-md
          shadow-lg
        `}
      >
        {
          image
          &&
          <Image
            src={image}
            alt={alt}
            width={1200}
            height={800}
            loading="lazy"
            className={`
              h-full
              w-auto
              rounded-md
              // cover style
              object-cover
            `}
          />
        }
      </div>
    </div>
  )
}