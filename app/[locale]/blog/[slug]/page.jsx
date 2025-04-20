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

export default async function BlogPost({ params }) {
  const { slug } = await params
  const post = await getPostData(slug)

  if (!post) {
    notFound()
  }

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    datePublished: post.date,
    author: {
      "@type": "Person",
      name: post.author,
    },
    keywords: post.keywords,
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
      "@id": `/blog/${post.slug}`,
    },
    image: {
      "@type": "ImageObject",
      url: post.coverImage || "/images/test.svg",
    },
  }

  return (
    <section
      className={`
        container
      `}
    >
      <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
      <div
        className={`
        `}
      >
        <Image
          src={post.coverImage || "/images/test.svg"}
          width={1500}
          height={1500}
          alt={post.title}
          className={`
            w-full  
          `}
        />
      </div>
      <div>
        <Title isH1={false}>{post.title}</Title>
        <Subtitle className="text-center text-xl">
          {post.date} by {post.author}
        </Subtitle>
      </div>

      <div
        className={`post-content`}
        dangerouslySetInnerHTML={{ __html: post.contentHtml }}
      ></div>
    </section>
  )
}

export async function generateMetadata({ params }) {

  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'Meta' })

  // Get post data
  const { slug } = await params
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
    url: `${process.env.NEXT_PUBLIC_SITE_URL}/images/posts/banners/${slug}.webp`,
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
      canonical: `/es/blog/${slug}`,
    },
    
    // Open Graph metadata
    openGraph: {
      title: postData.title,
      description: postData.description,
      url: `${process.env.NEXT_PUBLIC_SITE_URL}/${locale}/blog/${slug}`,
      siteName: t('title'),
      images: [image],
      locale,
      type: "website",
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
