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
    
    // More precise locale path removal - match exact locale paths
    currentPage = currentPage.replace(/^\/es(?=\/|$)/, "")
    currentPage = currentPage.replace(/^\/en(?=\/|$)/, "")
    
    if (!currentPage) currentPage = "/"
    else if (!currentPage.startsWith('/')) currentPage = `/${currentPage}`
    
    // If the link is the same page, but with an anchor
    // Do not animate
    if (hrefNoId === "" || (href.includes('#') && hrefNoId === currentPage)) {
      return
    }
    
    // Show video
    e.preventDefault()
    const transitionVideoWrapper = document.querySelector('.transition-video-wrapper')
    if (!transitionVideoWrapper) {
      // Fallback if animation wrapper not found
      if (href === "/es" || href === "/en") {
        const lang = href.replace("/", "")
        router.replace(currentPage, { locale: lang })
      } else {
        router.push(href)
      }
      return
    }
    
    const transitionDuration = 1000
    transitionVideoWrapper.classList.remove("hidden")
    transitionVideoWrapper.classList.add("flex")
    await sleep(300)
    transitionVideoWrapper.classList.add("play")
    
    // Play video from start
    const video = transitionVideoWrapper.querySelector("video")
    if (video) {
      video.volume = 0.05
      video.currentTime = 0
      video.play()
    }
    
    // Check if the page needs a full reload
    const needsFullReload = full_reload_pages.some(page => href.startsWith(page))
    
    if (needsFullReload) {
      await sleep(3000) // Wait for animation to play
      window.location.href = `/${locale}${href.startsWith('/') ? href : `/${href}`}`
      return
    }
    
    // Store old URL for comparison
    const old_url = window.location.href
    
    // Handle language change
    if (href === "/es" || href === "/en") {
      const lang = href.replace("/", "")
      
      // Wait for animation
      await sleep(3000)
      
      // Use router to change locale
      try {
        // Ensure currentPage doesn't have duplicate slashes
        const normalizedCurrentPage = currentPage === "/" ? "" : currentPage
        router.replace(normalizedCurrentPage, { locale: lang })
      } catch (error) {
        console.error("Navigation error:", error)
        // Fallback to direct navigation
        window.location.href = `/${lang}${currentPage}`
      }
    } else {
      // Regular link (change page)
      try {
        router.push(href)
      } catch (error) {
        console.error("Navigation error:", error)
        // Fallback
        window.location.href = `/${locale}${href.startsWith('/') ? href : `/${href}`}`
      }
    }
    
    // End animation with safety timeout
    let animationEndTimeout
    const cleanup = async () => {
      // Hide video
      transitionVideoWrapper.classList.remove("play")
      await sleep(2000)
      transitionVideoWrapper.classList.add("hidden")
      transitionVideoWrapper.classList.remove("flex")
    }
    
    // Set a safety timeout to prevent infinite waiting
    animationEndTimeout = setTimeout(cleanup, 8000)
    
    // Check for navigation completion
    let attempts = 0
    const maxAttempts = 20 // Prevent infinite loop
    
    while (attempts < maxAttempts) {
      if (window.location.href !== old_url) {
        clearTimeout(animationEndTimeout)
        await sleep(transitionDuration)
        await cleanup()
        break
      } else {
        attempts++
        await sleep(500)
      }
    }
    
    // Safety check - if we hit max attempts, ensure animation is cleaned up
    if (attempts >= maxAttempts) {
      clearTimeout(animationEndTimeout)
      await cleanup()
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
