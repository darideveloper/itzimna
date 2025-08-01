//libs
import { fontTitle } from "@/libs/fonts"

//ui elements
import Title from "@/components/ui/Title"
import Post from "@/components/ui/Post"
import { getTranslations } from "next-intl/server"
import { getPosts } from "@/libs/api/posts"
import { cookies } from "next/headers"

export default async function BlogPage() {
  //get locale from url
  const cookieStore = await cookies()
  const locale = cookieStore.get("NEXT_LOCALE")?.value || "es"

  const allPostsData = await getPosts(locale)

  // Translations
  const t = await getTranslations("Blog")
  const tMeta = await getTranslations("Meta")

  const breadcrumb = []

  for (const postData of allPostsData) {
    breadcrumb.push({
      "@type": "ListItem",
      position: breadcrumb.length + 1,
      name: postData.title,
      item: `${process.env.NEXT_PUBLIC_HOST}/${locale}/blog/${postData.id}-${postData.slug}`,
    })
  }

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "Blog |" + tMeta("title"),
    url: `${process.env.NEXT_PUBLIC_HOST}/${locale}/blog/`,
    description: tMeta("description.blog"),
    publisher: {
      "@type": "Organization",
      name: tMeta("title"),
    },

    breadcrumb: [...breadcrumb],
  }

  return (
    <section
      className={`
        container
        mx-auto
        py-40
      `}
    >
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div
        className={`
          title
          text-center
          my-8
        `}
      >
        <Title
          className={`
            ${fontTitle.className}
            !font-normal
            mb-2
          `}
          isH1={true}
        >
          {t("title")}
        </Title>
        <p
          className={`
            max-w-3xl
            mx-auto
            w-full
          `}
        >
          {t("subtitle")}
        </p>
      </div>

      <ul
        className={`
          grid
          gap-6 lg:gap-12 xl:gap-16
          grid-cols-1 sm:grid-cols-2 lg:grid-cols-3
          mt-8
          mb-16
        `}
      >
        {allPostsData.map(
          ({
            id,
            created_at,
            title,
            slug,
            description,
            author,
            banner_image_url,
          }) => (
            <Post
              key={id}
              slug={`${id}-${slug}`}
              date={created_at}
              title={title}
              coverImage={banner_image_url}
              description={description}
              author={author}
            />
          )
        )}
      </ul>
    </section>
  )
}

export async function generateMetadata({ params }) {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: "Meta" })

  const domain = process.env.NEXT_PUBLIC_HOST
  const canonicalPath = `/${locale}/blog`
  const canonicalUrl = `${domain}${canonicalPath}`

  const image = {
    url: `${domain}/images/home-banner.webp`,
    width: 800,
    height: 600,
    alt: t("title"),
  }

  return {
    title: "Blog | " + t("title"),
    description: t("description.blog"),

    // Canonical and alternate links
    alternates: {
      canonical: canonicalUrl,
      languages: {
        en: `${domain}/en/blog`,
        es: `${domain}/es/blog`,
        "x-default": canonicalUrl,
      },
    },

    openGraph: {
      title: t("title"),
      description: t("description.blog"),
      images: [image],
      url: canonicalUrl,
      siteName: t("title"),
      locale,
      type: "website",
    },

    twitter: {
      card: "summary_large_image",
      title: t("title"),
      description: t("description.blog"),
      images: [image],
      creator: "@DeveloperDari",
    },
  }
}
