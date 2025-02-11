// Libs
import { redirect } from "next/navigation"
// import { fetchPropertiesNames } from "@/libs/api/properties"


export async function generateStaticParams() {

  const propertiesNames = await fetchPropertiesNames()

  console.log({ propertiesNames })

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

  console.log({ slug, id })

  // Simulated fetching of property data
  const propertyData = await fetchPropertyData(slug, id)

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