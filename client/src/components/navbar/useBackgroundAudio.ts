import { useCallback, useEffect, useRef, useState } from "react"

const AUDIO_SRC = "/audio/bliss.mp3"

// Background music sits under the page rather than in front of it — full
// volume on a track the visitor did not ask for is startling.
const VOLUME = 0.35

/**
 * Owns the single background-audio element for the site. Lives in the navbar
 * so one instance serves both the desktop and the mobile controls.
 *
 * The element is built on the first real gesture rather than on mount. The
 * track is several megabytes, and creating it eagerly meant every visitor —
 * including ones who never hear a note, because autoplay is blocked until they
 * interact — paid for the download on every route.
 */
export function useBackgroundAudio() {
  const audioRef = useRef<HTMLAudioElement | null>(null)

  // Intent, not the element's actual state. Browsers refuse to start audio
  // before the visitor has interacted with the page, and that refusal should
  // not flip the button to "off" — the track is still what they'll hear.
  const [enabled, setEnabled] = useState(true)

  const ensureAudio = useCallback(() => {
    if (audioRef.current) {
      return audioRef.current
    }

    const audio = new Audio()

    audio.loop = true
    audio.volume = VOLUME
    // "none" leaves the fetch to play(), so the bytes are only spent once we
    // know the visitor has interacted and the track will actually be heard.
    audio.preload = "none"
    audio.src = AUDIO_SRC

    audioRef.current = audio

    return audio
  }, [])

  // Creation is gesture-driven, so mount has nothing to do here — this effect
  // exists purely to release the element when the navbar goes away.
  useEffect(() => {
    return () => {
      const audio = audioRef.current

      if (!audio) {
        return
      }

      audio.pause()
      audio.removeAttribute("src")
      audio.load()
      audioRef.current = null
    }
  }, [])

  useEffect(() => {
    if (!enabled) {
      audioRef.current?.pause()
      return
    }

    // An element already exists, so a gesture has happened and we are free to
    // pick the track back up without waiting for another one.
    const existing = audioRef.current

    if (existing) {
      void existing.play().catch(() => {
        // Still blocked — nothing useful left to do.
      })
      return
    }

    let disposed = false

    // The first gesture is both the permission play() needs and the signal
    // that the download is worth starting.
    const start = () => {
      if (disposed) {
        return
      }

      void ensureAudio()
        .play()
        .catch(() => {
          // Still blocked — nothing useful left to do.
        })
    }

    window.addEventListener("pointerdown", start, { once: true })
    window.addEventListener("keydown", start, { once: true })

    return () => {
      disposed = true
      window.removeEventListener("pointerdown", start)
      window.removeEventListener("keydown", start)
    }
  }, [enabled, ensureAudio])

  const toggle = useCallback(() => {
    setEnabled((current) => !current)
  }, [])

  return { enabled, toggle }
}
