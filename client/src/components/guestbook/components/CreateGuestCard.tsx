import { useMemo, useState, useRef, useCallback } from "react"
import { SignedIn, SignedOut, useUser } from "@clerk/clerk-react"
import DoodleSvg from "./DoodleSvg"
import { previewTemplate, type CardTemplate } from "./cardTemplates"
import { ArrowRightIcon, PencilSimpleIcon, SparkleIcon } from "@phosphor-icons/react"
import GuestbookLoginDialog from "./GuestbookLoginDialog"

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
  onSubmit?: (message: string, role: string) => Promise<void> | void
}

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

// Decorative layer shared by both states of the composer, so the empty card a
// signed-out visitor sees and the one they type into are the same object.
function TemplateDoodles({ template }: { template: CardTemplate }) {
  return (
    <div className="pointer-events-none absolute inset-0">
      {template.doodles.map((d, i) => (
        <div
          key={`${d.type}-${i}`}
          className="absolute"
          style={{
            left: `${d.x}%`,
            top: `${d.y}%`,
            transform: `translate(-50%, -50%) rotate(${d.rotate}deg)`,
            opacity: d.opacity ?? 0.3,
          }}
        >
          <DoodleSvg type={d.type} size={d.size} />
        </div>
      ))}
    </div>
  )
}

function SignedOutCreateCard({ template }: { template: CardTemplate }) {
  const clip = useMemo(() => tornEdgePath(439), [])

  return (
    <div
      className="group relative overflow-hidden rounded-[20px] transition"
      style={{ background: template.gradient }}
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
  const [role, setRole] = useState("")

  const isEmpty = message.trim().length === 0
  const isLong = message.length > 70

  // The card the composer wears while you type. The card you actually get is
  // assigned server-side on submit — this is a taste of the set, not a promise.
  const template = useMemo(
    () => previewTemplate(user?.id || authorName),
    [user?.id, authorName]
  )

  const seed = useMemo(() => {
    let h = 0

    for (const ch of authorName) {
      h = (h * 31 + ch.charCodeAt(0)) % 99991
    }

    return h || 1
  }, [authorName])

  const clip = useMemo(() => tornEdgePath(seed), [seed])

  const handleSubmit = useCallback(async () => {
    if (isEmpty || submittingRef.current) return

    submittingRef.current = true
    setIsSubmitting(true)

    try {
      await onSubmit(message.trim(), role.trim())

      setMessage("")
      setRole("")
    } catch (error) {
      console.error("CreateGuestCard submit failed:", error)
    } finally {
      submittingRef.current = false
      setIsSubmitting(false)
    }
  }, [isEmpty, message, role, onSubmit])

  return (
    <div
      className="group relative overflow-hidden rounded-[20px] transition"
      style={{ background: template.gradient }}
    >
      {template.texture && (
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.07] mix-blend-screen"
          style={{
            backgroundImage:
              "repeating-linear-gradient(135deg, white 0px, white 1px, transparent 1px, transparent 9px)",
          }}
        />
      )}

      <TemplateDoodles template={template} />

      <div className="relative z-10 min-h-[150px] px-6 pb-3 pt-7">
        <textarea
          value={message}
          maxLength={maxLength}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type something nice…"
          rows={3}
          className={`relative z-10 w-full flex-1 resize-none bg-transparent text-white outline-none placeholder:text-white/35 ${isLong
            ? "text-base font-normal leading-relaxed"
            : "text-2xl font-semibold leading-snug"
            }`}
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

      {/* Replaces the old colour + doodle pickers: guests write, we design. */}
      <div className="absolute right-4 top-4 z-20 flex items-center gap-1.5 rounded-full bg-black/20 px-2.5 py-1 text-[10px] uppercase tracking-[0.14em] text-white/55 backdrop-blur-sm">
        <SparkleIcon size={12} weight="fill" />
        Card style picked for you
      </div>
    </div>
  )
}

export default function CreateGuestCard({
  maxLength = 100,
  onSubmit = () => { },
}: CreateGuestCardProps) {
  return (
    <>
      <SignedOut>
        <SignedOutCreateCard template={previewTemplate("guestbook-signed-out")} />
      </SignedOut>

      <SignedIn>
        <SignedInCreateCard maxLength={maxLength} onSubmit={onSubmit} />
      </SignedIn>
    </>
  )
}
