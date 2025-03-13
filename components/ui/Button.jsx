//components
import TransitionLink from "@/components/utils/TransitionLink"

// Libs
import { fontTitle } from "@/libs/fonts"

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
 * @param {string} props.variant - Button variant ('default' or 'ghost')
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
  variant = "default",
  children,
  ...props
}) {
  // Variant styles TODO: add more variants
  const getVariantStyles = () => {
    switch (variant) {
      case "ghost":
        return !active
          ? "bg-transparent border-2 border-white text-white hover:bg-white hover:text-green-dark"
          : "bg-transparent border-2 border-green-dark text-green hover:bg-transparent cursor-default"
      case "ghost-green":
        return !active
          ? "bg-transparent border-2 border-green text-green hover:bg-green hover:text-white"
          : "bg-transparent border-2 border-green text-green hover:bg-transparent cursor-default"
      
      default:
        return !active
          ? "bg-green hover:bg-yellow text-white"
          : "bg-transparent border-2 border-green-dark text-green hover:bg-transparent cursor-default"
    }
  }

  // Global button styles
  const styles = `
    cta
    ${fontTitle.className}
    block
    px-4 py-2
    ${getVariantStyles()}
    font-thin
    rounded-md
    duration-300
    ${!disabled ? "hover:scale-105" : ""}
    disabled:opacity-70
    disabled:shadow-none
    disabled:bg-green-dark
    ${className}
  `

  return href == "" || disabled ? (
    <button className={styles} onClick={onClick} disabled={disabled} {...props}>
      {children}
    </button>
  ) : (
    <TransitionLink href={href} className={styles} {...props}>
      {children}
    </TransitionLink>
  )
}
