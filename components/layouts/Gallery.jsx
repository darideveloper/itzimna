"use client"

// Libs
import { useTranslations } from "next-intl"
import { marked } from "marked"
import { getBestDevelopmentsImages } from "@/libs/api/best-developments-images"
import { useState, useEffect } from "react"

// Components
import Slider from "@/components/layouts/templates/Slider"
import Spinner from "@/components/ui/Spinner"

// Styles
import "@/css/markdown.sass"

/**
 * Gallery component to display a slider of images
 * @param {Object} props - Component properties
 * @param {String} props.locale - Locale object for translations
 */
export default function Gallery({ locale }) {
  // Get translations
  const t = useTranslations("Home.GallerySection")
  const [images, setImages] = useState([])

  // Load images from api when mounted or locale changes
  useEffect(() => {
    getBestDevelopmentsImages(locale).then((data) => {
      // Format images data
      const imagesData = data.map((image) => {
        return {
          url: image.image,
          alt: image.alt_text,
          name: image.image.split("/").pop().split(".")[0], // Extract name from URL
        }
      })
      // Update state with images data
      setImages(imagesData)
    })
  }, [locale])

  return (
    <section className={`gallery-wrapper relative`}>
      <Spinner
        isLoading={images.length === 0}
        transparentModal={true}
        className="mt-20 !items-end"
      />
      <Slider
        id="gallery"
        imagesData={images}
        title={t("title")}
        descriptionMd={marked(t("description"))}
      />
    </section>
  )
}
