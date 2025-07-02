'use client'

import { Link } from '@/i18n/routing'
import { useRouter } from '@/i18n/routing'
import { useLocale } from "next-intl";


/**
 * Link with transition effect
 * 
 * @param {props} props - Link props
 * @param {string} props.href - Link URL
 * @param {function} props.onClick - Function to call on click
 * @param {string} props.disable - Disable
 * @param {object} props.props - Other
 * @param {string} props.target - Target
 * @param {boolean} props.forceReload - Force reload
 * @returns 
 */
export default function TransitionLink({ href, onClick, disable, target="_self", forceReload=false, ...props }) {

  // Routing
  const router = useRouter()
  const locale = useLocale()

  // Pages that need a full reload
  const full_reload_pages = []

  function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms))
  }

  async function handleTransition(e) {

    // Skip if disabled
    if (disable === 'true') return

    // Target page from href
    let hrefNoId = href.split('#')[0].trim()

    // Original page
    const domain = window.location.origin
    let currentPage = window.location.href.split('#')[0]
    currentPage = currentPage.replace(domain, '')
    currentPage = currentPage.replace("/es", "")
    currentPage = currentPage.replace("/en", "")
    if (!currentPage) currentPage = "/"

    // If the link is the same page, but with an anchor
    // Do not animate
    if (hrefNoId == "" || (href.includes('#') && hrefNoId === currentPage)) {
      return
    }

    // Desable default behavior
    e.preventDefault()

    // Check if the page needs a full reload
    let is_full_reload = full_reload_pages.map((page) =>
      href.startsWith(page)
    ).includes(true)

    // Force reload
    if (forceReload) {
      is_full_reload = true
    }

    if (is_full_reload) {
      if (target === "_blank") {
        window.open(`/${locale}${href}`, '_blank')
      } else {
        window.location.href = `/${locale}${href}`
      }
      return
    }

    // Redirect
    if (href == "/es" || href == "/en") {
      // Change lang if /es or /en
      const lang = href.replace("/", "")
      router.replace(`/${currentPage}`, { locale: lang })
    } else {
      // Regular link (change page)
      if (target === "_blank") {
        window.open(`/${locale}${href}`, '_blank')
      } else {
        router.push(href)
      }
    }

  }

  return (
    <Link
      href={href}
      onClick={(e) => {
        onClick && onClick()
        handleTransition(e)
      }}
      {...props}
    />
  )
}
