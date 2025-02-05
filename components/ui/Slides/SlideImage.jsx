"use client"

// Components
import Image from 'next/image'

// Styles
import 'swiper/css'

/**
 * ImageSlide for swiper
 * @param {Object} props - ImageSlide props
 * @param {Boolean} props.isActive - If slide is active
 * @param {String} props.imageSrc - Image source
 * @param {String} props.imageAlt - Image alt
 * @param {Boolean} props.modalLoading - If modal is loading
 * @param {Function} props.setModalImage - Set modal image
 */
export default function SlideImage({ 
  isActive, 
  imageSrc, 
  imageAlt,
  modalLoading,
  setModalImage
}) {
  return (
    <div
      className={`
        relative
        w-full
        h-full
        ${isActive ? "cursor-pointer" : "cursor-default"}
      `}
      onClick={() => {
        // Zoom active image
        if (!modalLoading && isActive) {
          setModalImage(imageSrc)
        }
      }}
    >
      <div
        className={`
        overlay
        absolute
        w-full
        h-full
        bg-white
        duration-300
        z-10
        ${isActive ? "opacity-0" : "opacity-50"}
      `}
      >

      </div>
      <Image
        src={imageSrc}
        alt={imageAlt}
        width={600}
        height={400}
        loading="lazy"
        className={`
          mx-auto
          select-none
          draggable-none
        `}
      />
    </div>
  )
}