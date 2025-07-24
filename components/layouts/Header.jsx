"use client"

// Icons
import { FaWhatsapp, FaPhone } from "react-icons/fa"
import { FaX, FaBars, FaMagnifyingGlass } from "react-icons/fa6"

// Components
import Button from "@/components/ui/Button"
import TransitionLink from "@/components/utils/TransitionLink"
import LangSelector from "@/components/ui/LangSelector"

// Libs
import { useState } from "react"
import { usePathname } from "next/navigation"
import { useTranslations } from "next-intl"
import Image from "next/image"

// Data
import { navLinks } from "@/data/links"

const Header = () => {
  const tMeta = useTranslations("Meta")
  const tNav = useTranslations("General.nav")
  const [isDrawerOpen, setIsDrawerOpen] = useState(false)
  const currentPage = usePathname()
  const homePages = ["/es", "/en"]
  const phoneNumber = "(+52) 9999 07 48 76"

  const links = navLinks.map((item) => ({
    name: tNav(item.name),
    url: item.url,
  }))

  return (
    <div
      className={`
        relative
      `}
    >
      {/* Overlay */}
      {isDrawerOpen && (
        <div
          className={`
            fixed
            inset-0
            bg-transparent
            z-40
          `}
          onClick={() => setIsDrawerOpen(false)}
        />
      )}

      {/* Left Drawer */}
      <div
        className={`
          fixed
          top-0
          left-0
          h-full
          w-64
          bg-white
          shadow-2xl
          z-50
          transform
          transition-transform
          duration-700
          ease-in-out
          flex
          items-center
          justify-center
          ${isDrawerOpen ? "translate-x-0" : "-translate-x-full"}
        `}
      >
        <div
          className={`
            p-4
          `}
        >
          <button
            onClick={() => setIsDrawerOpen(false)}
            className={`
              absolute
              top-4
              right-4
              p-1
              hover:bg-white/20
              rounded-full
              transition-colors
              duration-200
            `}
          >
            <FaX
              className={`
                h-6
                w-6
                text-green-dark
                hover:scale-110
                transition-transform
                duration-200
              `}
            />
          </button>
          <div
            className={`
              flex
              flex-col
              items-center
              space-y-12
              mt-12
            `}
          >
            {links.map((item) => (
              <TransitionLink
                key={item.name}
                href={item.url}
                className={`
                  text-green-dark
                  hover:text-green-dark/80
                  hover:translate-x-2
                  text-lg
                  px-2
                  py-1
                  transition-all
                  duration-200
                `}
                onClick={() => setIsDrawerOpen(false)}
              >
                {item.name}
              </TransitionLink>
            ))}
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <nav
        className={`
          bg-white
          z-[-1]
        `}
      >
        <div
          className={`
            container
            mx-auto
            flex
            items-center
            justify-between
            px-4
            xl:px-8
            py-6
          `}
        >
        {/* Logo */}
        <div
          className={`
            flex-shrink-0
            p-2
          `}
        >
          <TransitionLink
            href="/"
            disable={`${homePages.includes(currentPage)}`}
          >
            <Image
              src="/images/logo.webp"
              alt={"Logo " + tMeta("title")}
              title={"Logo " + tMeta("title")}
              width={60}
              height={60}
              className={`
                logo
                rounded-full
                hover:opacity-90
                transition-opacity
                duration-200`}
            />
          </TransitionLink>
        </div>

        {/* Desktop Navigation */}
        <div
          className={`
            hidden
            nav:flex
            items-center
            justify-center
            flex-1
            mx-8
            z-10
          `}
        >
          <div
            className={`
              link-wrapper
              z-20
            `}
          >
            {links.map((item) => (
              <TransitionLink
                key={item.name}
                href={item.url}
                className={`
                  text-green-dark
                  hover:text-green-dark/80
                  transition-all
                  duration-200
                  px-4
                  py-2
                  hover:scale-105
                `}
              >
                {item.name}
              </TransitionLink>
            ))}
          </div>
        </div>

        {/* Right Section */}
        <div
          className={`
            flex
            items-center
            gap-2
            lg:gap-4
          `}
        >
          {/* Phone Number with Icons */}
          <div
            className={`
              hidden
              items-center
              gap-2
              text-green-dark
              text-sm
              lg:text-base
            `}
          >
            <a
              href={`tel:${phoneNumber.replace(/\D/g, "")}`}
              className={`
                hidden
                sm:inline-block
                hover:text-green-dark/80
                transition-colors
                duration-200
              `}
            >
              {phoneNumber}
            </a>
            <a
              href={`https://wa.me/${phoneNumber.replace(/\D/g, "")}`}
              target="_blank"
              rel="noopener noreferrer"
              className={`
                hover:text-green-dark/80
                transition-colors
                duration-200
              `}
            >
              <FaWhatsapp
                className={`
                  w-5
                  h-5
                `}
              />
            </a>
            <a
              href={`tel:${phoneNumber.replace(/\D/g, "")}`}
              className={`
                hover:text-green-dark/80
                transition-colors
                duration-200
              `}
            >
              <FaPhone
                className={`
                  w-4
                  h-4
                `}
              />
            </a>
          </div>

          {/* Search Icon */}
          <TransitionLink
            className={`
              hover:text-green-dark/80
              transition-colors
              duration-200
            `}
            href="/buscar"
          >
            <FaMagnifyingGlass
              className={`
                w-5
                h-5
                text-green-dark
              `}
            />
          </TransitionLink>

          {/* Language Selectors */}
          <div
            className={`
              flex
              gap-2
              flex-col
              items-center
            `}
          >
            <LangSelector />
          </div>

          {/* Hamburger Menu */}
          <button
            className={`
              nav:hidden
              p-1
              hover:bg-green-dark/20
              rounded-full
              transition-colors
              duration-200
            `}
            onClick={() => setIsDrawerOpen(true)}
          >
            <FaBars
              className={`
                h-6
                w-6
                text-green-dark
                hover:scale-110
                transition-transform
                duration-200
              `}
            />
          </button>
        </div>
        </div>
      </nav>
    </div>
  )
}

export default Header
