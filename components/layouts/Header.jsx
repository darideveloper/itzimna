"use client"

// Icons
import { HiMenu } from "react-icons/hi"
import { IoMdClose } from "react-icons/io"
import { FaWhatsapp, FaPhone } from "react-icons/fa"

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
    <div className="relative">
      {/* Overlay */}
      {isDrawerOpen && (
        <div
          className={`
            fixed 
            inset-0 
            bg-black 
            bg-opacity-50 
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
          bg-green-dark/60
          backdrop-blur-md
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
        <div className="p-4">
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
            <IoMdClose
              className={`
                h-6 
                w-6 
                text-white
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
                  text-white
                  hover:text-white/80
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
          flex 
          items-center 
          justify-between 
          px-4 
          xl:px-8 
          py-4 
          bg-green-dark 
          z-[-1]
        `}
      >
        {/* Logo */}
        <div className="flex-shrink-0">
          <TransitionLink
            href="/"
            disable={`${homePages.includes(currentPage)}`}
          >
            <Image
              src="/images/logo.webp"
              alt={"Logo " + tMeta("title")}
              width={60}
              height={60}
              className={`
                logo
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
            xl:flex 
            items-center 
            justify-center 
            flex-1 
            mx-8 
            z-10
          `}
        >
          <div
            className={`
              w-[820px] 
              h-[600px] 
              bg-green-light/10 
              absolute 
              top-[-510px] 
              mx-auto 
              rounded-full
              z-10
              overflow-hidden
            `}
          ></div>
          {links.map((item) => (
            <a
              key={item.name}
              href={item.url}
              className={`
                text-white 
                hover:text-white/80
                transition-all
                duration-200
                px-4 
                py-2
                hover:scale-105
              `}
              style={{ zIndex: "101" }}
            >
              {item.name}
            </a>
          ))}
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
              flex 
              items-center 
              gap-2
              text-white
              text-sm 
              lg:text-base 
            `}
          >
            <a
              href={`tel:${phoneNumber.replace(/\D/g, "")}`}
              className={`
                hidden
                sm:inline-block
                hover:text-white/80
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
                hover:text-white/80
                transition-colors
                duration-200
              `}
            >
              <FaWhatsapp className="w-5 h-5" />
            </a>
            <a
              href={`tel:${phoneNumber.replace(/\D/g, "")}`}
              className={`
                hover:text-white/80
                transition-colors
                duration-200
              `}
            >
              <FaPhone className="w-4 h-4" />
            </a>
          </div>

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

          {/* Contact Us Button*/}
          <div className="hidden sm:block">
            <Button
              variant="ghost"
              href="#contact"
            >
              {tNav("cta")}
            </Button>
          </div>

          {/* Hamburger Menu */}
          <button
            className={`
              xl:hidden 
              p-1 
              hover:bg-white/20
              rounded-full
              transition-colors
              duration-200
            `}
            onClick={() => setIsDrawerOpen(true)}
          >
            <HiMenu
              className={`
                h-6 
                w-6 
                text-white
                hover:scale-110
                transition-transform
                duration-200
              `}
            />
          </button>
        </div>
      </nav>
    </div>
  )
}

export default Header

