import GradientText from "../GradientText";
import CreateGuestCard from "./components/CreateGuestCard";
import GuestCard from "./components/GuestCard";
import { sampleEntries } from "./data/sampleEntries";

function GuestBook() {
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
                className="inline-block"
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

        {/* Cards Section */}
        <div className="w-full mt-20 px-4 sm:px-6 lg:px-12">
          {/* First Row - 3 cards: Create card + 2 guest cards */}
          <div className="grid gap-8 md:grid-cols-3">
            {/* LEAVE YOUR MESSAGE CARD */}
            <div>
              <CreateGuestCard authorName="You" authorInitials="Y" />
            </div>

            {/* First 2 GUEST CARDS */}
            {sampleEntries.map((entry) => (
              <div key={entry.id}>
                <GuestCard
                  key={entry.id}
                  entry={entry}
                  onShare={(id) => console.log("share", id)}
                  onOpen={(id) => console.log("open", id)}
                />
              </div>
            ))}
          </div>

          {/* Second Row - 3 guest cards */}
          <div className="grid gap-8 md:grid-cols-3 mt-8">
            {sampleEntries.map((entry) => (
              <GuestCard
                key={entry.id}
                entry={entry}
                onShare={(id) => console.log("share", id)}
                onOpen={(id) => console.log("open", id)}
              />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

export default GuestBook;