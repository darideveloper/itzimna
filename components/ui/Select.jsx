"use client"

import { useState } from "react";
import { FaChevronDown } from "react-icons/fa";

/**
 * Select / dropdown component
 * 
 * @param {Object} props - Component props
 * @param {Array} props.options - Array of options
 * @param {Array} props.options[].value - Option value
 * @param {Array} props.options[].label - Option label
 * @param {string} props.placeholder - Placeholder text
 * @param {Function} props.onChange - On change event
 * @param {string} props.className - Additional class name
 * @returns {JSX.Element} Select component
 */
const Select = ({ options, placeholder, onChange = null, className = "" }) => {
  const [selected, setSelected] = useState({ value: "", label: placeholder });
  const [isOpen, setIsOpen] = useState(false);

  const handleSelect = (value) => {
    setSelected(value);
    setIsOpen(false);
    if (onChange) onChange(value);
  };

  return (
    <div
      className={`
        relative
        ${className}
      `}
    >
      {/* Selected Item */}
      <div
        className={`
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
          focus:border-white/80
          duration-200
          flex
          items-center
          justify-between
        `}
        onClick={() => setIsOpen(!isOpen)}
      >
        {selected.label}
        <FaChevronDown className="h-5 w-5 text-gray-500" />
      </div>

      {isOpen && (
        <ul
          className={`
            absolute
            left-0
            mt-1
            w-full
            bg-black
            shadow-lg
            overflow-hidden
            z-10
          `}
        >
          {options.map((option) => (
            <li
              key={option.value}
              className={`
                px-4
                cursor-pointer
                bg-black hover:bg-white/10
                hover:bg-green-700
                text-white
                transition
                py-3
                hover:opacity-80
              `}
              onClick={() => handleSelect(option)}
            >
              {option.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Select;