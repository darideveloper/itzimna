"use client"

// Libs
import { useEffect, useState } from 'react'

// Component:
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, A11y, Autoplay, Pagination, Zoom } from 'swiper/modules'
import Image from 'next/image'
import ModalImage from '@/components/ui/ModalImage'

// Styles
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'

export default function Gallery() {

  const [slidesPerView, setSlidesPerView] = useState(3)
  const [activeSlideIndex, setActiveSlideIndex] = useState(1)
  const [modalImage, setModalImage] = useState(null)
  const [modalLoading, setModalLoading] = useState(false)

  // Images keys 
  // (same file names without extension and with spaces replaced by underscores)
  const images = [
    "airepuro",
    "aloma",
    "copaura",
    "lumara",
    "najau",
    "puerta xaibe",
    "punta_cometas",
    "zendera"
  ]

  // Add white image to start and end of images array
  images.unshift("white")
  images.push("white")

  useEffect(() => {
    // Get slides per view when resizing and when component mounts
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setSlidesPerView(1)
      } else {
        setSlidesPerView(3)
      }
    }
    window.addEventListener('resize', handleResize)
    handleResize()
  }, [])

  return (
    <section
      className={`
        gallery
      `}
    >

      {/* Modal for zoom images */}
      <ModalImage
        image={modalImage}
        alt={"test alt"}
        hide={() => setModalImage(null)}
        setLoading={setModalLoading}
      />

      {/* Slider */}
      <Swiper
        slidesPerView={slidesPerView}
        modules={[Navigation, A11y, Autoplay, Pagination]}
        navigation
        pagination={{ clickable: true }}
        autoplay={{
          delay: 3000,
          disableOnInteraction: true,
        }}
        breakpoints={{
          320: {
            slidesPerView: 1,
            spaceBetween: 0,
          },
          768: {
            slidesPerView: 3,
            spaceBetween: 10,
          },
        }}
        className={`
          !pb-12
          !pt-8
        `}
        onSlideChange={(swiper) => {
          setActiveSlideIndex(swiper.activeIndex + 1)
        }}
      >
        {
          images.map((image, index) => {
            const imageSrc = `/images/gallery/${image.replace(" ", "_")}.webp`

            return (
              <SwiperSlide
                key={index}
                className={`
                  relative
                  ${slidesPerView == 3 && activeSlideIndex != index ? "cursor-default" : "cursor-pointer"}
                `}
                onClick={() => {
                  // Zoom active image
                  if (!modalLoading && activeSlideIndex == index) {
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
                  ${slidesPerView == 3 && activeSlideIndex != index ? "opacity-50" : "opacity-0"}
                `}
                >

                </div>
                <Image
                  src={imageSrc}
                  alt={image}
                  width={600}
                  height={400}
                  loading="lazy"
                  className={`
                  mx-auto
                `}
                />
              </SwiperSlide>
            )
          })
        }
      </Swiper>
    </section>

  )
}