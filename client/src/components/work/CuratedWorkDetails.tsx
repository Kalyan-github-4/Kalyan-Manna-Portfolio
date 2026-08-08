import { Sparkle } from "@phosphor-icons/react"

import WorkTechPill from "./WorkTechPill"
import type { CuratedProject } from "./curatedWork"

type CuratedWorkDetailsProps = {
    project: CuratedProject
}

/** The write-up beside the banner — title, blurb, highlights, stack. */
export default function CuratedWorkDetails({ project }: CuratedWorkDetailsProps) {
    return (
        <div>
            <div className="flex items-center gap-4">
                <span
                    className="h-0.5 w-7"
                    style={{ backgroundColor: project.mark }}
                />

                <h3 className="font-serif text-3xl font-semibold tracking-tight text-white sm:text-4xl">
                    {project.title}
                </h3>
            </div>

            <p className="mt-2 max-w-2xl text-sm leading-7 text-zinc-400 sm:mt-4 sm:text-base sm:leading-8">
                {project.description}
            </p>

            {project.highlights.length > 0 && (
                <ul className="mt-4 space-y-3 sm:mt-7 sm:space-y-3.5">
                    {project.highlights.map((highlight) => (
                        <li key={highlight} className="flex gap-3.5">
                            <Sparkle
                                size={17}
                                weight="fill"
                                aria-hidden="true"
                                style={{ color: project.mark }}
                                className="mt-1 shrink-0"
                            />

                            <span className="text-sm leading-6 text-zinc-300 sm:text-base sm:leading-7">
                                {highlight}
                            </span>
                        </li>
                    ))}
                </ul>
            )}

            <div className="mt-7 flex flex-wrap gap-2.5 sm:mt-8">
                {project.tags.map((tag) => (
                    <WorkTechPill key={tag} label={tag} />
                ))}
            </div>
        </div>
    )
}
