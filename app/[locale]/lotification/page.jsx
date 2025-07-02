// Libs
import { getTranslations } from "next-intl/server"
import { getBreadcrumb } from "@/libs/jsonLd"

// Sections
import Hero from "@/components/layouts/templates/Hero"

// Components
import TextMd from "@/components/ui/TextMd"
import InfoCardA from "@/components/ui/InfoCardA"
import InfoCardB from "@/components/ui/InfoCardB"
import InfoCardC from "@/components/ui/InfoCardC"
import InfoCardD from "@/components/ui/InfoCardD"
import InfoCardE from "@/components/ui/InfoCardE"

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

      {/* Info Cards Section - All Variants */}
      <section className="py-16 bg-grey">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-green-dark mb-4">
              Variantes de Diseño de Tarjetas
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Diferentes estilos de tarjetas informativas para mostrar servicios de lotificación
            </p>
          </div>
          
          {/* InfoCardA - Vertical Centered */}
          <div className="mb-16">
            <h3 className="text-2xl font-semibold text-green-dark mb-6 text-center">InfoCardA - Vertical Centered</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <InfoCardA
                iconName="search"
                title="Estudios Topográficos"
                text="Análisis detallado del terreno con tecnología de precisión para identificar características físicas."
              />
              <InfoCardA
                iconName="calculator"
                title="Cálculos de Viabilidad"
                text="Evaluación económica y técnica completa para determinar la rentabilidad del proyecto."
              />
              <InfoCardA
                iconName="clipboard"
                title="Gestión de Permisos"
                text="Asesoramiento integral en trámites municipales y regulaciones para la lotificación."
              />
            </div>
          </div>

          {/* InfoCardB - Horizontal Layout */}
          <div className="mb-16">
            <h3 className="text-2xl font-semibold text-green-dark mb-6 text-center">InfoCardB - Horizontal Layout</h3>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <InfoCardB
                iconName="building"
                title="Planificación Urbana"
                text="Diseño estratégico de lotes optimizando el uso del espacio y maximizando el valor de su inversión inmobiliaria."
              />
              <InfoCardB
                iconName="chart"
                title="Análisis de Mercado"
                text="Estudios de demanda y competencia para posicionar su desarrollo de manera competitiva en el mercado local."
              />
            </div>
          </div>

          {/* InfoCardC - Minimal Design */}
          <div className="mb-16">
            <h3 className="text-2xl font-semibold text-green-dark mb-6 text-center">InfoCardC - Minimal Design</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <InfoCardC
                iconName="shield"
                title="Seguridad Legal"
                text="Garantizamos que todos los trámites cumplan con las regulaciones vigentes."
              />
              <InfoCardC
                iconName="users"
                title="Asesoría Personalizada"
                text="Acompañamiento experto durante todo el proceso de desarrollo de su proyecto."
              />
              <InfoCardC
                iconName="lightbulb"
                title="Innovación en Diseño"
                text="Soluciones creativas para maximizar el potencial de su terreno."
              />
            </div>
          </div>

          {/* InfoCardD - Top Border Accent */}
          <div className="mb-16">
            <h3 className="text-2xl font-semibold text-green-dark mb-6 text-center">InfoCardD - Top Border Accent</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <InfoCardD
                iconName="star"
                title="Calidad Premium"
                text="Servicios de alta calidad con atención al detalle en cada etapa del proyecto."
              />
              <InfoCardD
                iconName="handshake"
                title="Asesoría Legal"
                text="Soporte legal especializado en transacciones inmobiliarias y cumplimiento normativo."
              />
              <InfoCardD
                iconName="home"
                title="Desarrollo Residencial"
                text="Especialistas en la creación de comunidades residenciales sostenibles y atractivas."
              />
            </div>
          </div>

          {/* InfoCardE - Compact Design */}
          <div className="mb-16">
            <h3 className="text-2xl font-semibold text-green-dark mb-6 text-center">InfoCardE - Compact Design</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <InfoCardE
                iconName="search"
                title="Investigación"
                text="Análisis exhaustivo del terreno y mercado local, incluyendo estudios de suelo, análisis topográfico detallado, evaluación de servicios públicos disponibles y investigación de la competencia en la zona para determinar el potencial de desarrollo."
              />
              <InfoCardE
                iconName="calculator"
                title="Viabilidad"
                text="Evaluación económica completa del proyecto, considerando costos de desarrollo, análisis de rentabilidad, proyecciones financieras a largo plazo y evaluación de riesgos para garantizar la viabilidad financiera de la inversión."
              />
              <InfoCardE
                iconName="clipboard"
                title="Permisos"
                text="Gestión integral de trámites municipales, obtención de licencias de construcción, permisos ambientales, autorizaciones de uso de suelo y cumplimiento de todas las regulaciones gubernamentales aplicables al desarrollo inmobiliario."
              />
              <InfoCardE
                iconName="building"
                title="Desarrollo"
                text="Planificación estratégica y ejecución completa del proyecto, desde el diseño conceptual hasta la construcción final, incluyendo la supervisión de obra, control de calidad y entrega del proyecto terminado al cliente."
              />
            </div>
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
