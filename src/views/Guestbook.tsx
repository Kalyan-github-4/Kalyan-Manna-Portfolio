"use client"

import { useCallback, useEffect, useMemo, useState } from "react";
import { useAuth, useUser } from "@clerk/clerk-react";

import GradientText, { HEADING_GRADIENT } from "../components/shared/GradientText";
import SilkBackground from "../components/shared/SilkBackground";
import EdgeStripes from "../components/shared/EdgeStripes";
import CreateGuestCard from "../components/guestbook/components/CreateGuestCard";
import { NoteCard, type NoteEntry } from "../components/guestbook/NoteCard";
import { PinNoteDialog } from "../components/guestbook/PinNoteDialog";
import { SignedStrip } from "../components/guestbook/SignedStrip";
import GuestCardSkeleton from "../components/guestbook/components/GuestCardSkeleton";
import {
  createGuestbookEntry,
  deleteMyGuestbookEntry,
  getGuestbookEntries,
  type GuestbookEntryResponse,
} from "@/lib/api";

// The notes that lead the page. Add entry ids here to choose them by hand;
// until then the newest notes long enough to read well fill the row.
const PINNED_IDS: string[] = [
  "ce4106a3-45e3-4e8e-924c-d975c57e988d", // Karthik Subramanian
  "111802a4-5a8e-49bc-a9ad-6e2a9c654819", // Debojit Saha
  "7a6ccd8b-fb6c-4d96-9867-ed1211aefb62", // Neha Arora
  "f7896f68-9678-4d13-8ed9-927ecc49ee31", // Aditya Kumar
    "fc67e41c-f4e1-4bd2-8338-d73903bceb1a", // Ankit Mishra

];
const PINNED_COUNT = 4;

// The faces on the signed strip, in order (phones show the first three).
// Empty falls back to the newest notes that have a profile image.
const STRIP_FACE_IDS: string[] = [
  "111802a4-5a8e-49bc-a9ad-6e2a9c654819", // Debojit Saha
  "6c9c2fa0-ad34-462a-b758-ab4d6ad3fda0", // Meera Pillai
  "ce4106a3-45e3-4e8e-924c-d975c57e988d", // Karthik Subramanian
  "7a6ccd8b-fb6c-4d96-9867-ed1211aefb62", // Neha Arora
  "4874df88-a0b9-424c-b91d-5b8b8a325843", // Riya Kapoor
  "c5ef1a38-d4d4-4a62-9444-6584928d28a5", // Saurav Ghosh
  "3c22f00e-d5ca-41b5-b9b8-0044d37a0e05", // Aarav Sharma
];
const PINNED_MIN_LENGTH = 40;

function mapEntryToCard(entry: GuestbookEntryResponse): NoteEntry {
  return {
    id: entry.id,
    message: entry.message,
    author: entry.user?.name || "Guest",
    imageUrl: entry.user?.imageUrl ?? null,
    date: new Date(entry.createdAt).toLocaleDateString("en-US", {
      month: "short",
      day: "2-digit",
      year: "numeric",
    }),
    createdAtIso: entry.createdAt,
    ownerClerkUserId: entry.user?.clerkUserId ?? null,
  };
}

function SectionLabel({ children }: { children: string }) {
  return (
    <h2 className="mb-8 font-mono text-[0.7rem] font-semibold uppercase tracking-[0.2em] text-zinc-400">
      {children}
    </h2>
  );
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

  const [entries, setEntries] = useState<NoteEntry[]>([]);
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

  const { pinned, wall } = useMemo(() => {
    const chosen = entries.filter((entry) => PINNED_IDS.includes(entry.id));
    const pinned = chosen.length
      ? chosen
      : entries
          .filter((entry) => entry.message.length >= PINNED_MIN_LENGTH)
          .slice(0, PINNED_COUNT);

    return {
      pinned,
      wall: entries.filter((entry) => !pinned.includes(entry)),
    };
  }, [entries]);

  // One stamp per person, for the strip under the heading.
  const faces = useMemo(() => {
    const chosen = STRIP_FACE_IDS.flatMap((faceId) => {
      const entry = entries.find((e) => e.id === faceId);
      return entry?.imageUrl ? [{ id: entry.id, imageUrl: entry.imageUrl }] : [];
    });
    if (chosen.length) return chosen;

    const seen = new Set<string>();

    return entries.flatMap(({ id, imageUrl }) => {
      if (!imageUrl || seen.has(imageUrl)) return [];
      seen.add(imageUrl);
      return [{ id, imageUrl }];
    }).slice(0, 8);
  }, [entries]);

  const canDeleteEntry = (entry: NoteEntry) =>
    Boolean(viewerId) &&
    entry.ownerClerkUserId === viewerId &&
    isWithinDeleteWindow(entry.createdAtIso);

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
    async (message: string) => {
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
            role: "Visitor",
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
      <section className="relative min-h-screen overflow-hidden pb-28 pt-24">
        <SilkBackground />

        <EdgeStripes />

        {/* Header Section */}
        <div className="relative z-10 mx-auto max-w-7xl px-12 sm:px-16 lg:px-8">
          <div className="flex flex-col items-center justify-center text-center">
            <p className="mb-3 font-mono text-xs font-semibold uppercase tracking-[0.35em] text-white/50">
              the wall remembers
            </p>
            <h1 className="bg-linear-to-b from-zinc-400 via-zinc-200 to-white bg-clip-text font-display text-4xl text-transparent text-shadow-subtle sm:text-5xl md:text-6xl lg:text-7xl">
              Words that echo{" "}
              <GradientText
                className="inline-block italic"
                colors={HEADING_GRADIENT}
                animationSpeed={6}
              >
                always
              </GradientText>
            </h1>

            <SignedStrip faces={faces} noteCount={entries.length} loading={loading}>
              <PinNoteDialog onSubmit={handleSubmit} />
            </SignedStrip>
          </div>
        </div>

        <div className="relative z-10 mt-14 w-full pl-12 pr-9 sm:pl-16 sm:pr-13 lg:pl-20 lg:pr-18">
          {/* Shown while loading too, so the pinned row is already in place
              and doesn't push the wall down when the notes arrive. */}
          {(loading || pinned.length > 0) && (
            <section aria-label="Pinned notes" aria-busy={loading} className="mb-16">
              <SectionLabel>Pinned</SectionLabel>

              <div className="grid items-start gap-x-8 gap-y-12 md:grid-cols-2 xl:grid-cols-4">
                {loading &&
                  Array.from({ length: PINNED_COUNT }, (_, i) => (
                    <GuestCardSkeleton key={`pinned-skeleton-${i}`} lines={5} />
                  ))}

                {pinned.map((entry) => (
                  <NoteCard
                    key={entry.id}
                    entry={entry}
                    pinned
                    onShare={handleShare}
                    onDelete={handleDelete}
                    canDelete={canDeleteEntry(entry)}
                  />
                ))}
              </div>
            </section>
          )}

          <section aria-label="The wall" aria-busy={loading}>
            <SectionLabel>The wall</SectionLabel>

            {/* Newspaper columns give the uneven, pinned-up look; pt leaves room
                for whatever a note is fastened with. */}
            <div className="columns-1 gap-8 md:columns-2 lg:columns-3">
              <div id="leave-your-mark" className="mb-10 scroll-mt-28 break-inside-avoid pt-4">
                <CreateGuestCard onSubmit={handleSubmit} />
              </div>

              {loading &&
                Array.from({ length: 5 }).map((_, i) => (
                  <div key={`skeleton-${i}`} className="mb-10 break-inside-avoid pt-5">
                    <GuestCardSkeleton />
                  </div>
                ))}

              {wall.map((entry) => (
                <div key={entry.id} className="mb-10 break-inside-avoid pt-5">
                  <NoteCard
                    entry={entry}
                    onShare={handleShare}
                    onDelete={handleDelete}
                    canDelete={canDeleteEntry(entry)}
                  />
                </div>
              ))}
            </div>
          </section>

          <div className="mt-8 text-center text-sm text-zinc-400">
            {!loading && error && <p>{error}</p>}
            {submitState && <p>{submitState}</p>}
            {!loading && !error && entries.length === 0 && (
              <p>No notes yet. Be the first to pin one.</p>
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