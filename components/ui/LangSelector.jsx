"use client"

// Libs
import { useTranslations } from "next-intl"
import { usePathname } from "next/navigation"

// Components
import LangBtn from "@/components/ui/LangBtn"
import Image from "next/image"

/**
 * LangSelector component for displaying language selection buttons.
 *
 * @param {object} props - Props object
 * @param {string} props.className - Additional classes for styling
 *
 */
export default function LangSelector({ className }) {

  // Translations
  const t = useTranslations("Langs")

  // Router
  const langs = ["es", "en"]

  // Get current page and language
  const currentPage = usePathname()
  const currentlang = currentPage.split("/")[1]
  

  return (
    <div
      className={`
      flex
      items-center
      gap-2
      lg:gap-3
      ${className}
    `}
    >
      {langs.map((lang) => (
        <LangBtn
          key={lang}
          icon={false}
          active={currentlang === lang}
          lang={lang}
        >
          <div
            className={`
            flex
            items-center
            gap-2
          `}
          >
            <div
              className={`
              flex
              flex-col
              items-end
            `}
            >
              <span
                className={`
                hidden
                sm:block
                ${currentlang === lang ? 'text-green-dark' : 'text-white'}
                text-sm
                font-medium
              `}
              >
                {t(lang)}
              </span>
              <span
                className={`
                sm:hidden
                ${currentlang === lang ? 'text-green-dark' : 'text-white'}
                text-xs
                uppercase
                font-medium
              `}
              >
                {lang}
              </span>
            </div>

            <div
              className={`
              relative
              w-6
              h-4
              lg:w-7
              lg:h-5
            `}
            >
              <Image
                src={`/images/flags/${lang}.webp`}
                alt={t(lang)}
                fill
                className={`
                  object-cover
                  rounded
                `}
                sizes="(max-width: 768px) 24px, 28px"
                priority
              />
            </div>
          </div>
        </LangBtn>
      ))}
    </div>
  )
}
