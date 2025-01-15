import { fontTitle } from '@/libs/fonts'

import { TransitionLink } from '@/components/utils/TransitionLink'

/**
 * Cta component with intl routing
 * It can be an action/funtion button or a link button
 * The instance should have one of the following: href or onClick
 * 
 * @param {object} props - Props object
 * @param {string} props.href - URL to route to (link button) (for link buttons)
 * @param {string} props.onClick - Function to run on click (for action buttons)
 * @param {string} props.text - Text to display
 * @param {string} props.className - Additional classes
 * @param {boolean} props.disabled - Disable button
 * @param {boolean} props.active - Active button (for toggle)
 * 
 */
export default function Button({ 
  href = "",
  onClick = null,
  text,
  className,
  disabled = false,
  active = false
}) {

  // Global bytton styles
  // TODO: add active and disabled logic
  const styles = `
    cta
    ${className}
    ${fontTitle.className}
  `

  const content = (
    <div
      className={`
        content
      `}
    >
      <span>
        {text}
      </span>

    </div>
  )

  return (
    (
      href == "" || disabled
        ? <button
          className={styles}
          onClick={onClick}
          disabled={disabled}
        >
          {content}
        </button>
        : <TransitionLink
          href={href}
          className={styles}
        >
          {content}
        </TransitionLink>
    )
  )

}