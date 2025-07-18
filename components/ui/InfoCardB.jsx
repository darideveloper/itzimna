// Icons
import { 
  FaHome, 
  FaMapMarkerAlt, 
  FaBuilding, 
  FaChartLine, 
  FaShieldAlt, 
  FaHandshake,
  FaSearch,
  FaCalculator,
  FaClipboardCheck,
  FaUsers,
  FaLightbulb,
  FaStar
} from "react-icons/fa"

// Libs
import { clsx } from "clsx"

// Icon mapping for easy access
const iconMap = {
  home: FaHome,
  location: FaMapMarkerAlt,
  building: FaBuilding,
  chart: FaChartLine,
  shield: FaShieldAlt,
  handshake: FaHandshake,
  search: FaSearch,
  calculator: FaCalculator,
  clipboard: FaClipboardCheck,
  users: FaUsers,
  lightbulb: FaLightbulb,
  star: FaStar
}

/**
 * InfoCardB Component - Horizontal Layout
 * @param {Object} props
 * @param {string} props.title - Card title
 * @param {string} props.text - Card description text
 * @param {string} props.iconName - Icon name from iconMap
 * @param {string} props.className - Additional CSS classes
 * @param {boolean} props.useAos - Whether to use AOS animations
 * @returns {JSX.Element} InfoCardB Component
 */
export default function InfoCardB({
  title,
  text,
  iconName,
  className = "",
  useAos = true,
}) {
  const IconComponent = iconMap[iconName] || FaHome

  return (
    <div 
      data-aos={useAos ? "fade-up" : undefined}
      className={clsx(
        "info-card-b",
        "group",
        "flex",
        "items-center",
        "bg-white",
        "rounded-2xl",
        "p-6",
        "shadow-lg",
        "hover:shadow-xl",
        "hover:shadow-green/20",
        "transition-all",
        "duration-300",
        "border",
        "border-grey",
        "hover:border-green",
        "hover:scale-105",
        "cursor-pointer",
        "gap-6",
        className
      )}
    >
      {/* Icon container */}
      <div
        className={clsx(
          "flex-shrink-0",
          "flex",
          "items-center",
          "justify-center",
          "w-16",
          "h-16",
          "bg-green",
          "rounded-xl",
          "shadow-lg",
          "group-hover:bg-green-light",
          "group-hover:scale-110",
          "transition-all",
          "duration-300"
        )}
      >
        <IconComponent
          className={clsx(
            "w-8",
            "h-8",
            "text-white",
            "group-hover:rotate-12",
            "transition-transform",
            "duration-300"
          )}
        />
      </div>

      {/* Content */}
      <div className={clsx("flex-1", "min-w-0")}>
        <h3
          className={clsx(
            "text-xl",
            "font-semibold",
            "text-green-dark",
            "mb-2",
            "group-hover:text-green",
            "transition-colors",
            "duration-300"
          )}
        >
          {title}
        </h3>
        
        <p
          className={clsx(
            "text-gray-600",
            "leading-relaxed",
            "group-hover:text-gray-700",
            "transition-colors",
            "duration-300"
          )}
        >
          {text}
        </p>
      </div>
    </div>
  )
} 