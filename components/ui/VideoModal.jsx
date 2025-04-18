"use client"

// Hooks
import { useEffect } from "react"

// Zustand
import { useStartVideoStore } from "@/store/start-video"


export default function VideoModal() {

  const videoPlayed = useStartVideoStore(state => state.videoPlayed)
  const setVideoPlayed = useStartVideoStore(state => state.setVideoPlayed)


  useEffect(() => {

    const video = document.querySelector(".transition-video")
    const videoWrapper = document.querySelector(".transition-video-wrapper")

    // Validate video loaded
    if (video && videoWrapper) {

      // No play if video already played
      if (videoPlayed) {
        videoWrapper.remove()
        return
      }

      setTimeout(() => {

        videoWrapper.classList.remove("opacity-100")
        videoWrapper.classList.add("opacity-0")
        setTimeout(() => {
          // Delete video
          videoWrapper.remove()

          // Set video played
          setVideoPlayed(true)
        }, 500)
      }, 3000)
    }

    return () => {
      if (video) {
        video.removeEventListener("ended", () => { })
      }
    }
  }, [])

  return (
    <div
      className={`
      transition-video-wrapper
      opacity-100
      z-50
      flex
      bg-green-dark
      w-screen
      h-screen
      fixed
      top-1/2
      left-1/2
      -translate-x-1/2
      -translate-y-1/2
      duration-300
      transition-all
      items-center
      justify-center
    `}
    >
      <video
        className={`
        transition-video
        h-full md:h-auto
        w-auto md:w-full
      `}
        autoPlay
        muted
      >
        <source
          src="/videos/transition.mp4"
          type="video/mp4"
        />
        Your browser does not support the video tag.
      </video>
    </div>
  )
}