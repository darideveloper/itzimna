import { getPostData } from "@/libs/posts"
import Image from "next/image"
import "@/css/post-content.sass"
import { notFound } from "next/navigation"
import Title from "@/components/ui/Title"
import Subtitle from "@/components/ui/Subtitle"
export default async function BlogPost({ params }) {
  const { slug } = await params
  const post = await getPostData(slug)
  if (!post) {
    notFound()
  }

  return (
    <section
      className={`
        container
        mx-auto
      `}
    >
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
