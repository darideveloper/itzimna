/**
 * Input component to use with react-hook-form
 * 
 * @param {object} props
 * @param {string} props.label - Label for the input
 * @param {string} props.name - Name of the input
 * @param {string} props.type - Type of the input. Default is 'text'
 * @param {object} props.register - Register object from the useForm hook
 * @param {boolean} props.required - If the input is required
 * @param {object} props.errors - Errors object from the useForm hook 
 * @param {string} props.placeholder - Placeholder for the input
 * @param {string} props.errorMessage - Error message for the input
 */
export default function Input({
  index = 0,
  label,
  name,
  type = 'text',
  register,
  required,
  errors,
  placeholder,
  errorMessage,
}) {
  return (
    <div  
      className={`
        input-wrapper
      `}
    >
      <label 
        htmlFor={`input-${name}`}
        className={`
          input-label
        `}
      >
        {label}
      </label>
      <input
        type={type}
        {...register(name, { required })}
        aria-invalid={errors[name] ? "true" : "false"}
        id={`input-${name}`}
        placeholder={placeholder}
        className={`
          input
          outline-none focus:outline-none
          text-green
        `}
      />
      {errors[name]?.type === "required" && (
        <p 
          role="alert"
          className={`
            error-message
            text-red-500
          `}
        >
          {errorMessage}
        </p>
      )}
    </div>
  )
}