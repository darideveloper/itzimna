//libs
import { getPostData } from "@/libs/posts"
import Image from "next/image"
import { notFound } from "next/navigation"
import { getTranslations } from "next-intl/server"
// ui elements
import Title from "@/components/ui/Title"
import Subtitle from "@/components/ui/Subtitle"
// styles
import "@/css/post-content.sass"
import { getPost } from "@/libs/api/posts"
import { formatDate } from "@/libs/utils"

export default async function BlogPost({ params }) {
  const { slug } = await params
  const {locale} = await params
  const content  = await getPostData(slug, locale);
  
  if(!content) notFound()

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: content.title,
    datePublished: content.date,
    author: {
      "@type": "Person",
      name: content.author,
    },
    keywords: content.keywords,
    publisher: {
      "@type": "Organization",
      name: "NextJS Blog",
      logo: {
        "@type": "ImageObject",
        url: "/images/logo.webp",
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `/blog/${slug}`,
    },
    image: {
      "@type": "ImageObject",
      url: content.banner_image || "/images/test.svg",
      width: 1500,
      height: 1500,
    },
  }
  return (
    <section
      className={`
          max-w-6xl
          mx-auto
      `}
    >
      <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
      <div
        className={`
          h-[50vh]
          relative
          overflow-hidden
          bg-fixed
          bg-center
          bg-cover
        `}
        style={{
          backgroundImage: `url(${content.banner_image || "/images/test.svg"})`,
        }}
      >
      </div>
      <div className={`container py-40`}>

      <div>
        <Title isH1={false}>{content.title}</Title>
        <Subtitle className="text-center text-xl">
          {formatDate(content.date)} by {content.author}
        </Subtitle>

        <div
          className={`
            post-content
            mt-16
          `}
          dangerouslySetInnerHTML={{ __html: content.contentHtml }}
        />

      </div>
      </div>
    </section>
  )
}

export async  function generateMetadata({ params }) {
  const { locale, slug } = await params
  const t = await getTranslations({ locale, namespace: 'Meta' })
  // Get post data
  let postData = await getPostData(slug)
  // Default post data
  if (!postData) {
    postData = {
      title: 'Post',
      description: 'Post',
      lang: 'es',
      keywords: 'Post',
      author: t('title'),
    }
  }
  const image = {
    url: `${postData.banner_image}`, // this image should be from api
    width: 1200,
    height: 720,
    alt: postData.title,
  }
  return {
    title: postData.title,
    description: postData.description,
    locale: postData.lang,
    keywords: postData.keywords,
    authors: [
      { "name": postData.author }
    ],
    alternates: {
      canonical: `/${locale}/blog/${slug}`,
    },

    // Open Graph metadata
    openGraph: {
      title: postData.title,
      description: postData.description,
      url: `${process.env.NEXT_PUBLIC_SITE_URL}/${locale}/blog/${slug}`,
      siteName: t('title'),
      images: [image],
      locale,
      type: "article",
    },
    // Twitter metadata
    twitter: {
      card: "summary_large_image",
      title: postData.title,
      description: postData.description,
      images: [image],
      creator: "@DeveloperDari",
    },
  }
}
