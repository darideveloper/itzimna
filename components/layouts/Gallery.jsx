"use client"

// Component:
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, A11y, Autoplay, Pagination } from 'swiper/modules'
import Image from 'next/image'

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

  return (
    <section
      className={`
        gallery
        w-full
      `}
    >
      <Swiper
        modules={[Navigation, A11y, Autoplay, Pagination]}
        navigation
        pagination={{ clickable: true }}
        // Show active slide index
        onSlideChange={(swiper) => console.log('slide change', swiper.activeIndex)}
        autoplay={{
          delay: 8000,
          disableOnInteraction: false,
        }}
        breakpoints={{
          230: {
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
      >
        {
          images.map((image, index) => (
            <SwiperSlide 
              key={index}
              className={`
              `}
            >
              <Image
                src={`/images/gallery/${image.replace(" ", "_")}.webp`}
                alt={image}
                width={600}
                height={400}
                loading="lazy"
                className={`
                  mx-auto
                `}
              />
            </SwiperSlide>
          ))
        }
        <SwiperSlide>Slide 1</SwiperSlide>
      </Swiper>
    </section>

  )
}