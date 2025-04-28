const host = process.env.NEXT_PUBLIC_HOST

export async function getPosts(params) {
  const res = await fetch(`${host}/api/blog/?page=1&page-size=10000&summary=true&description=true`)
  const jsonData = await res.json()
  const posts = await jsonData.results
  return posts
}


export async function getPost(id){
  const res = await fetch(`${host}/api/blog/${id}`)
  const jsonData = await res.json()
  return jsonData
}

