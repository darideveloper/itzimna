import fs from "fs"
import path from "path"
import matter from "gray-matter"
import { remark } from "remark"
import html from "remark-html"
import gfm from "remark-gfm"
import { getPost } from "./api/posts"

const postsDirectory = path.join(process.cwd(), "content", "posts")

export function getSortedPostData() {
  const fileNames = fs.readdirSync(postsDirectory)

  const allPostsData = fileNames.map((fileName) => {
    const slug = fileName.replace(/\.md$/, "")

    const fullPath = path.join(postsDirectory, fileName)
    const fileContents = fs.readFileSync(fullPath, "utf8")

    const matterResult = matter(fileContents)

    return {
      slug,
      ...matterResult.data,
    }
  })

  return allPostsData.sort((a, b) => {
    if (a.date < b.date) {
      return 1
    } else {
      return -1
    }
  })
}

export function getAllPostSlugs() {
  return fs.readdirSync(postsDirectory).map((fileName) => ({
    slug: fileName.replace(/\.md$/, ""),
  }))
}

export async function getPostData(slug) {

  const res = await getPost(slug)
  const fileContent = res.content

  const matterResult = matter(fileContent)
  
  const processedConent = await remark()
    .use(gfm)
    .use(html).process(matterResult.content)

  const contentHtml = processedConent.toString()
  

  return {
    title : res.title,
    date : res.created_at,
    author : res.author,
    banner_image: res.banner_image_url,
    keywords: res.keywords,
    description : res.description,
    lang: res.lang,
    contentHtml
  }
}

