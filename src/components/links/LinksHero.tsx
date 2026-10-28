"use client"

import { motion } from "framer-motion";
import GradientText from "../shared/GradientText";

export default function LinksHero() {
  return (
    <motion.h2
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      className="relative z-10 mx-auto mb-16 max-w-xl text-center"
    >
      <span className="mb-4 block font-mono text-xs font-normal uppercase tracking-widest text-white/70">
        Network
      </span>
      <span className="inline-block bg-linear-to-b from-zinc-400 via-zinc-200 to-white bg-clip-text font-display text-5xl tracking-tight text-transparent md:text-6xl">
        Connect With{" "}
        <GradientText
          className="inline-block overflow-visible italic"
          colors={["#1E40AF", "#9333EA", "#DB2777"]}
          animationSpeed={6}
        >
          Me
        </GradientText>
      </span>
    </motion.h2>
  );
}
