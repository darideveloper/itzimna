// Libs
import { useTranslations } from "next-intl"

// Components
import TestCard from "@/components/ui/TestCard"


export default function TestCardsSection() {

  // Get translations
  const t = useTranslations('Test')

  // Section data
  const cardsNames = [
    "card1",
    "card2",
    "card3"
  ]

  return (
    <section>
      <hr />
      <p>Test cards section</p>
      <hr />
      {
        cardsNames.map((card, index) => (
          <TestCard
            key={index}
            text={t(`${card}.text`)}
            description={t(`${card}.description`)}
            imageSrc="/images/test.png"
          />
        ))
      }
    </section>
  )
}