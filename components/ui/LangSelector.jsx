'use client'

// Lang
import { useTranslations } from 'next-intl'

// Routing
import { useRouter } from '@/i18n/routing'
import { usePathname } from 'next/navigation'

// Components
import LangBtn from '@/components/ui/LangBtn'
import Image from 'next/image'


/**
 * Language selector component
 * 
 * @param {object} props - Props object
 * @param {string} props.className - Additional classes
 * @returns 
 */
export default function LangSelector({ className }) {

  // Get translations
  const t = useTranslations('General.Langs')

  const router = useRouter()

  const langs = [
    "es",
    "en",
  ]
  const currentPage = usePathname()
  const currentlang = currentPage.split('/')[1]
  const currentPageNoLang = currentPage.split('/').slice(2).join('/')

  return (
    <div
      className={`
        lang-selector
        ${className}
      `}>
      {
        langs.map(lang => (
          <LangBtn
            key={lang}
            icon={false}
            active={currentlang === lang}
            onClick={() => router.replace(`/${currentPageNoLang}`, { locale: lang })}
            className={`
              
            `}
          >
            <div
              className={`
                lang-content
              `}
            >
              <p
                className={`
                  regular-text
                  full-text
                  hidden sm:block
                `}
              >
                {t(lang)}
              </p>
              <p
                className={`
                  small-text
                  sm:hidden
                `}	
              >
                {lang}
              </p>
              <Image 
                src={`/images/flags/${lang}.webp`}
                alt={t(lang)}
                width={50}
                height={50}
                className={`
                  lang-flag             
                `}
              />
            </div>
          </LangBtn>
        ))
      }

    </div>
  )
}