import { fontTitle } from "@/libs/fonts"


/**
 * Title text (h2 or h1)
 * 
 * @param {object} props - Props object
 * @param {string} props.children - Text to display
 * @param {string} props.className - Additional classes
 * @param {boolean} props.isH1 - Render as h1
 * @param {boolean} props.useAos - Use AOS animation
 */
export default function Title ({ children, className, isH1=false, useAos=true }) {
  
  // Base style
  let style = `
    title
    mt-16
    mb-8
    text-center
    ${fontTitle.className}
    ${className}
  `

  // Change size if h1 or h2
  if (isH1) {
    style += 'text-4xl sm:text-5xl md:text-6xl'
  } else {
    style += 'text-3xl sm:text-4xl'
  }
  
  return (
    <div
      className={`
        title-wrapper
        w-full
      `}
      data-aos={useAos ? "fade-up" : ""}
    >
      {
        isH1
        ? <h1
            className={style}
          >
            {children}
          </h1>
        : <h2
            className={style}
          >
            {children}
          </h2>
      }
    </div>
  )
}