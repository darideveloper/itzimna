"use client"

// Libs
import { useTranslations } from "next-intl"

// Components
import Title from "@/components/ui/Title"
import Button from "@/components/ui/Button"
import Select from "@/components/ui/Select"
import SearchBar from "@/components/ui/SearchBar"
import TransitionLink from "../utils/TransitionLink"

const HeroSection = ({ id = "hero", className = "" }) => {
  const t = useTranslations("Home.HeroSection")

  const handleSearch = (term) => {
    console.log("Search term:", term)
  }

  const handleSelectChange = (value) => {
    console.log("Selected value:", value)
  }

  const dataListOptions = [
    { value: "data1", label: "Data 1" },
    { value: "data2", label: "Data 2" },
    { value: "data3", label: "Data 3" },
  ]

  const sizesOptions = [
    { value: "small", label: "Small" },
    { value: "medium", label: "Medium" },
    { value: "large", label: "Large" },
  ]

  const pricesOptions = [
    { value: "low", label: "$0 - $50" },
    { value: "medium", label: "$50 - $100" },
    { value: "high", label: "$100+" },
  ]

  return (
    <div
      id={id}
      className={`
        hero
        relative
        h-screen
        w-full
        overflow-hidden
        bg-[url('/images/hero.webp')]
        bg-cover
        bg-center
        bg-fixed
        ${className}
      `}
    >
      <div
        className={`
          overlay-effect
          absolute
          inset-0
          bg-green/60
        `}
      />
      <div
        className={`
          container
          relative
          h-full
          flex
          flex-col
          items-center
          justify-center
          px-4
          sm:px-6
          lg:px-8
        `}
      >
        <div
          className={`
          text-center
          max-w-4xl
          mx-auto
        `}
        >
          <Title
            isH1={true}
            className={`
              text-white
              !mt-0
            `}
          >
            {t("title")}
          </Title>
          <p
            className={`
              text-xl
              sm:text-2xl
              text-gray-200
              max-w-2xl
              mx-auto
            `}
          >
            {t("description")}
          </p>
          {/* Search Bar */}
          <div
            className={`
              search-container
              mt-8
              w-xl
              mx-auto
              p-8
              rounded
              bg-green-dark/80
              backdrop-filter
              backdrop-blur
            `}
          >
            <div
              className={`
                relative
                flex
                items-center
                bg-green-dark
              `}
            >
              <SearchBar
                placeholder={t("searchPlaceholder")}
                onSearch={handleSearch}
              />
            </div>

            {/* Row for selects and submit button */}
            <div
              className={`
                mt-4
                grid
                grid-cols-1
                sm:grid-cols-4
                gap-4
              `}
            >
              <Select
                options={dataListOptions}
                placeholder="Data List"
                onChange={handleSelectChange}
              />
              <Select
                options={sizesOptions}
                placeholder="Sizes"
                onChange={handleSelectChange}
              />
              <Select
                options={pricesOptions}
                placeholder="Prices"
                onChange={handleSelectChange}
              />
              <Button
                type="submit"
                className={`
                  py-3
                  px-4
                  rounded-sm
                  bg-green
                  text-white
                  font-medium
                  focus:outline-none
                  focus:ring-2
                  focus:ring-green/50
                  transition-colors
                  flex
                  items-center
                  justify-center
                `}
              >
                <div
                  className={`
                    flex
                    items-center
                  `}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 mr-2"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    />
                  </svg>
                  Search
                </div>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default HeroSection
