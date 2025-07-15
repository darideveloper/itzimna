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
    const langs = document.querySelectorAll('.lang-btn')
    langs.forEach(element => {
      element.addEventListener('click', () => {
        document.cookie = `NEXT_LOCALE=${current_lang=="es" ? "en" : "es"};`
        window.open(related_post, '_self')
      })
    });
  }, [])
}