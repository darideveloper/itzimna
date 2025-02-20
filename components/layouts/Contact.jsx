"use client"

// Icons
import { FaMapMarkerAlt } from "react-icons/fa"

// Components
import Button from "@/components/ui/Button"
import Input from "@/components/ui/Input"
import IconText from "@/components/ui/IconText"
// Libs
import React from "react"
import Image from "next/image"
import { useForm } from "react-hook-form"
import { useTranslations } from "next-intl"

const Contact = () => {
  const t = useTranslations("Contact")
  const tForm = useTranslations("Form")
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()

  const listOffice = [
    "Office 1",
    "New Market, Dhaka, Bangladesh",
    "Office 3",
    "Office 4",
  ]
  const phone = "(+52) 9999 07 48 76"
  const email = "admin@itzimna.com"
  const onSubmit = async (data) => {
    await fetch("/api/form", {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    }).then((res) => {
      console.log(res)
    })
  }

  return (
    <div
      className={`
      relative
      min-h-[600px]
      bg-green-dark
      text-white
    `}
      id="contact"
    >
      <div
        className={`
        absolute
        inset-0
      `}
      >
        <div
          className={`
          absolute
          inset-0
          bg-gradient-to-b
          from-green-dark
          to-transparent
          z-10
        `}
        />
        {/* TODO: Change image */}
        <Image
          src="/images/hero.webp"
          alt="Background"
          fill
          className={`
            object-cover
            opacity-30
          `}
          priority
        />
      </div>

      {/* Content container */}
      <div
        className={`
        relative
        z-20
        max-w-7xl
        mx-auto
        px-4
        py-16
        grid
        md:grid-cols-2
        gap-12
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
            <h3
              className={`
              text-3xl
              mb-4
              text-white
              mt-0
              `}
            >
              {t("title")}
            </h3>
            <p
              className={`
              text-green-light
              p-4
            `}
            >
              {t("sub_title")}
            </p>
          </div>

          <div
            className={`
              flex
            flex-col
            lg:flex-row
            justify-between
            gap-4
            lg:gap-8
            `}
          >
            {/* Office section */}
            <div>
              <h3
                className={`
                text-2xl
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
                      className="gap-2"
                    />
                  </li>
                ))}
              </ul>
            </div>
            {/* Customer service agent */}
            <div>
              <h3
                className={`
                text-2xl
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
          </div>

          <div>
            <h3
              className={`
              text-2xl
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

        {/* Right column - Contact Form */}
        <div
          className={`
            lg:mt-12          
          `}
        >
          <form
            onSubmit={handleSubmit(onSubmit)}
            className={`
            space-y-6
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
    </div>
  )
}

export default Contact