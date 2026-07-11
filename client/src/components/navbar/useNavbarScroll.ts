import { useEffect, useRef, useState } from "react"

interface NavbarScrollState {
  isScrolled: boolean
  isVisible: boolean
}

export function useNavbarScroll(): NavbarScrollState {
  const previousScrollPosition = useRef(0)

  const [isScrolled, setIsScrolled] = useState(false)
  const [isVisible, setIsVisible] = useState(true)

  useEffect(() => {
    previousScrollPosition.current = window.scrollY

    const handleScroll = () => {
      const currentScrollPosition = window.scrollY
      const isScrollingDown =
        currentScrollPosition > previousScrollPosition.current

      setIsScrolled(currentScrollPosition > 50)

      if (isScrollingDown && currentScrollPosition > 50) {
        setIsVisible(false)
      } else {
        setIsVisible(true)
      }

      previousScrollPosition.current = currentScrollPosition
    }

    window.addEventListener("scroll", handleScroll, {
      passive: true,
    })

    return () => {
      window.removeEventListener("scroll", handleScroll)
    }
  }, [])

  return {
    isScrolled,
    isVisible,
  }
}