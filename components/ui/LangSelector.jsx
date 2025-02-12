'use client'

import { useTranslations } from 'next-intl'
import { useRouter } from '@/i18n/routing'
import { usePathname } from 'next/navigation'
import LangBtn from '@/components/ui/LangBtn'
import Image from 'next/image'

export default function LangSelector({ className }) {
  const t = useTranslations('Langs')
  const router = useRouter()
  const langs = ["es", "en"]
  const currentPage = usePathname()
  const currentlang = currentPage.split('/')[1]
  const currentPageNoLang = currentPage.split('/').slice(2).join('/')

  return (
    <div className={`flex items-center gap-2 lg:gap-3 ${className}`}>
      {langs.map(lang => (
        <LangBtn
          key={lang}
          icon={false}
          active={currentlang === lang}
          onClick={() => router.replace(`/${currentPageNoLang}`, { locale: lang })}
          className={`
            px-2 py-1.5 
            rounded-lg
            transition-all duration-200
            bg-white
            hover:bg-white/80
            disabled:bg-white/80
            ${currentlang === lang ? 'bg-white/5' : ''}
          `}
        >
          <div className="flex items-center gap-2">
            <div className="flex flex-col items-end">
              <span className="hidden sm:block text-green-dark text-sm font-medium">
                {t(lang)}
              </span>
              <span className="sm:hidden text-green-dark text-xs uppercase font-medium">
                {lang}
              </span>
            </div>
            
            <div className="relative w-6 h-4 lg:w-7 lg:h-5">
              <Image 
                src={`/images/flags/${lang}.webp`}
                alt={t(lang)}
                fill
                className="object-cover rounded"
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