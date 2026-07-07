import { motion } from "framer-motion";
import { ArrowUpRight } from "@phosphor-icons/react";
import { Link } from "react-router-dom";
import type { ContactLink } from "./linksData";

type ContactLinkCardProps = {
  item: ContactLink;
  index: number;
};

export default function ContactLinkCard({ item, index }: ContactLinkCardProps) {
  const Icon = item.icon;

  const content = (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: false, amount: 0.35 }}
      transition={{
        duration: 0.65,
        delay: index * 0.05,
        ease: [0.22, 1, 0.36, 1],
      }}
      whileHover={{
        y: -5,
      }}
      className="group relative flex min-h-[104px] items-center justify-between overflow-hidden rounded-2xl border border-white/10 bg-white/[0.025] p-5 backdrop-blur-xl transition-colors hover:bg-white/[0.055]"
    >
      <div className="absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(147,51,234,0.16),transparent_38%)]" />
      </div>

      <div className="relative z-10 flex items-center gap-5">
        <div className="flex h-14 w-14 items-center justify-center rounded-xl border border-white/10 bg-white/10 text-zinc-300 transition-colors group-hover:text-white">
          <Icon size={24} weight="regular" />
        </div>

        <div>
          <h3 className="text-base font-medium tracking-wide text-white">{item.title}</h3>
          <p className="mt-1 font-mono text-xs font-semibold text-zinc-500">
            {item.subtitle}
          </p>
        </div>
      </div>

      <ArrowUpRight
        size={18}
        className="relative z-10 text-zinc-600 opacity-0 transition-all duration-300 group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-white group-hover:opacity-100"
      />
    </motion.div>
  );

  if (item.external) {
    return (
      <a href={item.href} target="_blank" rel="noreferrer">
        {content}
      </a>
    );
  }

  return <Link to={item.href}>{content}</Link>;
}