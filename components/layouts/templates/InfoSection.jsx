/**
 * Info card with greay bg and dynamic content
 * 
 * @param {Object} props - Props object
 * @param {string} props.className - Additional classes
 * @param {string} props.children - Child elements
 * @returns 
 */
export default function InfoCard({className, children}) {
  return (
    <section
      className={`
        details
        bg-grey
        rounded-lg
        p-6
        w-full
        ${className}
      `}
    >
      {children}
    </section>
  )
}