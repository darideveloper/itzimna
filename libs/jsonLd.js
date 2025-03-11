export function getBreadcrumb(path) {

  const pathSegments = path.split('/').filter(segment => segment)

  // Get base URL
  const baseUrl = process.env.NEXT_PUBLIC_HOST

  const breadcrumbList = [
    {
      "@type": "ListItem",
      "position": 1,
      "name": "Home",
      "item": baseUrl
    }
  ]

  // Generate breadcrumb list dynamically
  let pathUrl = baseUrl
  pathSegments.forEach((segment, index) => {
    pathUrl += `/${segment}`
    breadcrumbList.push({
      "@type": "ListItem",
      "position": index + 2,
      "name": decodeURIComponent(segment.replace(/-/g, ' ')), // Translate or format
      "item": pathUrl
    })
  })

  return breadcrumbList
}