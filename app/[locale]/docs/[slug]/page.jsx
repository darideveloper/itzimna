// Libs
import { getTranslations } from "next-intl/server"
import { getDocData } from "@/libs/docs"
import { notFound } from "next/navigation"

// Components
import Title from "@/components/ui/Title"

// Css
import '@/css/globals.sass'
import '@/css/markdown.sass'

export default async function PrivacyNotice({ params }) {

  // get docs data 
  const { locale, slug } = await params;

  const docData = await getDocData(locale, slug)

  if (!docData) {
    notFound()
  }

  return (
    <section
      className={`
        container
        max-w-[1200px]
        mx-auto
      `}
    >
      <Title
        isH1={true}
        className={`
          mt-16
        `}
      >
        {docData.title}
      </Title>
      <div
        dangerouslySetInnerHTML={{ __html: docData.contentHtml }}
        className={`
          markdown
          post-content
        `}
      ></div>
    </section>
  )
}
