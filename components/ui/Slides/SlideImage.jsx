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
        cursor-pointer
      `}
      onClick={() => {
        // Zoom active image
        if (!modalLoading) {
          setModalImage(imageSrc)
        }
      }}
    >
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
          w-full
          h-auto
          cover
        `}
        data-aos="zoom-in"
      />
    </div>
  )
}