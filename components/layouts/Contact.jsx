"use client"

// Icons
import { FaMapMarkerAlt } from "react-icons/fa"

// Components
import Button from "@/components/ui/Button"
import Input from "@/components/ui/Input"
import IconText from "@/components/ui/IconText"
import Title from "@/components/ui/Title"

// Libs
import { useState } from "react"
import { useForm } from "react-hook-form"
import { useTranslations } from "next-intl"
import { saveLead } from "@/libs/api/leads"
import Swal from 'sweetalert2'


const Contact = () => {

  // Translations
  const t = useTranslations("Contact")

  // States
  const [isLoading, setIsLoading] = useState(false)

  // Form
  const tForm = useTranslations("Form")
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()

  // COntactd ata
  const listOffice = [
    "Yocatán, México",
  ]
  const phone = "(+52) 9999 07 48 76"
  const email = "admin@itzimna.com"

  // Handlers

  // Handle form submit (create a new lead with info
  const onSubmit = async (data) => {

    setIsLoading(true)

    const leadSaved = await saveLead(
      data.fullName,
      data.email,
      data.phone,
      data.message
    )

    // Show alert based in the result
    if (leadSaved) {
      Swal.fire({
        title: t('alerts.success.title'),
        text: t('alerts.success.text'),
        icon: 'success',
        confirmButtonText: t('alerts.confirm'),
      })
    } else {
      Swal.fire({
        title: t('alerts.error.title'),
        text: t('alerts.error.text'),
        icon: 'error',
        confirmButtonText: t('alerts.confirm'),
      })
    }

    setIsLoading(false)
  }

  return (
    <section
      className={`
      relative
      min-h-[600px]
      bg-green-dark
      text-white
      mt-28
      py-8
      overflow-hidden
      bg-[url('/images/contact.webp')]
      bg-cover
      bg-center
      bg-fixed
    `}
      id="contact"
    >

      <div
        className={`
          overlay-effect
          absolute
          inset-0
          bg-green-dark/95
        `}
      />

      {/* Content container */}
      <div
        className={`
        relative
        z-20
        max-w-7xl
        mx-auto
        !py-16
        grid
        md:grid-cols-2
        gap-12
        items-center
        container
      `}
      >
        {/* Left column */}
        <div
          className={`
          space-y-12
        `}
        >
          <div
            className={`
              text-left
            `}
          >
            <Title
              className={`
                !text-5xl
                !mb-4
                text-white
                !mt-0
                lg:text-left
              `}
            >
              {t("title")}
            </Title>
            <p
              className={`
              text-green-light
              py-4
              text-center lg:text-left
            `}
            >
              {t("sub_title")}
            </p>
          </div>

          <div
            className={`
              contact-data
              flex
              flex-col
              lg:flex-row
              justify-between
              gap-8
              text-center lg:text-left
            `}
          >
            {/* Office section */}
            <div className="office">
              <h3
                className={`
                text-xl
                mb-4
                text-white
              `}
              >
                {t("office")}
              </h3>
              <ul
                className={`
                space-y-2
              `}
              >
                {listOffice.map((office) => (
                  <li
                    key={office}
                    className={`
                    text-white
                  `}
                  >
                    <IconText
                      icon={<FaMapMarkerAlt />}
                      text={office}
                      className={`
                        gap-2
                        !text-white
                        !justify-center lg:justify-start
                      `}
                    />
                  </li>
                ))}
              </ul>
            </div>

            {/* Customer service agent */}
            <div className="customer-service">
              <h3
                className={`
                text-xl
                mb-4
                text-white
              `}
              >
                {t("customer_service")}
              </h3>
              <a
                href={`tel:${phone.replace(/\D/g, "")}`}
                className={`
                  text-xl
                  text-green-light
                  hover:opacity-80
                `}
              >
                {phone}
              </a>
            </div>

            {/* Email */}
            <div className="email">
              <h3
                className={`
                  text-xl
                  mb-2
                  text-white
                `}
              >
                {t("email")}
              </h3>
              <a
                href={`mailto:${email}`}
                className={`
                  text-green-light
                  hover:opacity-80
                `}
              >
                {email}
              </a>
            </div>
          </div>


        </div>

        {/* Right column - Contact Form */}
        <div
          className={`
            form-wrapper
            lg:mt-6
          `}
        >
          <form
            onSubmit={handleSubmit(onSubmit)}
            className={`
              space-y-6
              duration-300
              ${isLoading ? "pointer-events-none" : ""}
              ${isLoading ? "opacity-50" : ""}
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
            />

            <Button>{tForm("send")}</Button>
          </form>
        </div>
      </div>
    </section>
  )
}

export default Contact