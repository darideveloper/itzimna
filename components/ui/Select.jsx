"use client"

import { FaChevronDown, FaCircleNotch } from "react-icons/fa"

/**
 * Select / dropdown component
 * 
 * @param {Object} props - Component props
 * @param {Array} props.options - Array of options
 * @param {Array} props.options[].value - Option value
 * @param {Array} props.options[].label - Option label
 * @param {string} props.placeholder - Placeholder text
 * @param {Function} props.onChange - On change event
 * @param {Object} props.value - Selected value object (value, label)
 * @param {string} props.className - Additional class name
 * @param {string} props.prefix - Prefix text
 * @param {string} props.postfix - Postfix text
 * @param {Function} props.onOpen - On open additional event
 * @param {boolean} props.isOpen - Is open state
 * @param {Function} props.setIsOpen - Set is open state
 * @returns {JSX.Element} Select component
 */
const Select = ({
  options,
  placeholder,
  onChange = null,
  value = {},
  className = "",
  prefix = "",
  postfix = "",
  isOpen = false,
  setIsOpen = () => { }
}) => {

  const handleSelect = (value) => {
    setIsOpen(false)
    if (onChange) onChange(value)
  }

  return (
    <div
      className={`
        relative
        h-full
        ${className}
      `}
    >
      {/* Selected Item */}
      <div
        className={`
          h-full
          w-full
          py-3
          px-4
          rounded
          border-2
          ${isOpen ? 'border-white/80' : 'border-white/20'}
          bg-transparent
          text-white
          cursor-pointer
          duration-200
          flex
          items-center
          justify-between
          capitalize
        `}
        onClick={() => setIsOpen(!isOpen)}
      >
        {/* Display label or selected value */}
        {
          options.length === 0
          ?
            <FaCircleNotch 
              className={`
                animate-spin
                text-gray-500 
              `}
            />
          :
            (
              value?.value === ""
              ?
                `${placeholder}`
              :
                `${value.label} ${postfix}`
            )
        }

        <FaChevronDown
          className={`
            h-5
            w-5
            duration-200
            ${isOpen && 'transform rotate-180'}
            ${isOpen ? 'text-white/80' : 'text-white/20'}
          `}
        />
      </div>

      {isOpen && (
        <ul
          className={`
            relative md:absolute
            left-0
            mt-1
            w-full
            bg-green-dark
            shadow-lg
            overflow-hidden
            z-50
          `}
        >
          {options.map((option) => (
            <li
              key={option.value}
              className={`
                px-4
                cursor-pointer
                bg-transparent hover:bg-yellow
                hover:bg-green-700
                text-white hover:text-black
                transition
                py-3
                hover:opacity-80
                font-bold
              `}
              onClick={() => handleSelect(option)}
            >
              {prefix} {option.label} {postfix}
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

export default Select