"use client"


import { useEffect } from 'react'

export default function BlogLangModifier({related_post}) {
  useEffect(() => {
    console.log(related_post)
    const lang = document.querySelector('.lang-btn')
    if (lang && related_post!=='') {
      lang.href = "#"
      
      const handleClick = (e) => {
        e.preventDefault() 
        e.stopPropagation() 
        window.open(related_post, '_self')
      }
      
      lang.addEventListener('click', handleClick)
      
      return () => {
        lang.removeEventListener('click', handleClick)
      }
    }
    
  }, [])
}