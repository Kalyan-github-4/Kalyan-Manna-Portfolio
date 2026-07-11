export default function MessagePanel() {
    return (
        <div className="grid min-h-130 gap-8 p-6 sm:p-10 lg:grid-cols-[0.9fr_1.1fr]">
            <div>
                <p className="text-sm uppercase tracking-[0.25em] text-zinc-500">
                    Send Message
                </p>

                <h2 className="mt-4 text-3xl font-semibold text-white">
                    Tell me what you want to build.
                </h2>

                <p className="mt-4 text-sm leading-6 text-zinc-400">
                    Share your idea, project requirements, timeline, or just say
                    hello. I usually reply within a day.
                </p>
            </div>

            <form
                action="mailto:kalyanmanna439@gmail.com"
                method="post"
                encType="text/plain"
                className="space-y-4"
            >
                <input
                    name="name"
                    placeholder="Your name"
                    className="w-full rounded-2xl border border-white/10 bg-white/4 px-4 py-3 text-sm text-white outline-none placeholder:text-zinc-600 focus:border-white/20"
                />

                <input
                    name="email"
                    type="email"
                    placeholder="Your email"
                    className="w-full rounded-2xl border border-white/10 bg-white/4 px-4 py-3 text-sm text-white outline-none placeholder:text-zinc-600 focus:border-white/20"
                />

                <textarea
                    name="message"
                    placeholder="Hey Kalyan, I have a project idea..."
                    className="min-h-40 w-full resize-none rounded-2xl border border-white/10 bg-white/4 px-4 py-3 text-sm text-white outline-none placeholder:text-zinc-600 focus:border-white/20"
                />

                <button
                    type="submit"
                    className="inline-flex items-center justify-center rounded-full bg-white px-5 py-3 text-sm font-semibold text-black transition hover:-translate-y-0.5"
                >
                    Send Message
                </button>
            </form>
        </div>
    )
}