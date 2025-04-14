import { fontTitle } from "@/libs/fonts"


/**
 * Title text (h3)
 * 
 * @param {object} props - Props object
 * @param {string} props.children - Text to display
 * @param {string} props.className - Additional classes
 */
export default function Subtitle ({ children, className }) {
  return (
    <h3
      className={`
        subtitle
        ${fontTitle.className}
        ${className}
      `}
    >
      {children}
    </h3>
  )
}
