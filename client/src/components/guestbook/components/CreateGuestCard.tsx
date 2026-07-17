import { useMemo, useState, useEffect, useRef, useCallback } from "react"
import { SignedIn, SignedOut, useUser } from "@clerk/clerk-react"
import type { GuestEntry } from "./GuestCard"
import type { Doodle, DoodleName } from "./DoodleSvg"
import DoodleSvg from "./DoodleSvg"
import { ArrowRightIcon, PencilSimpleIcon } from "@phosphor-icons/react"
import GuestbookLoginDialog from "./GuestbookLoginDialog"

type GradientName = GuestEntry["gradient"]

const GRADIENTS: Record<GradientName, string> = {
  purple: "linear-gradient(160deg, #7C4FE0 0%, #4A2E9E 55%, #2B1862 100%)",
  forest: "linear-gradient(160deg, #1F6B4F 0%, #134634 60%, #0B2B20 100%)",
  maroon: "linear-gradient(160deg, #8C2A2A 0%, #5E1717 55%, #390D0D 100%)",
  navy: "linear-gradient(160deg, #2A3A8C 0%, #18225E 55%, #0E1338 100%)",
  ocean: "linear-gradient(160deg, #1C7C8C 0%, #114F5E 55%, #0A323D 100%)",
  sunset: "linear-gradient(160deg, #C2542E 0%, #8C3221 55%, #531A10 100%)",
}

function tornEdgePath(seed: number, w = 400, h = 280, tearDepth = 14) {
  let s = seed

  const rand = () => {
    s = (s * 9301 + 49297) % 233280
    return s / 233280
  }

  const teeth = 14
  const points: string[] = [`0,0`, `${w},0`, `${w},${h}`]

  for (let i = teeth; i >= 0; i--) {
    const x = (w / teeth) * i
    const jitter = (rand() - 0.5) * tearDepth
    const y = h + (i % 2 === 0 ? jitter : -jitter * 0.6)
    points.push(`${x.toFixed(1)},${y.toFixed(1)}`)
  }

  points.push(`0,${h}`)
  return `polygon(${points.join(" ")})`
}

interface CreateGuestCardProps {
  maxLength?: number
  gradient?: GradientName
  onSubmit?: (
    message: string,
    gradient: GradientName,
    doodles: Doodle[],
    role: string,
    rating: number
  ) => Promise<void> | void
}

const GRADIENT_ORDER: GradientName[] = [
  "purple",
  "forest",
  "maroon",
  "navy",
  "ocean",
  "sunset",
]

const DOODLE_OPTIONS: DoodleName[] = [
  "heart",
  "star",
  "sparkle",
  "lightning",
  "swirl",
  "cloud",
  "arrow",
  "moon",
]

function getInitials(name?: string | null) {
  if (!name) return "G"

  return name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0])
    .join("")
    .toUpperCase()
}

function SignedOutCreateCard({ gradient }: { gradient: GradientName }) {
  const seed = useMemo(() => 439, [])
  const clip = useMemo(() => tornEdgePath(seed), [seed])

  return (
    <div
      className="group relative overflow-hidden rounded-[20px] transition"
      style={{ background: GRADIENTS[gradient] }}
    >
      <div className="relative z-10 flex min-h-[150px] flex-col items-center justify-center px-6 pb-3 pt-7 text-center">
        <p className="font-serif text-3xl italic text-white">
          “Join the wall...”
        </p>

        <p className="mt-2 text-sm font-semibold text-white/55">
          Sign in to leave your mark
        </p>

        <div className="mt-5">
          <GuestbookLoginDialog />
        </div>

        <PencilSimpleIcon
          size={48}
          className="absolute bottom-5 left-5 rotate-[-42deg] text-white/15"
        />

        <div className="absolute right-8 top-6 h-8 w-8 rounded-full border-4 border-dashed border-white/15" />
      </div>

      <div className="relative">
        <div
          className="absolute inset-x-0 bottom-0 h-[60px] bg-[#0b0b0d]"
          style={{ clipPath: clip }}
        />

        <div className="relative z-10 flex items-center justify-center gap-8 px-5 pb-4 pt-7 text-white/70">
          <span className="text-lg">⌁</span>
          <span className="text-lg">G</span>
          <span className="text-lg">@</span>
        </div>
      </div>
    </div>
  )
}

function SignedInCreateCard({
  maxLength,
  gradient,
  onSubmit,
}: Required<CreateGuestCardProps>) {
  const { user } = useUser()
  const submittingRef = useRef(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const authorName =
    user?.fullName ||
    user?.username ||
    user?.primaryEmailAddress?.emailAddress ||
    "Guest"

  const authorInitials = getInitials(authorName)

  const [message, setMessage] = useState("")
  const [activeGradient, setActiveGradient] = useState<GradientName>(gradient)
  const [doodles, setDoodles] = useState<Doodle[]>([])
  const [selectedDoodle, setSelectedDoodle] = useState<DoodleName | null>(null)
  const [role, setRole] = useState("")
  const [rating, setRating] = useState(5)

  const messageRef = useRef<HTMLDivElement>(null)
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  const isEmpty = message.trim().length === 0
  const isLong = message.length > 70

  const seed = useMemo(() => {
    let h = 0

    for (const ch of authorName) {
      h = (h * 31 + ch.charCodeAt(0)) % 99991
    }

    return h || 1
  }, [authorName])

  const clip = useMemo(() => tornEdgePath(seed), [seed])

  const addDoodleAt = useCallback((type: DoodleName, x: number, y: number) => {
    const newDoodle: Doodle = {
      type,
      x: Math.max(0, Math.min(100, x)),
      y: Math.max(0, Math.min(100, y)),
      size: 26 + Math.random() * 14,
      rotate: Math.random() * 360,
      opacity: 0.6 + Math.random() * 0.3,
    }

    setDoodles((prev) => [...prev, newDoodle])
  }, [])

  const removeLastDoodle = useCallback(() => {
    setDoodles((prev) => prev.slice(0, -1))
  }, [])

  const handleMessageClick = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (!selectedDoodle || !messageRef.current) return

      const rect = messageRef.current.getBoundingClientRect()
      const x = ((e.clientX - rect.left) / rect.width) * 100
      const y = ((e.clientY - rect.top) / rect.height) * 100

      addDoodleAt(selectedDoodle, x, y)
    },
    [selectedDoodle, addDoodleAt]
  )

  const handleDoodleSelect = useCallback((doodle: DoodleName) => {
    setSelectedDoodle((prev) => (prev === doodle ? null : doodle))

    textareaRef.current?.focus()
  }, [])

  const handleSubmit = useCallback(async () => {
    if (isEmpty || submittingRef.current) return

    submittingRef.current = true
    setIsSubmitting(true)

    try {
      console.log("CreateGuestCard submit started")

      await onSubmit(message.trim(), activeGradient, doodles, role.trim(), rating)

      setMessage("")
      setRole("")
      setRating(5)
      setDoodles([])
      setSelectedDoodle(null)
    } catch (error) {
      console.error("CreateGuestCard submit failed:", error)
    } finally {
      submittingRef.current = false
      setIsSubmitting(false)
    }
  }, [isEmpty, message, activeGradient, doodles, role, rating, onSubmit])

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const el = document.activeElement

      const isTyping =
        el?.tagName === "TEXTAREA" || (el as HTMLElement)?.isContentEditable

      if (isTyping) return

      if ((e.key === "Backspace" || e.key === "Delete") && doodles.length > 0) {
        e.preventDefault()
        removeLastDoodle()
      }

      if (e.key === "Escape" && selectedDoodle) {
        setSelectedDoodle(null)
      }
    }

    window.addEventListener("keydown", handleKeyDown)

    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [doodles.length, removeLastDoodle, selectedDoodle])

  return (
    <div
      className="group relative overflow-hidden rounded-[20px] transition"
      style={{ background: GRADIENTS[activeGradient] }}
    >
      <div
        ref={messageRef}
        className="relative z-10 min-h-[150px] px-6 pb-3 pt-7"
        style={{ cursor: selectedDoodle ? "crosshair" : "default" }}
        onClick={handleMessageClick}
      >
        <div className="pointer-events-none absolute inset-0">
          {doodles.map((d, i) => (
            <div
              key={`${d.type}-${i}-${d.x}-${d.y}`}
              className="absolute"
              style={{
                left: `${d.x}%`,
                top: `${d.y}%`,
                transform: `translate(-50%, -50%) rotate(${d.rotate}deg)`,
                opacity: d.opacity ?? 0.6,
                pointerEvents: "none",
              }}
            >
              <DoodleSvg type={d.type} size={d.size} />
            </div>
          ))}
        </div>

        <textarea
          ref={textareaRef}
          value={message}
          maxLength={maxLength}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type something nice…"
          rows={3}
          className={`relative z-10 w-full flex-1 resize-none bg-transparent text-white outline-none placeholder:text-white/35 ${isLong
            ? "text-base font-normal leading-relaxed"
            : "text-2xl font-semibold leading-snug"
            }`}
          style={{
            cursor: selectedDoodle ? "crosshair" : "text",
          }}
        />
      </div>

      <div className="relative">
        <div
          className="absolute inset-x-0 bottom-0 h-[60px] bg-[#0b0b0d]"
          style={{ clipPath: clip }}
        />

        <div className="relative z-10 flex items-center justify-between px-5 pb-4 pt-7">
          <div className="flex items-center gap-3">
            {user?.imageUrl ? (
              <img
                src={user.imageUrl}
                alt={authorName}
                className="h-9 w-9 rounded-full object-cover"
              />
            ) : (
              <div className="grid h-9 w-9 place-items-center rounded-full bg-white/10 text-white">
                {authorInitials}
              </div>
            )}

            <div className="min-w-0">
              <p className="truncate text-sm text-white/90">{authorName}</p>
              <input
                value={role}
                onChange={(e) => setRole(e.target.value)}
                onClick={(e) => e.stopPropagation()}
                disabled={isSubmitting}
                placeholder={isSubmitting ? "Sending…" : "Add your role · e.g. Designer"}
                maxLength={60}
                aria-label="Your role or title"
                className="w-full bg-transparent text-xs text-white/60 outline-none placeholder:text-white/35 disabled:opacity-70"
              />
            </div>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-xs text-white/40">
              {message.length}/{maxLength}
            </span>

            <button
              type="button"
              disabled={isEmpty || isSubmitting}
              onClick={handleSubmit}
              className="grid h-9 w-9 place-items-center rounded-full bg-white/10 text-white/70 transition hover:bg-white/20 disabled:opacity-30 disabled:hover:bg-white/10"
            >
              <ArrowRightIcon size={16} weight="bold" />
            </button>
          </div>
        </div>
      </div>

      <div className="absolute left-4 top-4 z-20 flex gap-1.5 opacity-0 transition-opacity group-hover:opacity-100">
        {DOODLE_OPTIONS.map((d) => {
          const active = selectedDoodle === d

          return (
            <button
              key={d}
              type="button"
              onClick={(e) => {
                e.stopPropagation()
                handleDoodleSelect(d)
              }}
              className={`grid h-7 w-7 place-items-center rounded-md transition-all ${active
                ? "scale-110 bg-white text-black shadow-lg"
                : "bg-white/10 text-white/80 hover:bg-white/20"
                }`}
              title={`Draw ${d} doodle`}
            >
              <DoodleSvg type={d} size={14} />
            </button>
          )
        })}
      </div>

      <div className="absolute right-4 top-4 z-20 flex gap-1.5 opacity-0 transition-opacity group-hover:opacity-100">
        {GRADIENT_ORDER.map((g) => (
          <button
            key={g}
            type="button"
            onClick={() => setActiveGradient(g)}
            className="h-5 w-5 rounded-full ring-1 ring-white/30 transition hover:scale-110 hover:ring-white/60"
            style={{ background: GRADIENTS[g] }}
            title={`Change to ${g} theme`}
          />
        ))}
      </div>
    </div>
  )
}

export default function CreateGuestCard({
  maxLength = 100,
  gradient = "purple",
  onSubmit = () => { },
}: CreateGuestCardProps) {
  return (
    <>
      <SignedOut>
        <SignedOutCreateCard gradient={gradient} />
      </SignedOut>

      <SignedIn>
        <SignedInCreateCard
          maxLength={maxLength}
          gradient={gradient}
          onSubmit={onSubmit}
        />
      </SignedIn>
    </>
  )
}