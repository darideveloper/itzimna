
// Libs
import { useTranslations } from 'next-intl'

// Components
import Slider from '@/components/layouts/templates/Slider'


export default function Gallery() {

  // Get translations
  const t = useTranslations('Home.GallerySection')

  // Gallery data
  const imagesNames = [
    "white",
    "airepuro",
    "aloma",
    "copaura",
    "lumara",
    "najau",
    "puerta xaibe",
    "punta cometas",
    "zendera",
    "white"
  ]

  const imagesData = imagesNames.map((name) => {
    return {
      url: `/images/gallery/${name.replace(" ", "_")}.webp`,
      alt: t(`imagesPre.development`) + " " + name,
      name: name
    }
  })

  return (
    <Slider
      id="gallery"
      imagesData={imagesData}
      title={t('title')}
      description={t('description')}
    />
  )
}