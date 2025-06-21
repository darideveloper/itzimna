"use client"

// Libs
import { useTranslations } from "next-intl"

// Components
import { Swiper, SwiperSlide } from "swiper/react"
import { Navigation, A11y, Autoplay, Pagination } from "swiper/modules"
import Title from "@/components/ui/Title"
import PropertyCard from "../ui/PropertyCard"

// Styles
import "swiper/css"
import "swiper/css/navigation"
import "swiper/css/pagination"

/**
 * Gallery component to display a slider of images
 * @param {Object} props - Component properties
 * @param {Array} props.relatedProperties - Array of related properties to display
 * @param {String} props.lang - Language code for translations
 */
export default function PropertyRelated({ relatedProperties }) {
  const t = useTranslations("PropertyRelated")

  return (
    <section className="related-properties">
      <Title className={`!text-left !mt-0`}>{t("title")}</Title>

      <Swiper
        slidesPerView={4}
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
          },
          768: {
            slidesPerView: 2,
          },
          1024: {
            slidesPerView: 3,
          },
          1280: {
            slidesPerView: 4,
          },

        }}
        className={``}
      >
        {relatedProperties.map((property) => (
          <SwiperSlide key={property.id} className={``}>
            <PropertyCard
              name={property.name}
              shortDescription={property.short_description}
              imageSrc={property.banner?.url || property.images?.[0]?.url}
              company={property.company}
              location={property.location}
              price={property.price}
              meters={property.meters}
              tags={property.tags.map((tag) => tag.name)}
              href={`/desarrollos/${property.id}-${property.slug}`}
              className={`related-property-card scale-90 hover:!scale-95`}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  )
}
