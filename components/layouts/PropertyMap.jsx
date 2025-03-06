// Components
import Title from "@/components/ui/Title"

// Libs
import { useTranslations } from "next-intl"

/**
 * Goolgle Maps iframe
 * 
 * @param {Object} props - Google Maps iframe
 * @param {String} props.googleMapsSrc - Google Maps iframe source
 * @param {String} props.className - Additional CSS classes
 */
export default function PropertyMap({ googleMapsSrc, className }) {

  const t = useTranslations('PropertyMap')

  return (
    <div 
      className={`
        map-wrapper
        ${className}
      `}
    >
      <Title
        className={`
          !mt-0
          text-center md:text-left
        `}
      >
        {t('title')}
      </Title>

      <iframe
        title="Map"
        src={googleMapsSrc}
        width="100%"
        height="450"
        style={{ border: 0 }}
        allowFullScreen=""
        aria-hidden="false"
        tabIndex="0"
        className={`
          rounded-lg
          shadow-lg
        `}
      />
    </div>
  )
}