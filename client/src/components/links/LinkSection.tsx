import { motion } from "framer-motion";
import ContactLinkCard from "./ContactLinkCard";
import type { ContactSection } from "./linksData";

type LinkSectionProps = {
  section: ContactSection;
  sectionIndex: number;
};

export default function LinkSection({ section, sectionIndex }: LinkSectionProps) {
  return (
    <div>
      <div className="mb-8 flex items-center gap-4">
        <motion.p
          initial={{ opacity: 0, x: -18 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: false, amount: 0.5 }}
          transition={{
            duration: 0.6,
            delay: sectionIndex * 0.08,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="font-mono text-xs font-semibold uppercase tracking-[0.25em] text-zinc-600"
        >
          {section.title}
        </motion.p>

        <div className="h-px flex-1 border-t border-dashed border-white/10" />
      </div>

      <div className="grid gap-5 md:grid-cols-2">
        {section.links.map((item, index) => (
          <ContactLinkCard
            key={item.title}
            item={item}
            index={index + sectionIndex * 2}
          />
        ))}
      </div>
    </div>
  );
}