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
 * InfoCardC Component - Minimal Design
 * @param {Object} props
 * @param {string} props.title - Card title
 * @param {string} props.text - Card description text
 * @param {string} props.iconName - Icon name from iconMap
 * @param {string} props.className - Additional CSS classes
 * @param {boolean} props.useAos - Whether to use AOS animations
 * @returns {JSX.Element} InfoCardC Component
 */
export default function InfoCardC({
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
        "info-card-c",
        "group",
        "relative",
        "bg-white",
        "rounded-xl",
        "p-8",
        "shadow-sm",
        "hover:shadow-lg",
        "hover:shadow-green/10",
        "transition-all",
        "duration-300",
        "border-l-4",
        "border-l-transparent",
        "hover:border-l-green",
        "hover:scale-102",
        "cursor-pointer",
        className
      )}
    >
      {/* Icon */}
      <div
        className={clsx(
          "flex",
          "items-center",
          "justify-center",
          "w-12",
          "h-12",
          "mb-4",
          "bg-green-light",
          "rounded-lg",
          "group-hover:bg-green",
          "transition-all",
          "duration-300"
        )}
      >
        <IconComponent
          className={clsx(
            "w-6",
            "h-6",
            "text-white",
            "group-hover:rotate-6",
            "transition-transform",
            "duration-300"
          )}
        />
      </div>

      {/* Content */}
      <div>
        <h3
          className={clsx(
            "text-lg",
            "font-semibold",
            "text-green-dark",
            "mb-3",
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
            "text-sm",
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