'use client'

import { useState } from 'react'
import { useTranslations } from 'next-intl'
import { usePathname } from 'next/navigation'

import { LuMenu, LuX } from "react-icons/lu"
import TransitionLink from '@/components/utils/TransitionLink'
import Image from 'next/image'
import LangSelector from '@/components/ui/LangSelector'


/**
 * Global Header section of the layout
 */
export default function Header() {

  // Get translations
  const t = useTranslations('Header')
  const tMeta = useTranslations('Meta')

  // Header state
  const [menuOpen, setMenuOpen] = useState(false)
  const currentPage = usePathname()

  // Header data
  const links = [
    {
      "name": "link1",
      "url": "/page-1"
    },
    {
      "name": "link2",
      "url": "/page-2"
    },
  ]
  const homePages = [
    "/es",
    "/en"
  ]

  // Common style for menu icons (open anc close)
  const menuIconStyles = `
    w-full
    h-full
  `

  return (
    <header
      className={`
      `}
    >
      <div
        className={`
          content
        `}
      >
        {/* Logo with link */}
        <TransitionLink
          href="/"
          disable={`${homePages.includes(currentPage)}`}
        >
          <Image
            src="/images/logo.webp"
            alt={'Logo ' + tMeta('title')}
            width={150}
            height={150}
            className={`
              logo
            `}
          />
        </TransitionLink>

        <div
          className={`
            nav-wrapper
          `}
        >
          {/* Nav */}
          <nav>
            <ul
              className={`
                nav-items
              `}
            >
              {links.map((link, index) => {

                let activeLink = currentPage.endsWith(link.url)

                return (
                  <li
                    key={index}
                    className={`
                      nav-item
                    `}
                  >
                    <TransitionLink
                      href={link.url}
                      className={`
                        nav-link
                      `}
                      disable={`${activeLink}`}
                      onClick={(e) => {

                        // Hide menu on click (for mobile)
                        if (activeLink) e.preventDefault()
                        setMenuOpen(false)

                      }}
                    >
                      {t(`nav.${link.name}`)}
                    </TransitionLink>
                  </li>
                )
              })}
            </ul>
          </nav>

          {/* Lang */}
          <LangSelector
            className={`
              
            `}
          />

          {/* Menu button */}
          <button
            className={`
              menu-button
            `}
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {/* Menu icons */}
            {/* TODO: change it */}
            <LuMenu
              className={`
                ${menuOpen ? 'opacity-0' : 'opacity-100'}
                ${menuIconStyles}
              `}
            />
            <LuX
              className={`
                ${!menuOpen ? 'opacity-0' : 'opacity-100'}
                ${menuIconStyles}
              `}
            />
          </button>
        </div>
        
      </div>

    </header>
  )
}