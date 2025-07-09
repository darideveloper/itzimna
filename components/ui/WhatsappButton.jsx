// Icons
import { FaWhatsapp } from "react-icons/fa6"

// Components
import Link from "next/link"

// Libs
import { useTranslations } from "next-intl"


export default function WhatsappButton() {

  // Fixed data
  const phone = '5219993019999'

  // Translate
  const t = useTranslations("General.contact")
  const whatsappMessage = t("whatsappMessage")
  const whatsappUrl = `https://api.whatsapp.com/send?phone=${phone}&text=${encodeURIComponent(whatsappMessage)}`

  return (
    <Link
      href={whatsappUrl}
      target="_blank"
      className={`
        whatsapp-button
        fixed
        bottom-4
        right-4
        z-50
        bg-whatsapp
        text-white
        p-3
        rounded-full
        shadow-sm
        shadow-white/50
        duration-300
        scale-[130%]
        hover:scale-110
      `}
    >
      <FaWhatsapp className="text-3xl lg:text-4xl" />
    </Link>
  )
}
