// Icons
import { FaWhatsapp } from "react-icons/fa6"

// Components
import Link from "next/link"

// Libs
import { useTranslations } from "next-intl"
import clsx from "clsx"

// Data
import { whatsappBaseLink } from "@/data/contact"


export default function WhatsappButton() {

  // Translate
  const t = useTranslations("General.contact")
  const whatsappMessage = t("whatsappMessage")
  const whatsappUrl = `${whatsappBaseLink}&text=${encodeURIComponent(whatsappMessage)}`

  return (
    <Link
      href={whatsappUrl}
      target="_blank"
      className={clsx(
        "whatsapp-button",
        "fixed",
        "bottom-4",
        "right-4",
        "z-50",
        "bg-whatsapp",
        "text-white",
        "p-3",
        "rounded-full",
        "shadow-sm",
        "shadow-white/50",
        "duration-300",
        "scale-[130%]",
        "hover:scale-110"
      )}
    >
      <FaWhatsapp className={clsx("text-3xl", "lg:text-4xl")} />
    </Link>
  )
}
