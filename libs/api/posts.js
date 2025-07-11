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

export async function getPost(id, lang) {

  // Get data from API
  const res = await fetch(`${host}/api/blog/?id=${id}&details=true`, {
    headers: {
      'lang': lang
    }
  })

  // Validate if property exists
  if (res.status === 404) {
    return null
  }

  const jsonData = await res.json()
  return jsonData
}
