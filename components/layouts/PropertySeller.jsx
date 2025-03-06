"use client"

// Components
import Image from 'next/image'
import Link from 'next/link'
import Title from '@/components/ui/Title'
import Button from '@/components/ui/Button'
import ContactForm from "@/components/ui/ContactForm"


// Libs
import { useTranslations } from 'next-intl'


export default function PropertySeller({ name, profileImage, has_whatsapp, phone, email }) {
  
  // Translate
  const t = useTranslations("PropertySeller")

  // Handlers

  /**
   * Submit form using native submit method
   */
  function handleClickSubmit() {
    const form = document.querySelector('.form-seller')
    form.dispatchEvent(new Event("submit", { cancelable: true, bubbles: true }))
  }
  
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
          alt={t('phofileImageAlt') + " " + name}
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
          <ContactForm 
            onSubmit={data => {
              console.log({data})
            }}
            showSubmitBtn={false}
            className={`
              form-seller
              my-4
            `}
            variant="dark"
          />

          <div
            className={`
              buttons
              flex
              gap-3
            `}
          >
            <Button
              className={`
                w-1/2
              `}
              onClick={handleClickSubmit}
              variant="ghost-green"
            >
              {t('send')}
            </Button>

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
        {t('call')}
      </Button>
    </section>
  )
}