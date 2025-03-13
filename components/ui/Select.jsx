"use client"

// Icons
import { FaChevronDown } from "react-icons/fa"


/**
 * Select component
 *
 * @param {Array} options - Array of options, each item must have a "value" and a "label" property
 * @param {String} placeholder - Placeholder to show when no option is selected
 * @param {function} onChange - Function to call when an option is selected
 * @param {String} className - Additional classes for styling
 *
 * @returns {JSX.Element} Select component
 */
const Select = ({ options, placeholder, onChange = null, className = "" }) => {
  return (
    <div
      className={`
        sleect-wrapper
        relative
        ${className}
      `}
    >
      <select
        onChange={(e) => onChange(e.target.value)}
        className={`
          appearance-none
          w-full
          py-3
          px-4
          pl-10
          rounded
          border-2
          border-white/20
          bg-transparent
          text-white
          cursor-pointer
          focus:outline-none
          focus:border-white/80
          duration-200
        `}
      >
        <option
          value=""
          disabled
          selected
          style={{ backgroundColor: "#1a2e1f" }}
        >
          {placeholder}
        </option>
        {options.map((option, index) => (
          <option
            key={index}
            value={option.value}
            style={{ backgroundColor: "#1a2e1f" }}
          >
            {option.label}
          </option>
        ))}
      </select>
      {/* Dropdown Icon */}
      <div
        className={`
          absolute
          left-3
          top-1/2
          transform
          -translate-y-1/2
          pointer-events-none
          text-gray-500
        `}
      >
        <FaChevronDown className="h-5 w-5" />
      </div>
    </div>
  )
}

export default Select
