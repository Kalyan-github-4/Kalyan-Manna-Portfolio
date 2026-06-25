export function AboutImage() {
  return (
    <div className="relative mx-auto flex w-48 flex-col items-center lg:mx-0">
      {/* Rotating outer ring */}
      <div
        className="absolute inset-0 rounded-full border-2 animate-[spin_10s_linear_infinite]"
        style={{
          borderColor: "rgba(180,160,255,0.45)",
          boxShadow:
            "0 0 24px rgba(120,90,200,0.35), 0 0 60px rgba(120,90,200,0.18)",
        }}
      />

      {/* Static inner ring */}
      <div className="absolute inset-2 rounded-full border border-violet-300/20" />

      <div className="relative h-48 w-48">
        {/* Purple glow */}
        <div
          className="absolute inset-3 rounded-full blur-3xl"
          style={{
            background:
              "radial-gradient(circle, rgba(120,90,200,0.45) 0%, rgba(42,26,77,0.28) 45%, transparent 75%)",
          }}
        />

        {/* Image */}
        <img
          alt="Kalyan Manna Profile"
          src="/kalyan-manna.jpg"
          className="relative z-10 h-48 w-48 rounded-full object-cover p-4 transition-all duration-500 cursor-pointer"
        />

        {/* Purple overlay */}
        <div className="pointer-events-none absolute inset-4 z-20 rounded-full bg-linear-to-br from-violet-500/15 via-fuchsia-500/10 to-transparent mix-blend-screen" />
      </div>

      <div className="z-99 absolute -bottom-4 left-1/2 inline-flex -translate-x-1/2 items-center gap-2 rounded-full border border-violet-400/20 bg-black px-4 py-2 whitespace-nowrap backdrop-blur-md">
        <span aria-hidden>📍</span>
        <span className="text-[10px] font-semibold uppercase tracking-[0.35em] text-violet-100">
          Kharagpur, India
        </span>
      </div>
    </div>
  )
}