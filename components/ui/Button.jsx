import { fontTitle } from '@/libs/fonts'

import TransitionLink from '@/components/utils/TransitionLink'

/**
 * Cta component with intl routing
 * It can be an action/funtion button or a link button
 * The instance should have one of the following: href or onClick
 * 
 * @param {object} props - Props object
 * @param {string} props.href - URL to route to (link button) (for link buttons)
 * @param {string} props.onClick - Function to run on click (for action buttons)
 * @param {string} props.className - Additional classes
 * @param {boolean} props.disabled - Disable button
 * @param {boolean} props.active - Active button (for toggle)
 * @param {object} props.children - Child components
 * @param {object} props.props - Additional props
 * 
 */
export default function Button({
  href = "",
  onClick = null,
  className,
  disabled = false,
  active = false,
  children,
  ...props
}) {

  // Global bytton styles
  const styles = `
    cta
    ${fontTitle.className}
    block
    px-4 py-2
    bg-green hover:bg-yellow
    font-thin
    text-white
    rounded-md
    duration-300
    hover:scale-105

    disabled:opacity-80
    disabled:cursor-not-allowed
    disabled:shadow-none
    disabled:bg-yellow
    disabled:text-white

    ${active && 'debug'}
    
    ${className}
  `

  const content = (
    <div
      className={`
        content
      `}
    >
      {children}
    </div>
  )

  return (
    (
      href == "" || disabled
        ? 
        <button
          className={styles}
          onClick={onClick}
          disabled={disabled}
          {...props}
        >
          {content}
        </button>
        : 
        <TransitionLink
          href={href}
          className={styles}
          {...props}
        >
          {content}
        </TransitionLink>
    )
  )

}