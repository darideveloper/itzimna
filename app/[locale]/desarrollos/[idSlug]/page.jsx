// Libs
import { redirect } from "next/navigation"
import { getPropertiesNames, getProperty } from "@/libs/api/property"
import { cookies } from "next/headers"
import remarkGfm from 'remark-gfm'


// Components
import ReactMarkdown from 'react-markdown'
import PropertyGeneral from '@/components/layouts/PropertyGeneral'
import PropertySeller from '@/components/layouts/PropertySeller'

// Style
import '@/css/markdown.sass'


export default async function PropertyDevelopment({ params }) {

  const { idSlug } = await params
  const id = idSlug.split('-')[0]
  const slug = idSlug.split('-').slice(1).join('-')
  console.log({ id, slug })

  // Get cookies
  const cookieStore = await cookies()
  const accessToken = cookieStore.get('accessToken')?.value || ''
  const refreshToken = cookieStore.get('refreshToken')?.value || ''
  const lang = cookieStore.get("NEXT_LOCALE")?.value || 'es'

  // Simulated fetching of property data
  const propertyData = await getProperty(id, accessToken, refreshToken, lang)
  console.log({ propertyData })

  // Redirect to 404 if property not found
  if (!propertyData) {
    redirect(`../../404`)
  }

  return (
    <div
      className={`
        details-page
        container
        flex
        flex-col-reverse lg:flex-row
        justify-between
        items-start
        gap-8
        !my-8
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

        <section
          className={`
            general
            bg-grey
            w-full
            rounded-lg
            p-12
          `}
        >
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
        </section>

        <section
          className={`
            details
            bg-grey
            rounded-lg
            p-12
          `}
        >
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            children={propertyData.description}
            className="markdown"
          />

        </section>

      </div>


      <div
        className={`
          right
          bg-grey
          w-full lg:w-4/12
          rounded-lg
          p-12
        `}
      >
        <PropertySeller 
          name={propertyData.seller.first_name + ' ' + propertyData.seller.last_name}
          profileImage="/images/logo.webp"
          has_whatsapp={propertyData.seller.has_whatsapp}
          phone={propertyData.seller.phone}
          email={propertyData.seller.email}
        />

        
      </div>
    </div>
  )
}