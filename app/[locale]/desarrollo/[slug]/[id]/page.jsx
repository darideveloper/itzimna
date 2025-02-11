// Libs
import { redirect } from "next/navigation"
import { getPropertiesNames, getProperty } from "@/libs/api/property"


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
  const { slug, id } = await params

  // Simulated fetching of property data
  const propertyData = await getProperty(id)
  console.log({ propertyData })

  // Redirect to 404 if property not found
  if (!propertyData) {
    redirect(`../../404`)
  }

  return (
    <div>
      <p>Hello world</p>
      <p>{slug}</p>
      <p>{id}</p>
    </div>
  )
}