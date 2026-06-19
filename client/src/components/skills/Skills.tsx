import { SkillBadge } from "@/home/skills/SkillBadge"

const skills = [
  { label: "React.js", size: "sm" as const, logo: "⚛️" },
  { label: "TypeScript", size: "lg" as const, accent: true, logo: "📘" },
  { label: "Next.js", size: "sm" as const, logo: "▲" },
  { label: "Tailwind CSS", size: "md" as const, logo: "🌊" },
  { label: "Node.js", size: "xl" as const, logo: "🟢" },
  { label: "PostgreSQL", size: "sm" as const, logo: "🐘" },
  { label: "GraphQL", size: "md" as const, logo: "⚡" },
  { label: "Redis", size: "sm" as const, logo: "🔴" },
  { label: "Docker", size: "md" as const, logo: "🐳" },
  { label: "AWS", size: "sm" as const, logo: "☁️" },
  { label: "Framer Motion", size: "lg" as const, accent: true, logo: "🎬" },
  { label: "Prisma", size: "sm" as const, logo: "🔮" },
]

// Duplicate skills for seamless infinite scroll
const duplicatedSkills = [...skills, ...skills, ...skills]

export default function Skills() {
  return (
    <section id="skills" className="bg-card/30 py-28 overflow-hidden">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-10 text-center">
          <p className="mb-2 text-xs font-semibold uppercase tracking-[0.35em] text-primary">Technical Stack</p>
          <h2 className="text-4xl md:text-5xl">What I Work With</h2>
        </div>
        
        {/* Scrolling container */}
        <div className="relative w-full">
          <style jsx>{`
            @keyframes scrollRightToLeft {
              0% {
                transform: translateX(0);
              }
              100% {
                transform: translateX(-50%);
              }
            }
            .scroll-track {
              animation: scrollRightToLeft 30s linear infinite;
              width: max-content;
            }
            .scroll-track:hover {
              animation-play-state: paused;
            }
          `}</style>
          
          <div className="scroll-track flex gap-4">
            {duplicatedSkills.map((skill, index) => (
              <SkillBadge 
                key={`${skill.label}-${index}`} 
                label={skill.label} 
                size={skill.size} 
                accent={skill.accent}
                logo={skill.logo}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}