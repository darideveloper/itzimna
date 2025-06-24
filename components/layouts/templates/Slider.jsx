"use client"

// Libs
import { useEffect, useState } from "react"

// Component:
import { Swiper, SwiperSlide } from "swiper/react"
import { Navigation, A11y, Autoplay, Pagination } from "swiper/modules"
import ModalImage from "@/components/ui/ModalImage"
import SlideImage from "@/components/ui/Slides/SlideImage"
import Title from "@/components/ui/Title"

// Styles
import "swiper/css"
import "swiper/css/navigation"
import "swiper/css/pagination"


/**
 * Swiper slider component
 *
 * @param {Object} props - Component props
 * @param {String} props.id - Component id
 * @param {Array} props.imagesData - Array with images data
 * @param {String} props.imagesData[].url - Image url
 * @param {String} props.imagesData[].alt - Image alt
 * @param {String} props.imagesData[].name - Image alt
 * @param {String} props.title - Component title
 * @param {String} props.descriptionMd - Component descriptionMd
 * @param {Number} props.maxSlides - Maximum number of slides. Default is 3
 *
 * @returns {JSX.Element} Swiper slider component
 */
export default function Slider({
  id,
  imagesData,
  title,
  descriptionMd,
  maxSlides = 3,
}) {
  // States
  const [slidesPerView, setSlidesPerView] = useState(3)
  const [activeSlideIndex, setActiveSlideIndex] = useState(1)
  const [modalImage, setModalImage] = useState(null)
  const [modalLoading, setModalLoading] = useState(false)
  const [images, setImages] = useState(imagesData)

  // Effects
  useEffect(() => {

    // Get slides per view when resizing and when component mounts
    const handleResize = () => {

      if (window.innerWidth < 768 || maxSlides == 1) {
        setSlidesPerView(1)
        const imagesNoWhite = imagesData.filter((image) => image.name != "white")
        setImages(imagesNoWhite)
      } else {
        setSlidesPerView(3)
        setImages(imagesData)
      }
    }
    window.addEventListener("resize", handleResize)
    handleResize()
  }, [imagesData])

  return (
    <section
      className={`
        ${id}
        gallery
        relative
      `}
      id={id}
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
        {title && (
          <Title
            className={`
                !mb-2
              `}
          >
            {title}
          </Title>
        )}
        {descriptionMd && (
          <div
            className="markdown container"
            dangerouslySetInnerHTML={{ __html: descriptionMd ? descriptionMd : '' }}
          />
        )}
      </div>

      {/* Slider */}
      <Swiper
        slidesPerView={slidesPerView}
        modules={[Navigation, A11y, Autoplay, Pagination]}
        navigation
        pagination={{ clickable: true }}
        loop={true}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
        }}
        breakpoints={{
          320: {
            slidesPerView: 1,
            spaceBetween: 0,
          },
          768: {
            slidesPerView: maxSlides,
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
        {images.map((image, index) => (
          <SwiperSlide
            key={index}
            className={`
              `}
          >
            <SlideImage
              isActive={slidesPerView != 3 || activeSlideIndex == index}
              imageSrc={image.url}
              imageAlt={image.alt}
              modalLoading={modalLoading}
              setModalImage={setModalImage}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  )
}
