// Styles
import "@/css/markdown.sass"

// Libs
import { clsx } from "clsx"
import { marked } from "marked"

/**
 * TextMd component
 *
 * @param {Object} props - Component props
 * @param {string} props.children - Children text
 * @param {string} props.text - Text to display
 * @param {string} props.className - Class name
 * @returns {JSX.Element} TextMd component
 */
export default function TextMd({ children, text = "", className = "" }) {
  return (
    <div
      className={clsx("text-md", "markdown", "container", className)}
      dangerouslySetInnerHTML={{ __html: marked(text || children) }}
    />
  )
}
