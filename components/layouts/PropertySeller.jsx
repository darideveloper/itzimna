"use client"

// Components
import Image from 'next/image'
import Link from 'next/link'
import Title from '@/components/ui/Title'
import Input from '@/components/ui/Input'
import Button from '@/components/ui/Button'


export default function PropertySeller({ name, profileImage, has_whatsapp, phone, email }) {
  return (
    <section
      className={`
        seller
      `}
    >

      <div
        className={`
        header
        flex
        gap-6
        items-center
      `}
      >
        <Image
          src={profileImage}
          alt={"Photo of seller" + name}
          width="100"
          height="100"
          className={`
            rounded-full
            object-cover
            w-16
            h-16
          `}
        />

        <div
          className={`
            texts
            text-left
          `}
        >
          <Title
            className={`
              !my-0
              !text-left
              capitalize
            `}
          >
            {name}
          </Title>
          <Link
            className={`
              phone
              block
            `}
            href={`tel:${phone}`}
          >
            {phone}
          </Link>
          <Link
            className={`
              email
              block
            `}
            href={`mailto:${email}`}
          >
            {email}
          </Link>
        </div>

      </div>

      {/* whsatsapp form */}
      {
        has_whatsapp
        &&
        <>
          <form
            action=""
            className={`
              my-4
            `}
          >
            <input
              name="name"
              required={true}
              placeholder="Nombre"
              type="text"
            />

            <input
              name="phone"
              required={true}
              placeholder="Phone"
              type="tel"
            />

            <input
              name="email"
              required={true}
              placeholder="Email"
              type="email"
            />

            <textarea
              name="message"
              required={true}
              placeholder="Message"
            />

            <div
              className={`
                buttons
                flex
                gap-3
              `}
            >
              <input
                name="email"
                value="Enviar mensaje"
                type="submit"
                className={`
                  w-1/2
                `}
              />

              <Button
                className={`
                  whatsapp
                  text-xl
                  text-center
                  w-1/2
                `}
                href={`https://wa.me/${phone}`}
              >
                WhatsApp
              </Button>
            </div>
          </form>

        </>
      }

      {/* Always render call button */}
      <Button
        className={`
          call
          text-xl
          text-center
          mt-2
        `}
        href={`tel:${phone}`}
        variant="ghost-green"
      >
        Call
      </Button>
    </section>
  )
}