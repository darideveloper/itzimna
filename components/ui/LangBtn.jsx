import { fontTitle } from '@/libs/fonts'
import TransitionLink from '@/components/utils/TransitionLink'

/**
 * Cta component with intl routing
 * 
 * @param {object} props - Props object
 * @param {string} props.className - Additional classes
 * @param {string} props.lang - Language (es, en)
 * @param {string} props.children - Child elements
 * @param {boolean} props.active - Active state
 */
export default function LangBtn({ className, lang, children, active }) {

  return (
    <TransitionLink
      className={`
        lang-btn
        ${active ? 'bg-transparent pointer-events-none' : 'bg-green-dark hover:bg-green-dark/80'}
        ${fontTitle.className}
        px-2
        py-1.5 
        rounded-lg
        transition-all
        duration-200
        disabled:bg-green-dark/80
        ${className}
      `}
      disabled={active}
      href={`/${lang}`}
    >
      {children}
    </TransitionLink>

  )

}