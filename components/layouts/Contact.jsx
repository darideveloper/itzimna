"use client"

// Icons
import { FaMapMarkerAlt } from "react-icons/fa"

// Components
import Button from "@/components/ui/Button"

// Libs
import React from "react"
import Image from "next/image"
import { useForm } from "react-hook-form"

const Contact = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()

  const listOffice = ["Office 1", "Office 2", "Office 3", "Office 4"]
  const phone = "(+52) 9999 07 48 76"
  const onSubmit = (data) => {
    console.log("Form submitted:", data)
  }

  return (
    <div
      className={`
      relative
      min-h-[600px]
      bg-black
      text-white
    `}
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
          <div>
            <h2
              className={`
              text-4xl
              font-light
              mb-4
            `}
            >
              ¿Quieres que nos pongamos en contacto contigo?
            </h2>
            <p
              className={`
              text-gray-300
            `}
            >
              Rellena el formulario y uno de nuestros asesores se pondrá en
              contacto contigo.
            </p>
          </div>

          <div>
            <h3
              className={`
              text-2xl
              mb-4
            `}
            >
              Oficinas:
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
                  flex
                  items-center
                  gap-2
                `}
                >
                  <FaMapMarkerAlt size={16} />
                  <span>{office}</span>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3
              className={`
              text-2xl
              mb-4
            `}
            >
              Atención a clientes e inmobiliarias
            </h3>
            <a
              href={`tel:${phone}`}
              className={`
              text-xl
            `}
            >
              {phone}
            </a>
          </div>

          <div>
            <h3
              className={`
              text-2xl
              mb-2
            `}
            >
              Correo
            </h3>
            <a
              href="mailto:info@tecadesarrollos.com"
              className={`
                text-white
                hover:text-white
              `}
            >
              admin@itzimna.com
            </a>
          </div>
        </div>

        {/* Right column - Contact Form */}
        <div>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className={`
            space-y-6
          `}
          >
            <div>
              <input
                {...register("fullName", { required: "Nombre es requerido" })}
                type="text"
                placeholder="Nombre completo"
                className={`
                  w-full
                  p-3
                  rounded
                  bg-transparent
                  border
                  border-white/30
                  text-white
                  placeholder-gray-400
                `}
              />
              {errors.fullName && (
                <span
                  className={`
                  text-red-400
                  text-sm
                  mt-1
                `}
                >
                  {errors.fullName.message}
                </span>
              )}
            </div>

            <div>
              <input
                {...register("email", {
                  required: "Email es requerido",
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: "Email inválido",
                  },
                })}
                type="email"
                placeholder="Correo electrónico"
                className={`
                  w-full
                  p-3
                  rounded
                  bg-transparent
                  border
                  border-white/30
                  text-white
                  placeholder-gray-400
                `}
              />
              {errors.email && (
                <span
                  className={`
                  text-red-400
                  text-sm
                  mt-1
                `}
                >
                  {errors.email.message}
                </span>
              )}
            </div>

            <div>
              <input
                {...register("phone", {
                  required: "Teléfono es requerido",
                  pattern: {
                    value: /^[0-9]{10}$/,
                    message: "Teléfono debe tener 10 dígitos",
                  },
                })}
                type="tel"
                placeholder="Teléfono"
                className={`
                  w-full
                  p-3
                  rounded
                  bg-transparent
                  border
                  border-white/30
                  text-white
                  placeholder-gray-400
                `}
              />
              {errors.phone && (
                <span
                  className={`
                  text-red-400
                  text-sm
                  mt-1
                `}
                >
                  {errors.phone.message}
                </span>
              )}
            </div>

            <div>
              <textarea
                {...register("message", { required: "Mensaje es requerido" })}
                placeholder="Mensaje"
                rows={4}
                className={`
                  w-full
                  p-3
                  rounded
                  bg-transparent
                  border
                  border-white/30
                  text-white
                  placeholder-gray-400
                `}
              />
              {errors.message && (
                <span
                  className={`
                  text-red-400
                  text-sm
                  mt-1
                `}
                >
                  {errors.message.message}
                </span>
              )}
            </div>
            <Button>Enviar mensaje</Button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Contact
