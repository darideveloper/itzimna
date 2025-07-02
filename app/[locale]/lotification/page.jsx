// Libs
import { getTranslations } from "next-intl/server"
import { getBreadcrumb } from "@/libs/jsonLd"

// Sections
import Hero from "@/components/layouts/templates/Hero"

// Components
import TextMd from "@/components/ui/TextMd"
import InfoCardA from "@/components/ui/InfoCardA"

// Utils components
import AOSInit from "@/components/utils/AOSInit"

// Libs
import { clsx } from "clsx"


const LotificationPage = async (props) => {
  // Translations
  const t = await getTranslations("Buscar")
  const tMeta = await getTranslations("Meta")

  const { locale } = await props.params

  // Metadata
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    headline: t("title") + " | " + tMeta("title"),
    description: t("description"),
    datePublished: new Date().toISOString(),
    author: {
      "@type": "Person",
      name: tMeta("author"),
    },
    keywords: tMeta("keywords").split(","),
    publisher: {
      "@type": "Organization",
      name: "Itzamna Real Estate",
      logo: {
        "@type": "ImageObject",
        url: `${process.env.NEXT_PUBLIC_HOST}/images/logo.webp`,
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${process.env.NEXT_PUBLIC_HOST}/${locale}/buscar`,
    },
    image: {
      "@type": "ImageObject",
      url: "/images/home-banner.jpg",
    },
    breadcrumb: {
      "@type": "BreadcrumbList",
      itemListElement: getBreadcrumb(
        `${process.env.NEXT_PUBLIC_HOST}/${locale}/buscar`
      ),
    },
  }

  return (
    <>
      {/* Render json ld */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Enable aos in page */}
      <AOSInit />

      <Hero
        className={`
          !pb-16
          !pt-16
        `}
        title={
          "Itzimná Real Estate: Trazando el Futuro de su Inversión con Estudios Topográficos de Precisión"
        }
        bgImage={"/images/hero-buscar.webp"}
      />

      <TextMd
        text={`**Mérida, Yucatán**- Para los desarrolladores e inversionistas que buscan transformar un terreno en un proyecto exitoso, la precisión es la piedra angular. En Itzimná Real Estate, comprendemos que la base de un desarrollo inmobiliario sólido comienza con un conocimiento exhaustivo del lienzo sobre el cual se construirá. Por ello, ofrecemos un servicio integral de estudios topográﬁcos diseñados especíﬁcamente para la lotiﬁcación de terrenos, garantizando certeza, optimización y viabilidad para su proyecto en el sureste mexicano. Un estudio topográﬁco preciso es más que un simple mapa; es el primer paso crucial para materializar su visión. Este análisis detallado del terreno proporciona información esencial sobre sus características físicas, incluyendo:`}
        className={"!max-w-7xl"}
      />

      {/* Info Cards Section */}
      <section className="py-16 bg-grey">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-green-dark mb-4">
              Servicios de Loteación
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Ofrecemos servicios integrales para transformar terrenos en proyectos inmobiliarios exitosos
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <InfoCardA
              iconName="search"
              title="Estudios Topográficos"
              text="Análisis detallado del terreno con tecnología de precisión para identificar características físicas, pendientes y limitaciones del suelo."
            />
            
            <InfoCardA
              iconName="calculator"
              title="Cálculos de Viabilidad"
              text="Evaluación económica y técnica completa para determinar la rentabilidad y factibilidad de su proyecto inmobiliario."
            />
            
            <InfoCardA
              iconName="clipboard"
              title="Gestión de Permisos"
              text="Asesoramiento integral en trámites municipales y regulaciones para la lotificación y desarrollo de su terreno."
            />
            
            <InfoCardA
              iconName="building"
              title="Planificación Urbana"
              text="Diseño estratégico de lotes optimizando el uso del espacio y maximizando el valor de su inversión inmobiliaria."
            />
            
            <InfoCardA
              iconName="chart"
              title="Análisis de Mercado"
              text="Estudios de demanda y competencia para posicionar su desarrollo de manera competitiva en el mercado local."
            />
            
            <InfoCardA
              iconName="handshake"
              title="Asesoría Legal"
              text="Soporte legal especializado en transacciones inmobiliarias y cumplimiento normativo para su proyecto de lotificación."
            />
          </div>
        </div>
      </section>
    </>
  )
}

export default LotificationPage

export async function generateMetadata({ params }) {
  const { locale } = await params
  const t = await getTranslations("Buscar")
  const tMeta = await getTranslations("Meta")

  // Metadata
  const domain = process.env.NEXT_PUBLIC_HOST
  const canonicalPath = `/${locale}/buscar`
  const canonicalUrl = `${domain}${canonicalPath}`
  const image = {
    url: `${domain}/images/home-banner.jpg`,
    width: 1200,
    height: 720,
    alt: t("title"),
  }

  return {
    title: `${t("title")} | ${tMeta("title")}`,
    description: t("description"),
    lang: locale,
    keywords: tMeta("keywords"),

    // Canonical and alternate links
    alternates: {
      canonical: canonicalUrl,
      languages: {
        es: `${domain}/es/buscar`,
        en: `${domain}/en/buscar`,
        "x-default": `${domain}/es/buscar`,
      },
    },

    // Open Graph meta tags
    openGraph: {
      title: `${t("title")} | ${tMeta("title")}`,
      description: t("description"),
      url: canonicalUrl,
      siteName: tMeta("title"),
      images: [image],
      locale: locale,
      type: "website",
    },

    // Twitter meta tags
    twitter: {
      card: "summary_large_image",
      title: `${t("title")} | ${tMeta("title")}`,
      description: t("description"),
      images: [image.url],
    },
  }
}
