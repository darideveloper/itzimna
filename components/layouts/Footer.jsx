"use client"

// Icons
import { FaFacebookF, FaInstagram, FaYoutube } from "react-icons/fa"

// Libs
import { useTranslations } from "next-intl"
import Link from "next/link"
import Image from "next/image"

// Components
import Contact from "@/components/layouts/Contact"

// Data
import { navLinks } from "@/data/links"


export default function Footer() {

  // Translate
  const tMeta = useTranslations("Meta")
  const tNav = useTranslations("General.nav")
  const tFooter = useTranslations("Footer")

  const links = navLinks.map((item) => ({
    name: tNav(item.name),
    url: item.url,
  }))

  return (
    <footer
      className={`
      w-full
      bg-green-dark
      text-white
    `}
    >
      <Contact />

      <div
        className={`
        flex
        flex-col
        items-center
        py-4
      `}
      >
        <div
          className={`
          my-4
        `}
        >
          <Image
            src="/images/logo.webp"
            alt={tMeta("title")}
            width={280}
            height={90}
            className={`
              w-24
              hover:opacity-80
              transition-duration-500
              transition-opacity
            `}
          />
        </div>

        <div
          className={`
          flex
          gap-4
          my-4
        `}
        >
          <Link
            href="https://facebook.com"
            aria-label="Facebook"
            className={`
              text-white
              hover:text-green-light
            `}
          >
            <FaFacebookF
              className={`
              text-2xl
            `}
            />
          </Link>
          <Link
            href="https://instagram.com"
            aria-label="Instagram"
            className={`
              text-white
              hover:text-green-light
            `}
          >
            <FaInstagram
              className={`
              text-2xl
            `}
            />
          </Link>
          <Link
            href="https://youtube.com"
            aria-label="YouTube"
            className={`
              text-white
              hover:text-green-light
            `}
          >
            <FaYoutube
              className={`
              text-2xl
            `}
            />
          </Link>
        </div>

        <nav
          className={`
          flex
          justify-center
          flex-wrap
          gap-6
          my-4
        `}
        >
          {links.map((link, index) => (
            <Link
              key={index}
              href={link.url}
              className={`
                text-white
                hover:text-green-light
                text-sm
              `}
            >
              {link.name}
            </Link>
          ))}
        </nav>

        <div
          className={`
          bottom-bar
          w-full
          py-3
        `}
        >
          <p
            className={`
            copyrigth
            text-xs
            text-center
          `}
          >
            {tMeta("title")}&nbsp; © {new Date().getFullYear()} - {tFooter("copy")}
          </p>
          <p
            className={`
            text-xs
            text-center
            mt-1
          `}
          >
            Powered by&nbsp;
            <Link
              href="https://api.whatsapp.com/send?phone=5214493402622"
              target="_blank"
              className={`
                creator-link
                text-green-light
                hover:text-white
              `}
            >
              Dari Dev Team
            </Link>
          </p>
        </div>
      </div>
    </footer>
  )
}
