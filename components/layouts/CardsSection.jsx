// Libs
import { useTranslations } from "next-intl";

// Components

import PropertyCard from "@/components/ui/PropertyCard";
import TransitionLink from "@/components/utils/TransitionLink";
import Pagination from "../ui/Pagination";
import Title from "../ui/Title";

/**
 * Cards section component
 *
 * @param {Array} propertiesData - Properties data
 * @param {Object} propertiesData[].banner - Property banner image
 * @param {String} propertiesData[].banner.url - Property banner image URL
 * @param {String} propertiesData[].banner.alt - Property banner image alt text
 * @param {String} propertiesData[].company - Property company builder
 * @param {String} propertiesData[].category - Property category
 * @param {String} propertiesData[].created_at - Property creation date
 * @param {String} propertiesData[].description - Property description
 * @param {Integer} propertiesData[].id - Property ID
 * @param {String} propertiesData[].location - Property location
 * @param {String} propertiesData[].meters - Property size in square meters like "99.00"
 * @param {String} propertiesData[].name - Property name
 * @param {String} propertiesData[].price - Property price like "1,000.00"
 * @param {String} propertiesData[].seller - Property seller name
 * @param {String} propertiesData[].short_description - Property short description
 * @returns {JSX.Element} Cards section component
 */
export default function CardsSection({ propertiesData }) {
  // Get translations
  const t = useTranslations("Home.CardsSection");
  return (
    <section
      className={`
          px-4
          md:px-8
          lg:px-16
      `}
    >
      <p
        className={`
          text-center
          text-2xl
          font-bold
          mb-6
          text-green-light
        `}
      >
        <Title className={`
            text-3xl
            sm:text-4xl
            font-bold
            mt-12
            text-blue 
          `}
          isH1={false}
          >
              {t("title")}
        </Title>
      </p>
      
      <br />

      <div
        className={`
          container
          grid
          grid-cols-1
          sm:grid-cols-2
          lg:grid-cols-3
          xl:grid-cols-4
          gap-6
        `}
      >
        {propertiesData.map((card, index) => (
          <PropertyCard
            key={index}
            name={card.name}
            description={card.description}
            imageSrc={card.banner.url}
            company={card.company}
            location={card.location}
            price={card.price}
            meters={card.meters}
            created_at={card.created_at}
            category={card.category}
            href={`/properties/${card.id}`}
            className={""}
          />
        ))}
      </div>
      <Pagination />
    </section>
  );
}
