import Image from 'next/image'
import { useState, useEffect } from 'react'


/**
 * Spinner animating favicon
 */
export default function Spinner({ isLoading }) {

  // States
  const [display, setDisplay] = useState('hidden')
  const [opacity, setOpacity] = useState(0)

  // Effects
  useEffect(() => {
    if (isLoading) {
      // Show spinner and fade in
      setDisplay('flex')
      setTimeout(() => {
        setOpacity(100)
      }, 100)
    } else {
      // Fade out and hide spinner
      setOpacity(0)
      setTimeout(() => {
        setDisplay('hidden')
      }, 100)
    }
  }, [isLoading])


  return (
    <div
      className={`
        spinner
        w-full
        h-full
        bg-white
        items-start
        justify-center
        absolute
        top-0
        left-0
        duration-300
        ${display}
        opacity-${opacity}
        z-20
      `}
    >
      <Image
        src="/favicon.ico"
        alt="Spinner"
        width={100}
        height={100}
        className={`
          animate-spin
          duration-600
          my-12
          w-36
          h-36
        `}
      />
    </div>
  )
}