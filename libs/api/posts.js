const host = process.env.NEXT_PUBLIC_HOST

export async function getPosts(lang) {
  if (!lang) lang = "es"
  // add header lang
  const res = await fetch(
    `${host}/api/blog/?page=1&page-size=10000&summary=true&description=true`,
    {
      headers: {
        lang: lang,
      },
    },
  )
  const jsonData = await res.json()
  const posts = await jsonData.results
  return posts
}

export async function getPost(slug, locale) {
  if(!locale) locale = "es"
  const res = await fetch(`${host}/api/blog/${slug}`, {
    headers: {
      'lang': locale
    }
  })
  const jsonData = await res.json()
  return jsonData
}
