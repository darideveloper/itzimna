// Libs
import { redirect } from "next/navigation"
import { getPropertiesNames, getProperty } from "@/libs/api/property"
import { cookies } from "next/headers"
import remarkGfm from 'remark-gfm'


// Components
import Slider from '@/components/layouts/templates/Slider'
import Title from '@/components/ui/Title'
import ReactMarkdown from 'react-markdown'

// Style
import '@/css/markdown.sass'


export async function generateStaticParams() {

  const propertiesNames = await getPropertiesNames()

  return propertiesNames.map((property) => {
    return {
      params: {
        slug: property.slug,
        id: property.id.toString(),
      },
    }
  })
}

export default async function PropertyDevelopment({ params }) {

  const { id } = await params

  // Get cookies
  const cookieStore = await cookies()
  const accessToken = cookieStore.get('accessToken')?.value || ''
  const refreshToken = cookieStore.get('refreshToken')?.value || ''
  const lang = cookieStore.get("NEXT_LOCALE")?.value || 'es'

  // Simulated fetching of property data
  const propertyData = await getProperty(id, accessToken, refreshToken, lang)

  // Redirect to 404 if property not found
  if (!propertyData) {
    redirect(`../../404`)
  }

  return (
    <section
      className={`
        details-page
        container
        flex
        flex-col-reverse lg:flex-row
        justify-between
        items-start
        gap-8
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

        <div
          className={`
            general
            bg-grey
            w-full
            rounded-lg
            p-8
          `}
        >

          <div
            className={`
              header
            `}
          >
            <Title
              className={`
                capitalize
              `}
            >
              {propertyData.name}
            </Title>

            <p>
              $ {propertyData.price} MXN
            </p>
          </div>


          {/* TODO: Render category here, as tag badg */}
          <p>
            {propertyData.category}
          </p>

          {/* Render location here with icon */}
          <p>
            {propertyData.location}
          </p>

          <p>
            {propertyData.short_description}
          </p>

          <Slider
            id="property-gallery"
            imagesData={propertyData.images}
            maxSlides={1}
          />
        </div>

        <div
          className={`
            details
            bg-grey
            rounded-lg
            p-8
          `}
        >
          <p>
            {/* TODO: this texts comes from the lang */}
            Descripción
          </p>
          <hr />
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            children={propertyData.description}
            className="markdown"
          />






        </div>

      </div>


      <div
        className={`
          right
          bg-grey
          w-full lg:w-4/12
          rounded-lg
          p-8
        `}
      >

      </div>
    </section>
  )
}