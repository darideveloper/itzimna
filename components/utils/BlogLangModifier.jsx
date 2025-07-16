"use client"

// libs
import { useEffect } from 'react'

/**
 * 
 * @param {string} related_post - The related post to open
 * @param {string} current_lang - The current language
 */
export default function BlogLangModifier({related_post, current_lang="en"}) {
  useEffect(() => {
    // Only modify language button behavior if there's a related post
    if (!related_post) {
      return
    }

    const handleLangClick = (event) => {
      event.preventDefault()
      event.stopPropagation()
      document.cookie = `NEXT_LOCALE=${current_lang=="es" ? "en" : "es"};`
      window.open(related_post, '_self')
    }

    const langs = document.querySelectorAll('.lang-btn')
    langs.forEach(element => {
      element.addEventListener('click', handleLangClick)
    })

    // Cleanup function to remove event listeners when component unmounts
    return () => {
      langs.forEach(element => {
        element.removeEventListener('click', handleLangClick)
      })
    }
  }, [related_post, current_lang]) // Add dependencies to re-run when props change 
}