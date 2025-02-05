"use client"

// Libs
import { useEffect, useState } from 'react'
import { useTranslations } from 'next-intl'

// Component:
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, A11y, Autoplay, Pagination } from 'swiper/modules'
import ModalImage from '@/components/ui/ModalImage'
import SlideImage from '@/components/ui/Slides/SlideImage'
import Title from '@/components/ui/Title'

// Styles
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'

export default function Gallery() {

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

  // Get translations
  const t = useTranslations('Home.GallerySection')

  // States
  const [slidesPerView, setSlidesPerView] = useState(3)
  const [activeSlideIndex, setActiveSlideIndex] = useState(1)
  const [modalImage, setModalImage] = useState(null)
  const [modalLoading, setModalLoading] = useState(false)


  // States
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

      <div 
        className={`
          text
          text-center
        `}
      >
        <Title
          className={`
            !mb-2
          `}
        >
          {t('title')}
        </Title>
        <p>
          {t('description')}
        </p>
      </div>

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
        {/* Render slides */}
        {
          images.map((image, index) => (
              <SwiperSlide
                key={index}
              >
                <SlideImage
                  isActive={slidesPerView == 3 && activeSlideIndex == index}
                  imageSrc={`/images/gallery/${image.replace(" ", "_")}.webp`}
                  imageAlt={t(`imagesPre.development`) + " " + image}
                  modalLoading={modalLoading}
                  setModalImage={setModalImage}
                />              
              </SwiperSlide>
            )
          )
        }
      </Swiper>
    </section>

  )
}