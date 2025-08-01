//libs
import Image from "next/image"
import { getTranslations } from "next-intl/server"
import { cookies } from "next/headers"
import { redirect } from "next/navigation"
import remarkGfm from "remark-gfm"

// ui elements
import Title from "@/components/ui/Title"
import Subtitle from "@/components/ui/Subtitle"
import ReactMarkdown from "react-markdown"
import ShareButtons from "@/components/ui/ShareButtons"

// styles
import "@/css/markdown.sass"

// Data
import { formatDate } from "@/libs/utils"
import { getPost } from "@/libs/api/posts"
import BlogLangModifier from "@/components/utils/BlogLangModifier"

// Share buttons
export default async function BlogPost({ params }) {
  // Get cookies
  const cookieStore = await cookies()
  const lang = cookieStore.get("NEXT_LOCALE")?.value || "es"

  // Get post data
  const { idSlug } = await params
  const id = idSlug.split("-")[0]
  const postData = await getPost(id, lang)

  // get related post if exists
  const related_post = postData?.related_post || null
  let new_link = ""
  if (related_post) {
    new_link = `${process.env.NEXT_PUBLIC_HOST}/${
      "es" === lang ? "en" : "es"
    }/blog/${related_post.id}-${related_post.slug}`
  }

  // Redirect to /blog if post not found
  if (!postData) {
    redirect(`/${lang}/blog`)
  }

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: postData.title,
    datePublished: postData.created_at,
    author: {
      "@type": "Person",
      name: postData.author,
    },
    keywords: postData.keywords.split(","),
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
      "@id": `/blog/${idSlug}`,
    },
    image: {
      "@type": "ImageObject",
      url: postData.banner_image_url || "/images/test.svg",
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

      {/* Bg parallax for dexktop */}
      <div
        className={`
          h-[50vh]
          relative
          overflow-hidden
          bg-fixed
          bg-center
          bg-cover
          hidden md:block
        `}
        style={{
          backgroundImage: `url(${
            postData.banner_image_url || "/images/test.svg"
          })`,
        }}
      />

      {/* regular image for mobile */}
      <div className="md:hidden">
        <Image
          src={postData.banner_image_url || "/images/test.svg"}
          width={1500}
          height={1500}
          alt={postData.title}
          className="w-full h-auto"
        />
      </div>

      <div className={`container py-40`}>
        <div>
          <Title isH1={true}>{postData.title}</Title>

          <Subtitle className="text-center text-xl">
            {formatDate(postData.created_at)} by {postData.author}
          </Subtitle>

          <ShareButtons />

          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            children={postData.content}
            className={`
            markdown
            text-center md:text-left
            my-12
          `}
          />
        </div>
      </div>
      <BlogLangModifier related_post={new_link} current_lang={lang} />
    </section>
  )
}

export async function generateMetadata({ params }) {
  const { locale, idSlug } = await params
  const t = await getTranslations({ locale, namespace: "Meta" })

  // Get post data
  const id = idSlug.split("-")[0]
  let postData = await getPost(id, "", "", locale)

  // Default post data
  if (!postData) {
    postData = {
      title: "Post",
      description: "Post",
      lang: locale,
      keywords: "Post",
      author: t("title"),
      banner_image_url: "/images/home-banner.webp",
    }
  }

  const domain = process.env.NEXT_PUBLIC_HOST
  const canonicalPath = `/${locale}/blog/${idSlug}`
  const canonicalUrl = `${domain}${canonicalPath}`
  const image = {
    url: postData.banner_image_url || `${domain}/images/home-banner.webp`,
    width: 1200,
    height: 720,
    alt: postData.title,
  }

  return {
    title: {
      absolute: postData.title,
    },
    description: postData.description,
    locale: postData.lang,
    keywords: postData.keywords,
    authors: [{ name: postData.author }],
    alternates: {
      canonical: canonicalUrl,
      languages: {
        [`${locale}`]: `${domain}/${locale}/blog/${idSlug}`,
        "x-default": canonicalUrl,
      },
    },

    // Open Graph metadata
    openGraph: {
      title: postData.title,
      description: postData.description,
      url: canonicalUrl,
      siteName: t("title"),
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
