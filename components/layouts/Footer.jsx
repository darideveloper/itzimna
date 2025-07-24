"use client"

// Icons
import { FaFacebookF, FaInstagram, FaTiktok } from "react-icons/fa"

// Libs
import { useTranslations } from "next-intl"
import Image from "next/image"
import TransitionLink from "@/components/utils/TransitionLink"
import Link from "next/link"

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

  const socials = [
    {
      name: "Facebook",
      url: "https://www.facebook.com/itzimnarealestate",
      icon: <FaFacebookF />,
    },
    {
      name: "Instagram",
      url: "https://www.instagram.com/itzimnarealestatemid/",
      icon: <FaInstagram />,
    },
    {
      name: "TikTok",
      url: "https://www.tiktok.com/@itzimnarealestate",
      icon: <FaTiktok />,
    },
  ]

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
          bottom
          flex
          flex-col md:flex-row
          items-center
          justify-between
          !py-12 xl:!py-0
          container
          gap-8
          w-full
        `}
      >
        <div
          className={`
            logo-socials
            left
            flex
            flex-col sm:flex-row
            items-center
            justify-start
            gap-0 sm:gap-8
          `}
        >
          {/* Logo */}
          <TransitionLink
            className={`
              my-4
            `}
            href="/"
          >
            <Image
              src="/images/logo.webp"
              alt={tMeta("title")}
              title={tMeta("title")}
              width={280}
              height={90}
              className={`
                w-28
                hover:opacity-80
                transition-duration-500
                transition-opacity
              `}
            />
          </TransitionLink>

          {/* Socials */}
          <div
            className={`
              socials
              flex
              gap-4
              my-4
            `}
          >
            {socials.map((social, index) => (
              <Link
                key={index}
                href={social.url}
                aria-label={social.name}
                className={`
                    text-white
                    duration-300
                    hover:text-green-light
                    hover:scale-110
                    text-3xl
                  `}
                target="_blank"
              >
                {social.icon}
              </Link>
            ))}
          </div>
        </div>

        <div
          className={`
            texts
            right
            flex
            flex-col
            !items-center
            !justify-center
          `}
        >
          {/* Nav */}
          <nav
            className={`
              flex
              justify-center
              flex-col sm:flex-row
              gap-6
              my-4
            `}
          >
            {links.map((link, index) => (
              <TransitionLink
                key={index}
                href={link.url}
                className={`
                  text-white
                  duration-300
                  hover:text-green-light
                  text-sm
                  text-center
                `}
              >
                {link.name}
              </TransitionLink>
            ))}
          </nav>

          {/* Copy */}
          <div
            className={`
            copy-bar
            w-full
            py-3
            border-none
          `}
          >
            <p
              className={`
              copyrigth
              text-xs
              text-center
            `}
            >
              {tMeta("title")}&nbsp; © {new Date().getFullYear()} -{" "}
              {tFooter("copy")}
              &nbsp; | Powered by&nbsp;
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
      </div>
    </footer>
  )
}
