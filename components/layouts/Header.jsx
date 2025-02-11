"use client"

import React, { useState } from "react"
import { HiMenu } from "react-icons/hi"
import { IoMdClose } from "react-icons/io"
import Button from "../ui/Button"
import { usePathname } from "next/navigation"
import TransitionLink from "../utils/TransitionLink"
import LangSelector from "../ui/LangSelector"
import { useTranslations } from "next-intl"
import Image from "next/image"

const Header = () => {
  const tMeta = useTranslations("Meta")
  const [isDrawerOpen, setIsDrawerOpen] = useState(false)
  const currentPage = usePathname()
  const homePages = ["/es", "/en"]

  const links = [
    {
      name: "Best Properties",
      url: "#last-properties",
    },
    {
      name: "Fetures Properties",
      url: "#featured-properties",
    },
    {
      name: "Contacts",
      url: "#contacts",
    },
  ]

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
          bg-green-dark
          z-50 
          transform 
          transition-transform 
          duration-300 
          ease-in-out
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
              space-y-6 
              mt-12
            `}
          >
            {links.map((item) => (
              <a
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
              </a>
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
              width={150}
              height={150}
              className="logo hover:opacity-90 transition-opacity duration-200"
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
            z-2
          `}
        >
          <div
            className={`
              w-[800px] 
              h-[600px] 
              bg-green-light/10 
              absolute 
              top-[-440px] 
              mx-auto 
              rounded-full 
              z-10
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
          {/* Phone Number */}
          <div
            className={`
              hidden 
              sm:block 
              text-white
              text-sm 
              lg:text-base 
              hover:text-white/80
              transition-colors
              duration-200
            `}
          >
            (+1) 245 7845
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

          {/* Contact Us Button */}
          <div className="hidden sm:block">
            <Button
              variant="ghost"
              className={`
                border 
                border-white 
                text-white 
                hover:bg-white/20
                hover:scale-105
                transition-all
                duration-200
              `}
            >
              Contact Us
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