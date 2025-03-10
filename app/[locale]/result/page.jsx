// Libs
import { getPropertiesSummary } from "@/libs/api/properties"
import Image from "next/image"

// Components
import Select from "@/components/ui/Select"
import CardsSection from "@/components/layouts/CardsSection"
import SearchBar from "@/components/ui/SearchBar"
const PropertyListingPage = async () => {
  // Fetch data on the server
  const properties = await getPropertiesSummary(1, false)

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
    <>
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
      <div className="hidden md:block">
        <div className="container mx-auto p-4">
          <div className="flex">
            <div className="w-64 mr-4 sticky top-[40%] self-start">
              <div className="selects-wrapper bg-grey/40 p-4 rounded">
                <div className="mb-4">
                  <Select
                    options={dataListOptions}
                    placeholder="Data List"
                    className="w-full"
                  />
                </div>
                <div className="mb-4">
                  <Select
                    options={sizeOptions}
                    placeholder="Sizes"
                    className="w-full"
                  />
                </div>
                <div className="mb-4">
                  <Select
                    options={priceOptions}
                    placeholder="Prices"
                    className="w-full"
                  />
                </div>
              </div>
            </div>
            <div className="flex-grow">
              <SearchBar
                placeholder="Search Properties"
                className="mt-4 bg-green-dark rounded text-black"
              />
              <CardsSection
                title="Search Result"
                initialData={properties.propertiesData}
                initialTotalProperties={properties.pages}
                className="py-0"
              />
            </div>
          </div>
        </div>
      </div>
      <div className="block md:hidden">
        <div className="container mx-auto p-8">
          <div className="mb-4">
            <SearchBar
              className="bg-grey mb-4"
              placeholder="Search Properties"
            />
          </div>
          <div className="flex space-x-2 mb-4 bg-green-dark p-2 rounded">
            <Select
              options={dataListOptions}
              placeholder="Data List"
              className="flex-grow"
            />
            <Select
              options={sizeOptions}
              placeholder="Sizes"
              className="flex-grow"
            />
            <Select
              options={priceOptions}
              placeholder="Prices"
              className="flex-grow"
            />
          </div>
          <CardsSection
            title="Search Result"
            initialData={properties.propertiesData}
            initialTotalProperties={properties.pages}
            className="py-0"
          />
        </div>
      </div>
    </>
  )
}

export default PropertyListingPage
