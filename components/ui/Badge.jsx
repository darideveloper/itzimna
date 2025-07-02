import { clsx } from "clsx"

export default function Badge({ children, className }) {
  return (
    <div
      className={clsx(
        "inline-flex",
        "bg-green",
        "rounded-xl",
        "items-center",
        "px-3",
        "py-1",
        "text-white",
        className
      )}
    >
      {children}
    </div>
  )
}
