"use client"

import React from "react"

/**
 * A controlled input component with react-hook-form
 * 
 * @param {number} [index=0] - Index of input in the form
 * @param {string} [type="text"] - Input type
 * @param {string} [label] - Input label
 * @param {string} name - Input name
 * @param {Function} register - React hook form register function
 * @param {boolean} required - Input required flag
 * @param {Object} errors - React hook form errors object
 * @param {string} placeholder - Input placeholder
 * @param {string} errorMessage - Error message to display
 * @param {number} rows - Number of rows in the textarea
 * @param {Object} rules - React hook form rules object
 * @param {string} className - Additional classes
 * @param {string} variant - Input variant (light/dark)
 * @returns {JSX.Element} Input component
 */
export default function Input({
  index = 0,
  type = 'text',
  label,
  name,
  register,
  required,
  errors,
  placeholder,
  errorMessage,
  rows = 4,
  rules = {},
  className = '',
  variant = "light"
}) {

  const inputStyle = `
    outline-none focus:outline-none
    ${variant === "light" ? "text-white" : "text-green"}
    w-full
    p-3
    rounded
    bg-transparent
    border-2
    ${variant === "light" ? 
        "border-white/20 focus:border-white/80"
      : 
        "border-green/40 focus:border-green"} 
    }
    
    duration-200
  `

  return (
    <div
      className={`
        input-wrapper
        ${className}
      `}
    >
      {label && (
        <label
          htmlFor={`input-${name}`}
          className={`
            input-label
            text-white
          `}
        >
          {label}
        </label>
      )}

      {type === 'textarea' ? (
        <textarea
          {...register(name, { required, ...rules })}
          aria-invalid={errors[name] ? "true" : "false"}
          id={`input-${name}`}
          placeholder={placeholder}
          rows={rows}
          className={`
            input
            ${inputStyle}
          `}
        />
      ) : (
        <input
          type={type}
          {...register(name, { required, ...rules })}
          aria-invalid={errors[name] ? "true" : "false"}
          id={`input-${name}`}
          placeholder={placeholder}
          className={`
            text-area
            ${inputStyle}
          `}
        />
      )}

      {errors[name] && (
        <p
          role="alert"
          className={`
            error-message
            text-yellow
          `}
        >
          {errorMessage || errors[name]?.message}
        </p>
      )}
    </div>
  )
}
