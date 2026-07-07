import { motion } from "framer-motion";
import GradientText from "../GradientText";

const fadeUp = {
  hidden: {
    opacity: 0,
    y: 24,
  },
  visible: {
    opacity: 1,
    y: 0,
  },
};

export default function LinksHero() {
  return (
    <div className="relative mb-24 flex min-h-[300px] items-center justify-center text-center">
      <div>
        <motion.p
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.6 }}
          transition={{
            duration: 0.7,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="mb-5 font-mono text-xs font-semibold uppercase tracking-[0.35em] text-white/50"
        >
          Contact Hub
        </motion.p>

        <motion.h1
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.6 }}
          transition={{
            duration: 0.8,
            delay: 0.08,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="bg-linear-to-b from-zinc-400 via-zinc-200 to-white bg-clip-text font-display text-4xl text-transparent sm:text-5xl md:text-6xl lg:text-7xl"
        >
          Connect with{" "}
          <GradientText
            className="inline-block overflow-visible"
            colors={["#1E40AF", "#9333EA", "#DB2777"]}
            animationSpeed={6}
          >
            Me
          </GradientText>
        </motion.h1>

        <motion.p
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.6 }}
          transition={{
            duration: 0.75,
            delay: 0.16,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="mx-auto mt-5 max-w-2xl text-sm leading-7 text-zinc-400 sm:text-base md:text-lg md:leading-8"
        >
          All my important links in one place — GitHub, LinkedIn, email,
          portfolio, guestbook, and ways to reach me for projects or
          collaborations.
        </motion.p>
      </div>
    </div>
  );
}