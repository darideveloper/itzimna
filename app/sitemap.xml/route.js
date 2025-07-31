// app/sitemap.xml/route.js
import { getPropertiesSummary } from '@/libs/api/properties'
import { getLocations } from "@/libs/api/locations"
import { getPosts } from '@/libs/api/posts'
import { getServerSideSitemap } from 'next-sitemap'

const siteUrl = process.env.NEXT_PUBLIC_HOST

function escapeXml(value) {
  return value
    .replace(/&/g, '&amp;')
    .replace(/'/g, '&apos;')
    .replace(/"/g, '&quot;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
}

export const dynamic = 'force-dynamic'

export async function GET() {
  const sitemapEntries = []
  const langs = ["en", "es"]
  const staticPages = [] // Add your static page paths here if any

  // Add home page (redirect page) to sitemap
  sitemapEntries.push({
    loc: escapeXml(siteUrl),
    lastmod: new Date().toISOString(),
    changefreq: 'monthly',
    priority: 1,
  })

  // Initial sitemap with home page (for each language)
  for (const lang of langs) {
    sitemapEntries.push({
      loc: escapeXml(`${siteUrl}/${lang}`),
      lastmod: new Date().toISOString(),
      changefreq: 'monthly',
      priority: 1,
    })

    // Static pages in each language
    for (const page of staticPages) {
      sitemapEntries.push({
        loc: escapeXml(`${siteUrl}/${lang}/${page}`),
        lastmod: new Date().toISOString(),
        changefreq: 'monthly',
        priority: 0.8,
      })
    }

    // Fetch dynamic data for the current language
    const properties = await getPropertiesSummary(lang)
    const locations = await getLocations(lang)
    const posts = await getPosts(lang)

    // Properties pages
    for (const property of properties) {
      sitemapEntries.push({
        loc: escapeXml(`${siteUrl}/${lang}/desarrollos/${property.id}-${property.slug}`),
        lastmod: new Date(property.updated_at).toISOString(),
        changefreq: 'weekly',
        priority: 0.7,
      })
    }

    // // Individual search queries Search filters
    // const searchQueries = [];
    // const searchQueriesLocations = locations.map(
    //   location => `ubicacion=${location.id}&ubicacion-nombre=${location.name}`
    // );
    // const searchQueriesSizes = sizesOptions.map(
    //   size => `metros-desde=0&metros-hasta=${size.value}`
    // );
    // const searchQueriesPrices = pricesOptions.map(
    //   price => `precio-desde=0&precio-hasta=${price.value}`
    // );
    // searchQueries.push(...searchQueriesLocations);
    // searchQueries.push(...searchQueriesSizes);
    // searchQueries.push(...searchQueriesPrices);
    // for (const query of searchQueries) {
    //   sitemapEntries.push({
    //     loc: escapeXml(`${siteUrl}/${lang}/buscar-propiedades?${query}`),
    //     lastmod: new Date().toISOString(),
    //     changefreq: 'weekly',
    //     priority: 0.5,
    //   });
    // }

    // // Merge all search queries
    // const searchQueriesMerged = [];
    // for (const searchQueriesLocation of searchQueriesLocations) {
    //   for (const searchQueriesSize of searchQueriesSizes) {
    //     for (const searchQueriesPrice of searchQueriesPrices) {
    //       const query = `${searchQueriesLocation}&${searchQueriesSize}&${searchQueriesPrice}`;
    //       searchQueriesMerged.push(query);
    //     }
    //   }
    // }
    // for (const query of searchQueriesMerged) {
    //   sitemapEntries.push({
    //     loc: escapeXml(`${siteUrl}/${lang}/buscar-propiedades?${query}`),
    //     lastmod: new Date().toISOString(),
    //     changefreq: 'weekly',
    //     priority: 0.5,
    //   });
    // }

    // Blog posts
    for (const post of posts) {
      sitemapEntries.push({
        loc: escapeXml(`${siteUrl}/${lang}/blog/${post.id}-${post.slug}`),
        lastmod: new Date(post.updated_at).toISOString(),
        changefreq: 'weekly',
        priority: 0.7,
      })
    }
  }

  return getServerSideSitemap(sitemapEntries)
}