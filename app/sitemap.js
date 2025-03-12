import { getPropertiesSummaryNames } from '@/libs/api/properties'

const siteUrl = process.env.NEXT_PUBLIC_HOST

export default async function sitemap() {

  // Langs
  const langs = ["en", "es"]

  // Static pages
  const staticPages = [
  ]

  // Fetch dynamic pages
  const properties = await getPropertiesSummaryNames()

  // Generate sitemap array

  // Initial sitemap with home page
  const sitemap = [
    {
      url: siteUrl,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 1,
    },
  ]

  for (const lang of langs) {

    // Home page in each lang
    sitemap.push({
      url: `${siteUrl}/${lang}`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 1,
    })

    for (const page of staticPages) {
      sitemap.push({
        url: `${siteUrl}/${lang}/${page}`,
        lastModified: new Date(),
        changeFrequency: 'monthly',
        priority: 0.8,
      })
    }

    for (const property of properties) {
      sitemap.push({
        url: `${siteUrl}/${lang}/desarrollos/${property.id}-${property.slug}`,
        lastModified: new Date(property.updated_at).toISOString(),
        changeFrequency: 'weekly',
        priority: 0.7,
      })
    }
  }

  return sitemap
}
