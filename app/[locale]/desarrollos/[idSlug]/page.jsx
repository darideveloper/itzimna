// Libs
import { redirect } from "next/navigation"
import { getProperty } from "@/libs/api/properties"
import { cookies } from "next/headers"
import { getTranslations } from 'next-intl/server'
import remarkGfm from 'remark-gfm'

// Components
import Image from 'next/image'
import ReactMarkdown from 'react-markdown'
import PropertyGeneral from '@/components/layouts/PropertyGeneral'
import PropertySeller from '@/components/layouts/PropertySeller'
import InfoCard from '@/components/layouts/templates/InfoSection'

// Style
import '@/css/markdown.sass'


export default async function PropertyDevelopment({ params }) {

  // return (
  //   <p>Hello world</p>
  // )
  
  // Get cookies
  const cookieStore = await cookies()
  const accessToken = cookieStore.get('accessToken')?.value || ''
  const refreshToken = cookieStore.get('refreshToken')?.value || ''
  const lang = cookieStore.get("NEXT_LOCALE")?.value || 'es'

  // Get property data
  const { idSlug } = await params
  const id = idSlug.split('-')[0]
  const propertyData = await getProperty(id, accessToken, refreshToken, lang)

  // Redirect to 404 if property not found
  if (!propertyData) {
    redirect(`../../404`)
  }

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    'headline': propertyData.name,
    'description': propertyData.short_description,
    'datePublished': propertyData.updated_at,
    'author': {
      '@type': 'Person',
      'name': `${propertyData.seller.first_name} ${propertyData.seller.last_name}`,
    },
    'keywords': propertyData.name.split(' ') + "," + propertyData.category + ',' + propertyData.location.split(' '),
    'publisher': {
      '@type': 'Organization',
      'name': 'Itzamna',
      'logo': {
        '@type': 'ImageObject',
        'url': `${process.env.NEXT_PUBLIC_HOST}/images/logo.webp`,
      },
    },
    'mainEntityOfPage': {
      '@type': 'WebPage',
      '@id': `${process.env.NEXT_PUBLIC_HOST}/es/desarrollos/${idSlug}`,
    },
    'image': {
      '@type': 'ImageObject',
      'url': propertyData.banner.url,
    },
  }

  return (
    <div
      className={`
        details-page
        w-full
        relative
      `}
    >

      {/* Render json ld */}
      <script 
        type="application/ld+json" 
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* paralax bg */}
      <Image 
        src="/images/hero.webp"
        width={1220}
        height={720}
        className={`
          w-full
          h-[100vh]
          fixed
          inset-0
          debug
          top-0
          left-0
          -z-20
        `}
        alt="bg image"
        
      />

      {/* overlay */}
      <div
        className={`
          overlay-effect
          absolute
          inset-0
          bg-green
          -z-10
          opacity-80
        `}
      />

      <div
        className={`
          details-page
          container
          flex
          flex-col lg:flex-row
          justify-between
          items-start
          gap-8
          !py-16
          !pb-64
        `}
      >

        <div
          className={`
            left
            w-full lg:w-8/12
            rounded-lg
            flex
            flex-col
            gap-6
          `}
        >

          <InfoCard>
            <PropertyGeneral
              name={propertyData.name}
              price={propertyData.price}
              category={propertyData.category}
              location={propertyData.location}
              company={propertyData.company}
              short_description={propertyData.short_description}
              images={propertyData.images}
              meters={propertyData.meters}
            />
          </InfoCard>

          <InfoCard>
            <ReactMarkdown
              remarkPlugins={[remarkGfm]}
              children={propertyData.description}
              className={`
                markdown
                text-center md:text-left
              `}
            />
          </InfoCard>
        </div>


        <InfoCard
          className={`
            mx-auto
            max-w-xl
            lg:sticky
            lg:top-12
          `}
        >
          <PropertySeller
            name={propertyData.seller.first_name + ' ' + propertyData.seller.last_name}
            profileImage="/images/logo.webp"
            has_whatsapp={propertyData.seller.has_whatsapp}
            phone={propertyData.seller.phone}
            email={propertyData.seller.email}
          />
        </InfoCard>

      </div>
    </div>

  )
}


export async function generateMetadata({ params }) {

  const { locale, idSlug } = await params
  const t = await getTranslations({ locale: locale, namespace: 'Meta' })

  
  // Get property data
  const id = idSlug.split('-')[0]
  const propertyData = await getProperty(id, "", "", locale)

  // Default post data
  if (!propertyData) {
    propertyData = {
      title: 'Dessarrollo',
      description: 'Dessarrollo',
      lang: locale,
      keywords: 'Dessarrollo',
      author: "Itzamna",
    }
  }

  const image = {
    url: propertyData.banner.url,
    width: 1200,
    height: 720,
    alt: propertyData.title,
  }

  return {
    title: propertyData.name + ' | ' + t('title'),
    description: propertyData.short_description,
    lang: locale,
    keywords: propertyData.name.split(' ') + "," + propertyData.category + ',' + propertyData.location.split(' '),
    authors: [
      { "name": propertyData.seller.first_name + ' ' + propertyData.seller.last_name },
    ],
    
    // Open Graph metadata
    openGraph: {
      title: propertyData.name + ' | ' + t('title'),
      description: propertyData.short_description,
      url: `${process.env.NEXT_PUBLIC_HOST}/${locale}/desarrollos/${idSlug}`,
      siteName: t('title'),
      images: [image],
      locale,
      type: "website",
    },

    // Twitter metadata
    twitter: {
      card: "summary_large_image",
      title: t('title') + ' | ' + propertyData.name,
      description: propertyData.short_description,
      images: [image],
      creator: "@DeveloperDari",
    },
  }
}