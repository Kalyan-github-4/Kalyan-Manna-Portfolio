import { useEffect, useRef, useState } from "react"

const AUDIO_SRC = "/audio/bliss.mp3"

// Background music sits under the page rather than in front of it — full
// volume on a track the visitor did not ask for is startling.
const VOLUME = 0.35

/**
 * Owns the single background-audio element for the site. Lives in the navbar
 * so one instance serves both the desktop and the mobile controls.
 */
export function useBackgroundAudio() {
  const audioRef = useRef<HTMLAudioElement | null>(null)

  // Intent, not the element's actual state. Browsers refuse to start audio
  // before the visitor has interacted with the page, and that refusal should
  // not flip the button to "off" — the track is still what they'll hear.
  const [enabled, setEnabled] = useState(true)

  useEffect(() => {
    const audio = new Audio(AUDIO_SRC)

    audio.loop = true
    audio.volume = VOLUME
    audio.preload = "auto"

    audioRef.current = audio

    return () => {
      audio.pause()
      audio.removeAttribute("src")
      audioRef.current = null
    }
  }, [])

  useEffect(() => {
    const audio = audioRef.current

    if (!audio) {
      return
    }

    if (!enabled) {
      audio.pause()
      return
    }

    let disposed = false

    const resume = () => {
      if (disposed) {
        return
      }

      void audio.play().catch(() => {
        // Still blocked — nothing useful left to do.
      })
    }

    const detach = () => {
      window.removeEventListener("pointerdown", resume)
      window.removeEventListener("keydown", resume)
    }

    // A rejected play() here is the expected autoplay block, not an error, so
    // we wait for the first gesture anywhere on the page and try again.
    void audio.play().catch(() => {
      if (disposed) {
        return
      }

      window.addEventListener("pointerdown", resume, { once: true })
      window.addEventListener("keydown", resume, { once: true })
    })

    return () => {
      disposed = true
      detach()
    }
  }, [enabled])

  const toggle = () => {
    setEnabled((current) => !current)
  }

  return { enabled, toggle }
}
