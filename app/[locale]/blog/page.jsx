//libs
import { fontTitle } from "@/libs/fonts"
import { getSortedPostData } from "@/libs/posts"

//ui elements
import Title from "@/components/ui/Title"
import Post from "@/components/ui/Post"
import { getTranslations } from "next-intl/server"


export default async function BlogPage() {

  const allPostsData = getSortedPostData()

  // Translations
  const t = await getTranslations('Blog')
  const tMeta = await getTranslations('Meta')

  const breadcrumb = []

  for (const postData of allPostsData) {
    breadcrumb.push({
      '@type': 'ListItem',
      "position": breadcrumb.length + 1,
      "name": postData.title,
      "item": `${process.env.NEXT_PUBLIC_SITE_URL}/blog/${postData.slug}`,
    })
  }

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name" : tMeta('title'),
    "url": `${process.env.NEXT_PUBLIC_SITE_URL}/blog/`,
    "description": tMeta('description.blog'),

  }


  return (
  <section
      className={`
        container
        mx-auto
        py-40
      `}
    >
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
            font-bold
            mb-2
          `}
          isH1={true}
        >
          {t('title')}
        </Title>
        <p
          className={`
            max-w-3xl
            mx-auto
            w-full
          `}
        >
          {t('subtitle')}
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
        {allPostsData.map(({ slug, date, title, description, author }) => (
          <Post
            key={slug}
            slug={slug}
            date={date}
            title={title}
            description={description}
            author={author}
          />
        ))}
      </ul>
    </section>
  )
}




