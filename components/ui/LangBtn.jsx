import { fontTitle } from '@/libs/fonts'

/**
 * Cta component with intl routing
 * 
 * @param {object} props - Props object
 * @param {string} props.className - Additional classes
 * @param {function} props.onClick - Click handler
 * @param {string} props.children - Child elements
 * @param {boolean} props.active - Active state
 */
export default function LangBtn({ className, onClick, children, active }) {

  return (
    <button
      className={`
        lang-btn
        ${active && 'opacity-50'}
        ${fontTitle.className}
        ${className}
      `}
      disabled={active}
      onClick={onClick}
    >
      {children}
    </button>

  )

}