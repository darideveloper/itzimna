// Components
import Button from "@/components/ui/Button"
import Input from "@/components/ui/Input"

// Libs
import { useForm } from "react-hook-form"
import { useTranslations } from "next-intl"

/**
 * Contact form
 * 
 * @param {Object} props  - Component props
 * @param {Function} props.onSubmit - Function to handle form submit
 * @param {Boolean} props.showSubmitBtn - Show submit button
 * @param {String} props.className - Additional classes
 * @param {String} props.variant - Color theme (light, dark)
 * @returns {JSX.Element} - Contact form
 */
export default function ContactForm ({ onSubmit, showSubmitBtn = true, className, variant = "light" }) {

  // Translations
  const tForm = useTranslations("Form")

  // Form
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting  },
  } = useForm()

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className={`
        space-y-6
        duration-300
        ${isSubmitting ? "pointer-events-none" : ""}
        ${isSubmitting ? "opacity-50" : ""}
        ${className}
      `}
    >
      <Input
        name="fullName"
        register={register}
        required={true}
        errors={errors}
        placeholder={tForm("name")}
        errorMessage={tForm("name_error")}
        rules={{
          required: tForm("name_error"),
        }}
        variant={variant}
      />

      <Input
        name="email"
        type="email"
        register={register}
        required={true}
        errors={errors}
        placeholder={tForm("email")}
        errorMessage={
          errors.email?.type === "pattern"
            ? tForm("email_invalid")
            : tForm("email_error")
        }
        rules={{
          required: tForm("email_error"),
          pattern: {
            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
            message: tForm("email_invalid"),
          },
        }}
        variant={variant}
      />

      <Input
        name="phone"
        type="tel"
        register={register}
        required={true}
        errors={errors}
        placeholder={tForm("phone")}
        errorMessage={
          errors.phone?.type === "pattern"
            ? tForm("phone_invalid")
            : tForm("phone_error")
        }
        rules={{
          required: tForm("phone_error"),
          pattern: {
            value: /^[0-9]{10}$/,
          },
        }}
        variant={variant}
      />

      <Input
        name="message"
        type="textarea"
        register={register}
        required={true}
        errors={errors}
        placeholder={tForm("message")}
        errorMessage={tForm("message_error")}
        rows={4}
        rules={{
          required: tForm("message_error"),
        }}
        variant={variant}
      />

      {/* Optional submit button */}
      {
        showSubmitBtn &&
        <Button>{tForm("send")}</Button>
      }
    </form>
  )
}