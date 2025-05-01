import { getPropertiesSummary } from '@/libs/api/properties'
import { pricesOptions, sizesOptions } from "@/data/filters"
import { getLocations } from "@/libs/api/locations"
import { getPosts } from '@/libs/api/posts';
import { slugify } from '@/libs/utils';

const siteUrl = process.env.NEXT_PUBLIC_HOST

function escapeXml(value) {
  return value
    .replace(/&/g, '&amp;')
    .replace(/'/g, '&apos;')
    .replace(/"/g, '&quot;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

export default async function sitemap() {

  // Langs
  const langs = ["en", "es"]

  // Static pages
  const staticPages = [
  ]

  // Generate sitemap array

  // Initial sitemap with home page
  const sitemap = [
    {
      url: escapeXml(siteUrl),
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 1,
    },
  ]

  // Home page
  sitemap.push({
    url: escapeXml(`${siteUrl}/`),
    lastModified: new Date(),
    changeFrequency: 'monthly',
    priority: 1,
  })

  // Generate entries for each lang
  for (const lang of langs) {

    // Fetch dynamic data
    const properties = await getPropertiesSummary(lang)
    const locations = await getLocations(lang)

    // Home page in lang
    sitemap.push({
      url: escapeXml(`${siteUrl}/${lang}`),
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 1,
    })

    // Static pages
    for (const page of staticPages) {
      sitemap.push({
        url: escapeXml(`${siteUrl}/${lang}/${page}`),
        lastModified: new Date(),
        changeFrequency: 'monthly',
        priority: 0.8,
      })
    }

    // Properties pages
    for (const property of properties) {
      sitemap.push({
        url: escapeXml(`${siteUrl}/${lang}/desarrollos/${property.id}-${property.slug}`),
        lastModified: new Date(property.updated_at).toISOString(),
        changeFrequency: 'weekly',
        priority: 0.7,
      })
    }

    // individual search queries Search filters
    const searchQueries = []
    const searchQueriesLocations = locations.map(
      location => {
        return `ubicacion=${location.id}&ubicacion-nombre=${location.name}`
      }
    )
    const searchQueriesSizes = sizesOptions.map(
      size => `metros-desde=0&metros-hasta=${size.value}`
    )
    const searchQueriesPrices = pricesOptions.map(
      price => `precio-desde=0&precio-hasta=${price.value}`
    )
    searchQueries.push(...searchQueriesLocations)
    searchQueries.push(...searchQueriesSizes)
    searchQueries.push(...searchQueriesPrices)
    for (const query of searchQueries) {
      sitemap.push({
        url: escapeXml(`${siteUrl}/${lang}/buscar?${query}`),
        lastModified: new Date(),
        changeFrequency: 'weekly',
        priority: 0.5,
      })
    }

    // Merge all search queries
    const searchQueriesMerged = []
    for (const searchQueriesLocation of searchQueriesLocations) {
      for (const searchQueriesSize of searchQueriesSizes) {
        for (const searchQueriesPrice of searchQueriesPrices) {
          const query = `${searchQueriesLocation}&${searchQueriesSize}&${searchQueriesPrice}`
          searchQueriesMerged.push(query)
        }
      }
    }
    for (const query of searchQueriesMerged) {
      sitemap.push({
        url: escapeXml(`${siteUrl}/${lang}/buscar?${query}`),
        lastModified: new Date(),
        changeFrequency: 'weekly',
        priority: 0.5,
      })
    }


    const posts = await getPosts()
    for (const post of posts) {
      sitemap.push({
        url: escapeXml(`${siteUrl}/${lang}/blog/${post.id}-${slugify(post.title)}`),
        lastModified: new Date(post.updated_at).toISOString(),
        changeFrequency: 'weekly',
        priority: 0.7,
      })
    }

  }

  return sitemap
}

