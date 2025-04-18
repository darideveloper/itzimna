import fs from "fs"
import path from "path"
import matter from "gray-matter"
import { remark } from "remark"
import html from "remark-html"
import gfm from "remark-gfm"

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
  const fullPath = path.join(postsDirectory, `${slug}.md`)
  if (!fs.existsSync(fullPath)) {
    return null
  }

  const fileContents = fs.readFileSync(fullPath, "utf8")
  const matterResult = matter(fileContents)

  const processedConent = await remark()
    .use(gfm)
    .use(html).process(matterResult.content)

  const contentHtml = processedConent.toString()

  return {
    slug,
    contentHtml,
    ...matterResult.data,
  }
}

