import { FaWhatsapp } from "react-icons/fa6"
import Link from "next/link"

export default function WhatsappButton() {
  return (
    <Link
      href="https://api.whatsapp.com/send?phone=5219981234567&text=Hola%20Itzamna,%20me%20gustar%C3%ADa%20saber%20m%C3%A1s%20sobre%20sus%20propiedades."
      target="_blank"
      className={`
        whatsapp-button
        fixed
        bottom-4
        right-4
        z-50
        bg-green-dark hover:bg-green
        text-white
        p-3
        rounded-full
        shadow-sm
        shadow-white/50
        duration-300
        hover:scale-110
      `}
    >
      <FaWhatsapp className="text-3xl" />
    </Link>
  )
}
