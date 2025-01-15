import { fontTitle } from "@/libs/fonts"


/**
 * Title text (h2 or h1)
 * 
 * @param {object} props - Props object
 * @param {string} props.children - Text to display
 * @param {string} props.className - Additional classes
 * @param {boolean} props.isH1 - Render as h1
 */
export default function Title ({ children, className, isH1=false }) {
  
  // Base style
  let style = `
    title
    ${fontTitle.className}
    ${className}
  `

  // Change size if h1 or h2
  if (isH1) {
    style += ' text-3xl'
  } else {
    style += ' text-2xl'
  }
  
  return (
    <>
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
    </>
  )
}