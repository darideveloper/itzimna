// Libs
import { clsx } from "clsx"
import { fontTitle } from "@/libs/fonts"

/**
 * Hero Base Component
 * @param {Object} props
 * @param {React.ReactNode} props.children
 * @param {string} props.id
 * @param {string} props.title
 * @param {string} props.bgImage
 * @param {string} props.className
 * @returns {JSX.Element} Hero Base Component
 */
export default function HeroBase({
  children,
  id = "hero",
  title,
  bgImage,
  className = "",
}) {
  return (
    <div
      id={id}
      className={clsx(
        "hero",
        "relative",
        "w-full",
        "bg-cover",
        "py-24",
        "md:pb-52",
        "md:pt-24",
        "z-10",
        "bg-fixed",
        "bg-center",
        "bg-no-repeat",
        "bg-cover",
        "bg-white",
        className,
      )}
      style={{
        backgroundImage: `url(${bgImage})`,
      }}
    >
      <div
        className={clsx(
          "container",
          "relative",
          "h-full",
          "flex",
          "flex-col",
          "items-center",
          "justify-center",
          "px-4",
          "sm:px-6",
          "lg:px-8",
          "z-30"
        )}
      >
        <div className={clsx("text-center", "max-w-5xl", "w-full", "mx-auto")}>
          <div className={clsx("title-wrapper", "w-full")}>
            <h1
              className={clsx(
                "title",
                "mb-8",
                "text-center",
                "text-green-dark",
                "!mt-0",
                fontTitle.className
              )}
            >
              <span
                className={clsx(
                  "block",
                  "text-4xl",
                  "sm:text-5xl",
                  "md:text-6xl",
                  "mt-4"
                )}
              >
                {title}
              </span>
            </h1>
          </div>

          {/* Dynamic content */}
          {children}
        </div>
      </div>
    </div>
  )
}
