"use client"

import { useEffect } from 'react'
import AOS from "aos"
import "aos/dist/aos.css"

export default function AOSInit() {
  // Start AOS when component mounts
  useEffect(() => {

    // Add aos to markdown h1, h2, h3, h4, h5, h6
    const selectors = [
      "h1", "h2", "h3", "h4", "h5", "h6", 
    ]
    const selector = selectors.map(selector => `.details ${selector}:not([data-aos])`).join(",")
    const elements = document.querySelectorAll(selector)
    if (elements.length) {
      elements.forEach(element => {
        element.setAttribute('data-aos', 'fade-down')
      })
    }
    
    // Start Aos
    AOS.init({
      duration: 1000,
      delay: window.innerWidth < 768 ? 0 : 100,
      once: true,
    })

  }, [])

  return null
}