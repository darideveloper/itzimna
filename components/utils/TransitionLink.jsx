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
 * @returns 
 */
export default function TransitionLink({ href, onClick, disable, ...props }) {

  // Routing
  const router = useRouter()
  const locale = useLocale()

  // Pages that need a full reload
  const full_reload_pages = ["/buscar"]

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
    console.log({hrefNoId, currentPage})
    if (hrefNoId == "" || (href.includes('#') && hrefNoId === currentPage)) {
      return
    }

    // Show video
    e.preventDefault()
    const transitionVideoWrapper = document.querySelector('.transition-video-wrapper')
    const transitionDuration = 1000
    transitionVideoWrapper.classList.remove("hidden")
    transitionVideoWrapper.classList.add("flex")
    await sleep(300)
    transitionVideoWrapper.classList.add("play")

    // Play video from start
    const video = transitionVideoWrapper.querySelector("video")
    video.volume = 0.05
    video.currentTime = 0
    video.play()

    // Check if the page needs a full reload
    const is_full_reload = full_reload_pages.map((page) =>
      href.startsWith(page)
    ).includes(true)

    if (is_full_reload) {
      await sleep(3000) // Wait for animation to play
      window.location.href = `/${locale}${href}`
      return
    }

    // Redirect
    const old_url = window.location.href
    if (href == "/es" || href == "/en") {
      // Change lang if /es or /en
      const lang = href.replace("/", "")
      await sleep(3000)
      router.replace(`/${currentPage}`, { locale: lang })
    } else {
      // Regular link (change page)
      router.push(href)
    }

    // End animation
    while (true) {
      if (window.location.href !== old_url) {
        await sleep(transitionDuration)

        // Hide video
        transitionVideoWrapper.classList.remove("play")
        await sleep(2000)
        transitionVideoWrapper.classList.add("hidden")
        transitionVideoWrapper.classList.remove("flex")

        break
      } else {
        await sleep(500)
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
