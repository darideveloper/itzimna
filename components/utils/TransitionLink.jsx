'use client'

import { Link } from '@/i18n/routing'
import { useRouter } from '@/i18n/routing'

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

  const router = useRouter()

  function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms))
  }

  async function handleTransition(e) {

    if (disable === 'true') return

    // Validate local link
    if (!href.startsWith('/')) {
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

    // Change page
    const old_url = window.location.href
    router.push(href)

    // End animation
    while (true) {
      if (window.location.href !== old_url) {
        await sleep(transitionDuration)
        
        // Hide video
        transitionVideoWrapper.classList.remove("play")
        await sleep(300)
        transitionVideoWrapper.classList.add("hidden")
        transitionVideoWrapper.classList.remove("flex")
        
        break
      } else {
        await sleep(100)
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
      className={`
      `}
      {...props}
    />
  )
}
