import Image from 'next/image'
import { useState, useEffect } from 'react'


/**
 * Spinner animating favicon
 * @param {Object} props - Component props
 * @param {Boolean} props.isLoading - Loading state
 * @param {String} props.className - Component classes
 * @param {Boolean} props.transparentModal - Transparent model. Default is false
 * @returns {JSX.Element} Spinner component
 */
export default function Spinner({ isLoading, className, transparentModal = false }) {

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
        spinner-loading
        w-full
        h-full
        ${transparentModal ? 'bg-transparent' : 'bg-white'}
        items-start
        justify-center
        absolute
        top-0
        left-0
        duration-300
        ${display}
        opacity-${opacity}
        z-20
        ${className}
      `}
    >
      <Image
        src="/favicon.ico"
        alt="Spinner"
        title="Spinner"
        width={100}
        height={100}
        className={`
          animate-spin
          duration-600
          my-12
          w-28
          h-28
        `}
      />
    </div>
  )
}