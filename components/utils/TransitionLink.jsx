"use client"

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
export function TransitionLink({ href, onClick, disable, ...props }) {

  const router = useRouter()

  function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms))
  }

  async function handleTransition(e) {

    if (disable === 'true') return

    // Start animation
    e.preventDefault()
    const transitionClass = 'page-transition'
    const transitionDuration = 400
    const body = document.querySelector('main')
    body.classList.add(transitionClass)
    await sleep(transitionDuration)

    // Change page
    const old_url = window.location.href
    router.push(href)

    // End animation
    const urlValidationInterval = setInterval(async () => {
      const newUrl = window.location.href
      if (old_url != newUrl) {
        await sleep(transitionDuration)
        body.classList.remove(transitionClass)

        // Clear the interval when the condition is met
        clearInterval(urlValidationInterval)
      }
    }, 100)
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