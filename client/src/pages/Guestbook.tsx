import { useCallback, useEffect, useMemo, useState } from "react";
import { useAuth, useUser } from "@clerk/clerk-react";

import GradientText from "../components/shared/GradientText";
import CreateGuestCard from "../components/guestbook/components/CreateGuestCard";
import GuestCard, { type GuestEntry } from "../components/guestbook/components/GuestCard";
import GuestCardSkeleton from "../components/guestbook/components/GuestCardSkeleton";
import type { Doodle } from "../components/guestbook/components/DoodleSvg";
// import { sampleEntries } from "./data/sampleEntries";
import {
  createGuestbookEntry,
  deleteMyGuestbookEntry,
  getGuestbookEntries,
  type GuestbookEntryResponse,
} from "@/lib/api";

type GradientName = GuestEntry["gradient"];

const GRADIENT_NAMES: GradientName[] = [
  "purple",
  "forest",
  "maroon",
  "navy",
  "ocean",
  "sunset",
];

function toGradient(value: string): GradientName {
  return GRADIENT_NAMES.includes(value as GradientName)
    ? (value as GradientName)
    : "purple";
}

function getInitials(name: string) {
  return name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0])
    .join("")
    .toUpperCase();
}

function normalizeDoodles(value: unknown): Doodle[] {
  if (!Array.isArray(value)) return [];

  return value.filter((item): item is Doodle => {
    if (!item || typeof item !== "object") return false;

    const doodle = item as Doodle;
    return (
      typeof doodle.type === "string" &&
      typeof doodle.x === "number" &&
      typeof doodle.y === "number" &&
      typeof doodle.size === "number" &&
      typeof doodle.rotate === "number"
    );
  });
}

// Small, stable "random" tilt so the wall reads like pinned paper notes
// instead of a rigid grid. Kept as full literal class strings so Tailwind's
// JIT actually generates them. Seeded by the entry id (not the index) so each
// card keeps its angle even when newer entries are prepended ahead of it.
const TILT_CLASSES = ["-rotate-1", "-rotate-[0.5deg]", "rotate-[0.5deg]", "rotate-1"] as const;

function getCardTilt(id: string): string {
  let h = 0;
  for (const ch of id) h = (h * 31 + ch.charCodeAt(0)) % 99991;
  return TILT_CLASSES[h % TILT_CLASSES.length];
}

function mapEntryToCard(entry: GuestbookEntryResponse): GuestEntry {
  const author = entry.user?.name || "Guest";

  return {
    id: entry.id,
    message: entry.message,
    gradient: toGradient(entry.gradient),
    doodles: normalizeDoodles(entry.doodles),
    rotation: getCardTilt(entry.id),
    author,
    role: entry.role || "Visitor",
    rating: entry.rating ?? 5,
    // rating: entry.rating ?? 5,
    avatar: entry.user?.imageUrl
      ? { kind: "photo", value: entry.user.imageUrl }
      : { kind: "initials", value: getInitials(author) || "G" },
    date: new Date(entry.createdAt).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    }),
    createdAtIso: entry.createdAt,
    ownerClerkUserId: entry.user?.clerkUserId ?? null,
  }
}

function isWithinDeleteWindow(createdAtIso?: string) {
  if (!createdAtIso) return false;

  const createdAtMs = new Date(createdAtIso).getTime();
  if (Number.isNaN(createdAtMs)) return false;

  const ageMs = Date.now() - createdAtMs;
  const twentyFourHoursMs = 24 * 60 * 60 * 1000;
  return ageMs <= twentyFourHoursMs;
}

function GuestBook() {
  const { getToken } = useAuth();
  const { user } = useUser();

  const [entries, setEntries] = useState<GuestEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [submitState, setSubmitState] = useState<string | null>(null);
  const viewerId = user?.id ?? null;

  // const refreshEntries = useCallback(async () => {
  //   const response = await getGuestbookEntries();
  //   setEntries(response.entries.map(mapEntryToCard));
  // }, []);

  useEffect(() => {
    let cancelled = false;

    getGuestbookEntries()
      .then((response) => {
        if (cancelled) return;
        setEntries(response.entries.map(mapEntryToCard));
      })
      .catch((err) => {
        if (cancelled) return;

        setError(
          err instanceof Error ? err.message : "Failed to load guestbook"
        );
      })
      .finally(() => {
        if (cancelled) return;
        setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, []);

  const displayEntries = useMemo(() => {
    if (entries.length > 0) return entries;
    // return sampleEntries;
    return [];
  }, [entries]);


  const handleShare = useCallback(async (id: string) => {
    const entry = entries.find((item) => item.id === id);
    if (!entry) return;

    const shareUrl = `${window.location.origin}/more/guestbook#guest-card-${id}`;
    const shareText = `"${entry.message}" — ${entry.author}`;

    try {
      if (navigator.share) {
        await navigator.share({
          title: "Guestbook Memory",
          text: shareText,
          url: shareUrl,
        });
      } else if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(`${shareText}\n${shareUrl}`);
      } else {
        throw new Error("Sharing is not supported on this browser");
      }

      setSubmitState("Share link ready.");
    } catch (err) {
      if (err instanceof Error && err.name === "AbortError") {
        return;
      }

      setSubmitState(
        err instanceof Error ? err.message : "Failed to share this memory"
      );
    }
  }, [entries]);

  const handleDelete = useCallback(async (id: string) => {
    const entry = entries.find((item) => item.id === id);
    if (!entry) return;

    const isOwner = Boolean(viewerId) && entry.ownerClerkUserId === viewerId;
    if (!isOwner || !isWithinDeleteWindow(entry.createdAtIso)) {
      setSubmitState("This card can only be deleted by its author within 24 hours.");
      return;
    }

    const confirmed = window.confirm("Delete this guestbook memory?");
    if (!confirmed) return;

    try {
      const token = await getToken();

      if (!token) {
        throw new Error("Please sign in again before deleting.");
      }

      await deleteMyGuestbookEntry(id, token);
      setEntries((prev) => prev.filter((item) => item.id !== id));
      setSubmitState("Message deleted.");
    } catch (err) {
      setSubmitState(
        err instanceof Error ? err.message : "Failed to delete message"
      );
    }
  }, [entries, getToken, viewerId]);

  const handleSubmit = useCallback(
    async (
      message: string,
      gradient: GradientName,
      doodles: Doodle[],
      role: string,
      rating: number
    ) => {
      try {
        setSubmitState(null)

        const token = await getToken()

        if (!token) {
          setSubmitState("Please sign in again before posting.")
          throw new Error("No Clerk token found")
        }

        const response = await createGuestbookEntry(
          {
            message,
            gradient,
            doodles,
            role: role || "Visitor",
            rating,
          },
          token
        )

        setEntries((prev) => [mapEntryToCard(response.entry), ...prev])

        setSubmitState("Message added to the wall.")
      } catch (err) {
        console.error("Guestbook submit failed:", err)

        setSubmitState(
          err instanceof Error ? err.message : "Failed to submit message"
        )

        throw err
      }
    },
    [getToken]
  )

  return (
    <div>
      <section className="pt-28 min-h-screen flex flex-col justify-center">
        {/* Header Section */}
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center justify-center text-center">
            <p className="mb-5 text-[11px] sm:text-xs font-medium uppercase tracking-[0.3em] sm:tracking-[0.35em] text-zinc-500">
              the wall remembers
            </p>
            <h1 className="bg-linear-to-b from-zinc-400 via-zinc-200 to-white bg-clip-text text-4xl sm:text-5xl md:text-6xl text-transparent text-shadow-subtle">
              Words that echo{" "}
              <GradientText
                className="inline-block italic"
                colors={[
                  "#1E40AF", // blue-800
                  "#9333EA", // purple-600
                  "#DB2777", // pink-600
                ]}
                animationSpeed={6}
              >
                always
              </GradientText>
            </h1>
          </div>
        </div>

        {/* Cards Section — Create card first, then every approved entry */}
        <div className="w-full mt-20 px-4 sm:px-6 lg:px-12">
          <div className="grid gap-8 md:grid-cols-3">
            {/* LEAVE YOUR MESSAGE CARD */}
            <div>
              <CreateGuestCard
                onSubmit={handleSubmit}
              />
            </div>

            {/* SKELETON PLACEHOLDERS — shown on first load before entries arrive */}
            {loading &&
              entries.length === 0 &&
              Array.from({ length: 5 }).map((_, i) => (
                <div key={`skeleton-${i}`}>
                  <GuestCardSkeleton />
                </div>
              ))}

            {/* ALL GUEST CARDS */}
            {displayEntries.map((entry) => (
              <div key={entry.id}>
                <GuestCard
                  entry={entry}
                  onShare={handleShare}
                  onDelete={handleDelete}
                  canDelete={Boolean(viewerId) && entry.ownerClerkUserId === viewerId && isWithinDeleteWindow(entry.createdAtIso)}
                  onOpen={(id) => console.log("open", id)}
                />
              </div>
            ))}
          </div>

          <div className="mt-8 text-center text-sm text-zinc-400">
            {!loading && error && <p>{error}</p>}
            {submitState && <p>{submitState}</p>}
            {!loading && !error && entries.length === 0 && (
              <p>Showing featured wall cards while new messages are reviewed.</p>
            )}
            {user && !submitState && (
              <p className="mt-1">Signed in as {user.fullName || user.username || "Guest"}.</p>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}

export default GuestBook;