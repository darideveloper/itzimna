// Libs
import { redirect } from "next/navigation"
import { getProperty } from "@/libs/api/properties"
import { cookies } from "next/headers"
import { getTranslations } from "next-intl/server"
import remarkGfm from "remark-gfm"
import { getBreadcrumb } from "@/libs/jsonLd"

// Components
import Image from "next/image"
import ReactMarkdown from "react-markdown"
import PropertyGeneral from "@/components/layouts/PropertyGeneral"
import PropertySeller from "@/components/layouts/PropertySeller"
import PropertyRelated from "@/components/layouts/PropertyRelated"
import InfoCard from "@/components/layouts/templates/InfoSection"
import PropertyMap from "@/components/layouts/PropertyMap"
import Button from "@/components/ui/Button"

// Style
import "@/css/markdown.sass"

// Utils components
import AOSInit from "@/components/utils/AOSInit"


export default async function PropertyDevelopment({ params }) {
  // Get cookies
  const cookieStore = await cookies()
  const accessToken = cookieStore.get("accessToken")?.value || ""
  const refreshToken = cookieStore.get("refreshToken")?.value || ""
  const lang = cookieStore.get("NEXT_LOCALE")?.value || "es"

  // Get property data
  const { idSlug } = await params
  const id = idSlug.split("-")[0]
  const propertyData = await getProperty(id, accessToken, refreshToken, lang)

  // Redirect to 404 if property not found
  if (!propertyData) {
    redirect(`../../404`)
  }

  // Translate from server side
  const tMeta = await getTranslations({ locale: lang, namespace: "Meta" })
  const t = await getTranslations({
    locale: lang,
    namespace: "PropertyDevelopment",
  })

  // Get tags from property data
  const tags = propertyData.tags.map((tag) => tag.name)

  // Generate keywords from property data
  let keywords = propertyData.name.split(" ")
  keywords = keywords.concat(propertyData.category.split(" "))
  keywords = keywords.concat(tags)

  // Convert data
  const priceFloat = parseFloat(propertyData.price.replace(/,/g, ""))

  // Metadata
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: propertyData.name,
    description: propertyData.short_description,
    image: {
      "@type": "ImageObject",
      url: propertyData.banner.url,
    },
    offers: {
      "@type": "Offer",
      priceCurrency: "MXN",
      price: priceFloat.toFixed(2),
      priceValidUntil: "2026-12-31",
      availability: "https://schema.org/InStock",
      url: `${process.env.NEXT_PUBLIC_HOST}/${lang}/desarrollos/${idSlug}`,
    },
    review: {
      "@type": "Review",
      reviewRating: {
        "@type": "Rating",
        ratingValue: "5",
      },
      "author": {
        "@type": "Person",
        "name": "Juan Perez",
      }
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      ratingValue: "5",
      reviewCount: "325"
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${process.env.NEXT_PUBLIC_HOST}/es/desarrollos/${idSlug}`,
    }
  }

  const jsonLdBreadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: getBreadcrumb(
      `${process.env.NEXT_PUBLIC_HOST}/es/desarrollos/${idSlug}`
    ),
  }

  const jsonLdPlace = {
    "@context": "https://schema.org",
    "@type": "Place",
    name: propertyData.name,
    address: {
      "@type": "PostalAddress",
      addressLocality: propertyData.location,
      addressCountry: "MX",
    },
  }

  return (
    <div
      className={`
        details-page
        w-full
        relative
        pb-64
        pt-12
      `}
    >
      {/* Render json ld */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdBreadcrumb) }}
      />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdPlace) }}
      />

      {/* Enable aos in page */}
      <AOSInit />

      {/* paralax bg */}
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

      {/* overlay */}
      <div
        className={`
          overlay-effect
          absolute
          inset-0
          bg-green
          -z-10
          opacity-80
        `}
      />

      <div
        className={`
          details-page
          container
          flex
          flex-col lg:flex-row
          justify-between
          items-start
          gap-8
          !py-8
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
          {/* General */}
          <InfoCard>
            <PropertyGeneral
              name={propertyData.name}
              price={priceFloat}
              category={propertyData.category}
              location={propertyData.location}
              company={propertyData.company}
              short_description={propertyData.short_description}
              images={propertyData.images}
              meters={propertyData.meters}
            />

            {/* Go selecr button */}
            <Button
              variant="ghost-green"
              href="#seller"
              className={`
                text-center
                lg:hidden
                mt-4
              `}
            >
              {t("contactSeller")}
            </Button>
          </InfoCard>

          {/* Details */}
          <InfoCard>
            <ReactMarkdown
              remarkPlugins={[remarkGfm]}
              children={propertyData.description}
              className={`
                markdown
                text-center md:text-left
              `}
            />
          </InfoCard>

          {propertyData.google_maps_src && (
            <InfoCard>
              <PropertyMap googleMapsSrc={propertyData.google_maps_src} />
            </InfoCard>
          )}
        </div>

        {/* Seller */}
        <InfoCard
          className={`
            mx-auto
            max-w-xl
            lg:sticky
            lg:top-12
          `}
        >
          <PropertySeller
            name={
              propertyData.seller.first_name +
              " " +
              propertyData.seller.last_name
            }
            profileImage="/images/logo.webp"
            has_whatsapp={propertyData.seller.has_whatsapp}
            phone={propertyData.seller.phone}
            email={propertyData.seller.email}
            whatsapp={propertyData.seller.whatsapp}
            propertyName={propertyData.name}
            propertyId={propertyData.id}
          />
        </InfoCard>
      </div>

      {/* Related Properties */}
      <div className={`container`}>
        <InfoCard>
          <PropertyRelated
            relatedProperties={propertyData.related_properties.sort(
              () => Math.random() - 0.5
            )}
          />
        </InfoCard>
      </div>
    </div>
  )
}

export async function generateMetadata({ params }) {
  const { locale, idSlug } = await params
  const t = await getTranslations({ locale: locale, namespace: "Meta" })

  // Get property data
  const id = idSlug.split("-")[0]
  let propertyData = await getProperty(id, "", "", locale)

  // get tags
  const tags = propertyData.tags.map((tag) => tag.name)

  // Generate keywords from property data
  let keywords = propertyData.name.split(" ")
  keywords = keywords.concat(propertyData.category.split(" "))
  keywords = keywords.concat(tags)

  // Default post data
  if (!propertyData) {
    propertyData = {
      name: "Desarrollo",
      short_description: "Desarrollo",
      category: "",
      location: "",
      seller: { first_name: "", last_name: "" },
      banner: { url: "" },
    }
  }

  // Property image
  const image = {
    url: propertyData.banner.url,
    width: 1200,
    height: 720,
    alt: propertyData.name,
  }

  const domain = process.env.NEXT_PUBLIC_HOST
  const canonicalPath = `/${locale}/desarrollos/${idSlug}`
  const canonicalUrl = `${domain}${canonicalPath}`

  return {
    title: propertyData.name,
    description: propertyData.short_description,
    lang: locale,
    keywords: keywords.join(", "),
    authors: [
      {
        name:
          propertyData.seller.first_name + " " + propertyData.seller.last_name,
      },
    ],

    // Canonical and alternate links
    alternates: {
      canonical: canonicalUrl,
      languages: {
        en: `${domain}/en/desarrollos/${idSlug}`,
        es: `${domain}/es/desarrollos/${idSlug}`,
        "x-default": canonicalUrl,
      },
    },

    // Open Graph metadata
    openGraph: {
      title: propertyData.name,
      description: propertyData.short_description,
      url: canonicalUrl,
      siteName: t("title"),
      images: [image],
      locale,
      type: "website",
    },

    // Twitter metadata
    twitter: {
      card: "summary_large_image",
      title: t("title"),
      description: propertyData.short_description,
      images: [image],
      creator: "@DeveloperDari",
    },
  }
}
