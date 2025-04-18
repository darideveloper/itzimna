import { fontTitle } from "@/libs/fonts"
import Title from "@/components/ui/Title"
import { getSortedPostData } from "@/libs/posts"
import Post from "@/components/ui/Post"
export default function BlogPage() {
  const allPostsData = getSortedPostData()

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
          Blog
        </Title>
        <p
          className={`
            max-w-3xl
            mx-auto
            w-full
          `}
        >
          Our latest blog
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
