"use client"

import { useTranslations } from 'next-intl'

import Link from 'next/link'
import Contact from '@/components/layouts/Contact'


/**
 * Global Footer section of the layout
 */
export default function Footer() {

  // Get translations
  const tMeta = useTranslations('Meta')

  return (
    <footer>
      <Contact/>
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
            href="https://api.whatsapp.com/send?phone=5214493402622"
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