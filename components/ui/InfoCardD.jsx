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
 * InfoCardD Component - Top Border Accent
 * @param {Object} props
 * @param {string} props.title - Card title
 * @param {string} props.text - Card description text
 * @param {string} props.iconName - Icon name from iconMap
 * @param {string} props.className - Additional CSS classes
 * @param {boolean} props.useAos - Whether to use AOS animations
 * @returns {JSX.Element} InfoCardD Component
 */
export default function InfoCardD({
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
        "info-card-d",
        "group",
        "relative",
        "bg-white",
        "rounded-2xl",
        "p-6",
        "shadow-lg",
        "hover:shadow-xl",
        "hover:shadow-green/20",
        "transition-all",
        "duration-300",
        "border-t-4",
        "border-t-green",
        "hover:border-t-green-light",
        "hover:scale-105",
        "cursor-pointer",
        "overflow-hidden",
        className
      )}
    >
      {/* Icon container */}
      <div
        className={clsx(
          "flex",
          "items-center",
          "justify-center",
          "w-14",
          "h-14",
          "mb-5",
          "mx-auto",
          "bg-green-light",
          "rounded-full",
          "shadow-md",
          "group-hover:bg-green",
          "group-hover:scale-110",
          "transition-all",
          "duration-300"
        )}
      >
        <IconComponent
          className={clsx(
            "w-7",
            "h-7",
            "text-white",
            "group-hover:rotate-12",
            "transition-transform",
            "duration-300"
          )}
        />
      </div>

      {/* Content */}
      <div className={clsx("text-center")}>
        <h3
          className={clsx(
            "text-xl",
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