import { fetchAuth } from "@/libs/jwt"

export async function GET(request) {
  let lang = request.headers.get("lang") || "es"

  if (!lang) {
    lang = request.headers.get("lang") || "es"
  }

  // read all params
  const getParams = new URLSearchParams(request.url.split('?')[1])

  // Get id from params and remove it from the params
  const id = getParams.get('id', null)
  getParams.delete('id')

  let endpoint
  if (id) {
    endpoint = `posts/${id}?${getParams}`
  } else {
    endpoint = `posts?${getParams}`
  }

  const apiResponse = await fetchAuth(
    request,
    endpoint,
    "GET",
    null,
    lang,
  )

  // Return formatted response
  const data = await apiResponse.json()
  return new Response(JSON.stringify(data), {
    status: apiResponse.status,
    headers: {
      "Content-Type": "application/json",
    },
  })
}
