// Libs
import { getProperties } from "@/libs/api/properties"

// Components
import Image from "next/image"
import PropertyCard from "@/components/ui/PropertyCard"
import Title from "@/components/ui/Title"

// Sections
import Filters from "@/components/layouts/Filters"


const PropertySearch = async () => {
  // Fetch data on the server
  const properties = await getProperties()
  const propertyCards = properties.propertiesData || []

  return (
    <div>
      <Image
        src="/images/hero.webp"
        width={1220}
        height={720}
        className={`
          w-full
          h-[100vh]
          fixed
          inset-0
          top-0
          left-0
          -z-20
        `}
        alt="bg image"
      />
      <div
        className={`
          overlay-effect
          inset-0
          fixed
          h-[100vh]
          bg-green
          -z-10
          opacity-80
        `}
      />
      <div className="container mx-auto !pt-6 !pb-16">

        {/* full layout container */}
        <div
          className={`
            flex
            flex-col
          `}
        >

          <Filters />

          {/* Content area */}
          <div className="flex-grow">
            <Title
              isH1={true}
              className={`
                !text-5xl
                !text-white
              `}
            >
              Search Results
            </Title>

            <div
              className={`
                grid
                grid-cols-1
                sm:grid-cols-2
                lg:grid-cols-3
                gap-6
              `}
            >
              {propertyCards.map((property, index) => (
                <PropertyCard
                  key={index}
                  name={property.name}
                  shortDescription={property.shortDescription}
                  imageSrc={property.imageSrc}
                  company={property.company}
                  location={property.location}
                  price={property.price}
                  meters={property.meters}
                  category={property.category}
                  href={`/properties/${property.id}`}
                  className=""
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PropertySearch
