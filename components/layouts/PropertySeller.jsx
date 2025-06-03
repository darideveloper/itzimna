"use client"

// Components
import Image from 'next/image'
import Link from 'next/link'
import Title from '@/components/ui/Title'
import Button from '@/components/ui/Button'
import ContactForm from "@/components/ui/ContactForm"


// Libs
import { useTranslations } from 'next-intl'

/**
 * Property seller layout
 * 
 * @param {Object} props - Property seller data
 * @param {String} props.name - Seller name
 * @param {String} props.profileImage - Seller profile image URL
 * @param {Boolean} props.has_whatsapp - Seller has whatsapp
 * @param {String} props.phone - Seller phone number
 * @param {String} props.email - Seller email
 * @param {String} props.whatsapp - Seller whatsapp link
 * @param {String} props.propertyName - Property name 
 * @param {String} props.propertyId - Property ID
 * 
 */
export default function PropertySeller({
  name,
  profileImage,
  has_whatsapp=false,
  phone,
  email,
  whatsapp="",
  propertyName,
  propertyId
}) {
  
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
      id="seller"
    >

      <div
        className={`
        header
        flex
        gap-6
        items-center
        justify-center
        flex-col sm:flex-row
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
            text-center sm:text-left
          `}
        >
          <Title
            className={`
              !my-0
              capitalize
              text-center sm:text-left
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

              let whatsappTemplate = t(
                'whatsappTemplate',
                {
                  name: data.fullName.toUpperCase(),
                  email: data.email,
                  phone: data.phone,
                  message: data.message,
                  property: propertyName,
                  key: propertyId
                }
              )

              // Generate full whstapp link
              const whatsappFullLink = whatsapp + "?text=" + encodeURI(whatsappTemplate)
              window.open(whatsappFullLink, '_blank')
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
              flex-col sm:flex-row
              gap-3
            `}
          >
            <Button
              className={`
                w-full sm:w-1/2
              `}
              onClick={handleClickSubmit}
              variant="ghost-green"
            >
              {t('send')}
            </Button>

            <Button
              className={`
                whatsapp
                text-center
                w-full sm:w-1/2
              `}
              onClick={() => window.open(`https://wa.me/${phone.replaceAll(' ', '')}`, "_blank")}
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
          block md:hidden
        `}
        href={`tel:${phone}`}
        variant="ghost-green"
      >
        {t('call')}
      </Button>
    </section>
  )
}