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
 * InfoCardE Component - Compact Design
 * @param {Object} props
 * @param {string} props.title - Card title
 * @param {string} props.text - Card description text
 * @param {string} props.iconName - Icon name from iconMap
 * @param {string} props.className - Additional CSS classes
 * @param {boolean} props.useAos - Whether to use AOS animations
 * @returns {JSX.Element} InfoCardE Component
 */
export default function InfoCardE({
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
        "info-card-e",
        "group",
        "bg-white",
        "rounded-lg",
        "p-5",
        "shadow-md",
        "hover:shadow-lg",
        "hover:shadow-green/15",
        "transition-all",
        "duration-300",
        "border",
        "border-grey",
        "hover:border-green-light",
        "hover:scale-102",
        "cursor-pointer",
        className
      )}
    >
      {/* Header with icon and title */}
      <div className={clsx("flex", "items-center", "mb-3", "gap-3")}>
        <div
          className={clsx(
            "flex",
            "items-center",
            "justify-center",
            "w-10",
            "h-10",
            "bg-green",
            "rounded-lg",
            "group-hover:bg-green-light",
            "transition-all",
            "duration-300"
          )}
        >
          <IconComponent
            className={clsx(
              "w-5",
              "h-5",
              "text-white",
              "group-hover:rotate-6",
              "transition-transform",
              "duration-300"
            )}
          />
        </div>
        
        <h3
          className={clsx(
            "text-lg",
            "font-semibold",
            "text-green-dark",
            "group-hover:text-green",
            "transition-colors",
            "duration-300"
          )}
        >
          {title}
        </h3>
      </div>
      
      {/* Content */}
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
  )
} 