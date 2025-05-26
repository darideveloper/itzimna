export default function Badge({ children, className }) {
  return (
    <div
      className={`
        inline-flex
        bg-green
        rounded-xl
        items-center
        px-3
        py-1
        text-white
        ${className}
      `}
    >
      {children}
    </div>
  )
}
