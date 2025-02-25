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
      className={`
        flex
        items-center
        justify-start
        ${className}
        text-green
      `}
    >
      <span
        className={`
          flex
          items-center
          ${iconStyle}
          mr-2
          text-inherit
        `}
      >
        {icon}
      </span>
      <span>
        {text}
      </span>
    </p>
  )
}
