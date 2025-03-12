// Libs
import { getPropertiesSummary } from "@/libs/api/properties"
import Image from "next/image"
// Components
import Select from "@/components/ui/Select"
import SearchBar from "@/components/ui/SearchBar"
import PropertyCard from "@/components/ui/PropertyCard"

const PropertySearch = async () => {
  // Fetch data on the server
  const properties = await getPropertiesSummary(1, false)
  const propertyCards = properties.propertiesData || []

  const dataListOptions = [
    { value: "location", label: "Location" },
    { value: "price", label: "Price Range" },
    { value: "size", label: "Size Range" },
  ]

  const sizeOptions = [
    { value: "small", label: "Under 70m²" },
    { value: "medium", label: "70-100m²" },
    { value: "large", label: "Over 100m²" },
  ]

  const priceOptions = [
    { value: "low", label: "Under $120,000" },
    { value: "medium", label: "$120,000-$500,000" },
    { value: "high", label: "Over $500,000" },
  ]

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
      <div className="container mx-auto p-4">
        {/* mobile-only searchbar hidden on dekstop */}
        <div
          className={`
            block
            md:hidden
            w-full
            mb-4
          `}
        >
          <SearchBar
            placeholder="Search Properties"
            className={`
              mt-4
              bg-green-dark
              rounded
              text-black
            `}
          />
        </div>

        {/* full layout container */}
        <div
          className={`
            flex
            flex-col
            md:flex-row
          `}
        >
          {/* filters  scecond on mobile, sidebar on desktop */}
          <div
            className={`
              w-full
              md:w-64
              md:mr-4
              md:sticky
              md:top-[40%]
              md:self-start
              mb-4
              md:mb-0
            `}
          >
            <div
              className={`
                selects-wrapper
                bg-green-dark
                md:bg-grey/40
                p-2
                md:p-4
                rounded
                flex
                flex-col
                space-y-2
                md:space-y-4
              `}
            >
              <Select
                options={dataListOptions}
                placeholder="Data List"
                className="w-full"
              />
              <Select
                options={sizeOptions}
                placeholder="Sizes"
                className="w-full"
              />
              <Select
                options={priceOptions}
                placeholder="Prices"
                className="w-full"
              />
            </div>
          </div>

          {/* Content area for desktop */}
          <div className="flex-grow">
            {/* desktop only searchbar it will be hidden on mobile) */}
            <div className="hidden md:block">
              <SearchBar
                placeholder="Search Properties"
                className={`
                  mt-4
                  bg-green-dark
                  rounded
                  text-black
                  mb-4
                `}
              />
            </div>

            <h2
              className={`
                text-2xl
                font-bold
                text-white
                text-center
                mb-4
              `}
            >
              Search Results
            </h2>

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
