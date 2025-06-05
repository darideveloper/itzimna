
"use client"

// Libs
import { useTranslations } from 'next-intl'
import { marked } from 'marked';
import { getBestDevelopmentsImages } from '@/libs/api/best-developments-images'
import { useState, useEffect } from 'react'

// Components
import Slider from '@/components/layouts/templates/Slider'

// Styles
import "@/css/markdown.sass"


/**
 * Gallery component to display a slider of images
 * @param {Object} props - Component properties
 * @param {String} props.locale - Locale object for translations
 */
export default function Gallery({ locale }) {

  // Get translations
  const t = useTranslations('Home.GallerySection')
  const [images, setImages] = useState([])


  // Gallery data
  // const imagesNames = [
  //   "white",
  //   "airepuro",
  //   "aloma",
  //   "copaura",
  //   "lumara",
  //   "najau",
  //   "puerta xaibe",
  //   "punta cometas",
  //   "zendera",
  //   "white"
  // ]

  // const imagesData = imagesNames.map((name) => {
  //   return {
  //     url: `/images/gallery/${name.replace(" ", "_")}.webp`,
  //     alt: t(`imagesPre.development`) + " " + name,
  //     name: name
  //   }
  // })

  // Load images from api when mounted or locale changes
  useEffect(() => {

    getBestDevelopmentsImages(locale).then((data) => {

      // Format images data
      const imagesData = data.map((image) => {
        return {
          url: image.image,
          alt: image.alt_text,
          name: image.image.split('/').pop().split('.')[0] // Extract name from URL
        }
      })

      ///Add white images at the beginning and end
      const whiteImage = {
        url: '/images/gallery/white.webp',
        alt: t('imagesPre.development'),
        name: 'white'
      }
      imagesData.unshift(whiteImage)
      imagesData.push(whiteImage)

      // Update state with images data
      setImages(imagesData)
    })
  }, [locale])

  return (
    <Slider
      id="gallery"
      imagesData={images}
      title={t('title')}
      descriptionMd={marked(t('description'))}
    />
  )
}