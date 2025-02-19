export default function Badge({ children }) {
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
        text-sm
      `}
    >
      {children}
    </div>
  )
}
