// A short, quiet "tap" synthesised with Web Audio — no audio file to fetch.
// Browsers only allow an AudioContext to start after a user gesture, so it is
// created lazily on the first tap and reused after that.

let context: AudioContext | null = null

function getContext(): AudioContext | null {
  if (typeof window === "undefined") return null

  // Scroll-driven sounds can fire before any click or key press; the browser
  // would refuse to start audio then and log a warning, so stay silent instead.
  if (navigator.userActivation && !navigator.userActivation.hasBeenActive) {
    return null
  }

  if (!context) {
    const Ctor =
      window.AudioContext ??
      (window as typeof window & { webkitAudioContext?: typeof AudioContext })
        .webkitAudioContext
    if (!Ctor) return null
    context = new Ctor()
  }

  if (context.state === "suspended") {
    void context.resume()
  }

  return context
}

interface Tone {
  type: OscillatorType
  from: number
  to: number
  volume: number
  /** Seconds until the tone has faded out. */
  length: number
}

function playTone({ type, from, to, volume, length }: Tone) {
  const ctx = getContext()
  if (!ctx) return

  const now = ctx.currentTime
  const osc = ctx.createOscillator()
  const gain = ctx.createGain()

  osc.type = type
  osc.frequency.setValueAtTime(from, now)
  osc.frequency.exponentialRampToValueAtTime(to, now + length * 0.8)

  gain.gain.setValueAtTime(0.0001, now)
  gain.gain.exponentialRampToValueAtTime(volume, now + 0.004)
  gain.gain.exponentialRampToValueAtTime(0.0001, now + length)

  osc.connect(gain).connect(ctx.destination)
  osc.start(now)
  osc.stop(now + length + 0.01)
}

// A quick downward pitch sweep reads as a soft click rather than a beep.
export function playTap() {
  playTone({ type: "triangle", from: 1800, to: 600, volume: 0.08, length: 0.05 })
}

// Softer and rising, so a project swap sounds distinct from a button press.
export function playSwitch() {
  playTone({ type: "sine", from: 520, to: 880, volume: 0.06, length: 0.09 })
}
