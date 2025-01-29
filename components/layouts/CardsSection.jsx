// Libs
import { useTranslations } from "next-intl";

// Components

import PropertyCard from "@/components/ui/PropertyCard";
import PropertyCard2 from "@/components/ui/PropertyCard2";

export default function CardsSection() {
  // Get translations
  const t = useTranslations("Test");

  // Section data

  const propertyCards = [
    {
      id: 1,
      name: "Modern Apartment",
      description:
        "A luxurious 3-bedroom apartment with a spacious balcony overlooking the city skyline.",
      imageSrc: "/images/test.svg",
      company: "Urban Living Co.",
      location: "New York, NY",
      price: 450000,
      seller: "John Doe Realty",
      meters: 120,
      category: "Apartment",
      created_at: "2025-01-20T14:30:00",
      updated_at: "2025-01-25T10:00:00",
      className: "modern-apartment",
    },
    {
      id: 2,
      name: "Cozy Cottage",
      description:
        "A charming 2-bedroom cottage in the countryside, perfect for a quiet getaway.",
      imageSrc: "/images/test.svg",
      company: "Rural Retreats Ltd.",
      location: "Asheville, NC",
      price: 320000,
      seller: "Mountain Realty",
      meters: 85,
      category: "Cottage",
      created_at: "2024-12-15T09:00:00",
      updated_at: "2025-01-12T18:00:00",
      className: "cozy-cottage",
    },
    {
      id: 3,
      name: "Beachfront Villa",
      description:
        "A stunning beachfront villa with private access to the ocean, featuring 5 bedrooms and a pool.",
      imageSrc: "/images/test.svg",
      company: "Oceanic Properties",
      location: "Malibu, CA",
      price: 1200000,
      seller: "Luxury Realty",
      meters: 350,
      category: "Villa",
      created_at: "2025-01-05T11:45:00",
      updated_at: "2025-01-22T14:20:00",
      className: "beachfront-villa",
    },
    {
      id: 4,
      name: "City Center Studio",
      description:
        "A compact studio apartment located in the heart of the city, ideal for professionals.",
      imageSrc: "/images/test.svg",
      company: "Metro Realty",
      location: "Chicago, IL",
      price: 250000,
      seller: "City Realty Group",
      meters: 45,
      category: "Studio",
      created_at: "2025-01-10T16:10:00",
      updated_at: "2025-01-18T12:30:00",
      className: "city-center-studio",
    },
  ];

  return (
    <section className="px-4 md:px-8 lg:px-16">
      <hr className="my-4 border-green-light" />
      <p
        className="text-center text-lg mb-6 text-green-light"
      >
        Test cards section
      </p>
      <hr className="my-4 border-green-light" />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {propertyCards.map((card, index) => (
          <PropertyCard
            key={index}
            id={card.id}
            name={card.name}
            description={card.description}
            imageSrc={card.imageSrc}
            company={card.company}
            location={card.location}
            price={card.price}
            seller={card.seller}
            meters={card.meters}
            created_at={card.created_at}
            category={card.category}
            updated_at={card.updated_at}
            className={""}
          />
        ))}
      </div>
      <br/>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {propertyCards.map((card, index) => (
            <PropertyCard2
              key={index}
              id={card.id}
              name={card.name}
              description={card.description}
              imageSrc={card.imageSrc}
              company={card.company}
              location={card.location}
              price={card.price}
              seller={card.seller}
              meters={card.meters}
              created_at={card.created_at}
              category={card.category}
              updated_at={card.updated_at}
              className={""}
            />
          ))}
        </div>

    </section>
  );
}
