// Libs
import { useEffect, useState } from 'react'
import anime from 'animejs'

// Components
import Image from 'next/image'
import Spinner from '@/components/ui/Spinner'

/**
 * Full screen modal image component
 * @param {Object} props - Component props
 * @param {String} props.image - Image src
 * @param {String} props.alt - Image alt
 * @param {Function} props.hideModel - Function to hide the modal
 * @param {Function} props.setLoading - Function to set loading state
 * @returns {JSX.Element} ModalImage component
 */
export default function ModalImage({ image, alt, hide, setLoading }) {

  const [currentImage, setCurrentImage] = useState(image)
  const [imageLoading, setImageLoading] = useState(false)

  // Animate when image is shown
  useEffect(() => {

    // Animations
    const timeline = anime.timeline({
      easing: 'easeOutExpo',
      duration: 500
    })

    // Render new image
    if (image && !currentImage) {

      setLoading(true)

      // Update image inmediately
      setCurrentImage(image)

      // Fade in modal
      timeline.add({
        targets: '.modal-image',
        zIndex: 30,
      })
      timeline.add({
        targets: '.modal-image',
        opacity: 1,
      })

      // Update loading state
      timeline.finished.then(() => setLoading(false))
      
    // Hide modal
    } else if (!image && currentImage) {
      
      setLoading(true)

      // Fade out modal
      timeline.add({
        targets: '.modal-image',
        opacity: 0,
      })
      timeline.add({
        targets: '.modal-image',
        zIndex: -10,
      })
      
      // Update image after animation
      timeline.finished.then(() => {
        setTimeout(() => {
          setCurrentImage(null)
          setLoading(false)
          setImageLoading(true)
        }, 100)
      })
    }

  }, [image])


  return (
    <div
      className={`
        modal-image
        fixed
        top-0
        left-0
        h-screen
        w-screen
        flex
        items-center
        justify-center
        bg-green-dark/60
        p-2
        -z-10
        opacity-0
      `}
      onClick={hide}
    >
      <div 
        className={`
          image-wrapper
          h-[50vh] sm:h-[60vh] md:h-[70vh] lg:h-[80vh]
          bg-green-dark
          p-3
          rounded-md
          shadow-lg
          relative
        `}
      >
        {
          imageLoading
          &&
          <Spinner 
            isLoading={imageLoading}
            className={`
              !bg-green-dark
              items-center
            `}
          />
        }
        {
          currentImage
          &&
          <Image
            src={currentImage}
            alt={alt}
            title={alt}
            width={1200}
            height={800}
            loading="lazy"
            className={`
              h-full
              w-auto
              rounded-md
              object-cover
            `}
            onLoad={() => {
              setTimeout(() => setImageLoading(false), 500)
            }}
          />
        }
      </div>
    </div>
  )
}