"use client"

import { useEffect, useState } from "react"
import { ChevronUp, Volume2, VolumeX } from "lucide-react"
import { Button } from "@/components/ui/button"
import useUIState from "@/stores/ui-store"

const ScrollToTopButton = () => {
  const [isVisible, setIsVisible] = useState(false)
  const {setIsVideoMuted, isVideoMuted} = useUIState();

  useEffect(() => {
    const toggleVisibility = () => {
      // if the user scrolls down, show the button
      window.scrollY > 500 ? setIsVisible(true) : setIsVisible(false)
    }
    // listen for scroll events
    window.addEventListener("scroll", toggleVisibility)

    // clear the listener on component unmount
    return () => {
      window.removeEventListener("scroll", toggleVisibility)
    }
  }, [])

  // handles the animation when scrolling to the top
  const scrollToTop = () => {
    isVisible &&
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      })
  }

  return (
      <Button
        className={`fixed bottom-32 lg:bottom-[65px] right-4 rounded-full p-2 outline-none transition-opacity duration-200 ${
          isVisible ? "opacity-100" : "opacity-0"
        }`}
        onClick={scrollToTop}
      >
        <ChevronUp />
      </Button>
    
  )
}

export default ScrollToTopButton