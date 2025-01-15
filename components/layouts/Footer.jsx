"use client"

import { useTranslations } from 'next-intl'

import Link from 'next/link'


/**
 * Global Footer section of the layout
 */
export default function Footer() {

  // Get translations
  const tMeta = useTranslations('Meta')

  return (
    <footer>
      <div className="bottom-bar">
        <p
          className={`
            copyrigth
          `}
        >
          {/* Render company name */}
          {tMeta('title')}&nbsp; © 2025 - All rights reserved

          {/* Render powered by */}
          Powered by&nbsp;
          <Link 
            href="mailto:darideveloper@gmail.com"
            target="_blank"
            className={`
              creator-link
            `}
          >
           Dari Dev Team
          </Link>
        </p>

      </div>
    </footer>
  )
}