import { clsx } from "clsx"

/**
 * IconText component for displaying an icon alongside text
 *
 * @param {Object} props
 * @param {React.ReactNode} props.icon - The icon component to display
 * @param {String} props.text - The text to display next to the icon
 * @param {String} props.className - Additional CSS classes to apply
 * @param {Object} props.iconStyle - Custom styles for the icon
 */
export default function IconText({
  icon,
  text,
  className = "",
  iconStyle = "w-4 h-4",
}) {
  return (
    <p
      className={clsx(
        "flex",
        "items-center",
        "justify-start",
        "text-green",
        className
      )}
    >
      <span
        className={clsx(
          "flex",
          "items-center",
          "mr-2",
          "text-inherit",
          iconStyle
        )}
      >
        {icon}
      </span>
      <span
        className={clsx(
          "capitalize"
        )}
      >
        {text}
      </span>
    </p>
  )
}
