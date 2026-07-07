import { motion } from "framer-motion";
import { ArrowUpRight } from "@phosphor-icons/react";
import { profileInfo, profileMeta, quickActions } from "./linksData";

export default function ProfileCard() {
    return (
        <motion.aside
            initial={{ opacity: 0, x: -36 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: false, amount: 0.35 }}
            transition={{
                duration: 0.8,
                ease: [0.22, 1, 0.36, 1],
            }}
            className="rounded-[28px] border border-white/10 bg-white/[0.04] p-7 backdrop-blur-2xl"
        >
            <div className="flex flex-col items-center text-center">
                <div className="relative">
                    <div className="h-28 w-28 overflow-hidden rounded-full border-4 border-white/5 bg-zinc-900 p-1">
                        <img
                            src={profileInfo.image}
                            alt={profileInfo.name}
                            className="h-full w-full rounded-full object-cover"
                        />
                    </div>

                    <span className="absolute bottom-3 right-2 h-5 w-5 rounded-full border-4 border-zinc-900 bg-emerald-500" />
                </div>

                <h2 className="mt-7 font-serif text-3xl font-semibold text-white">
                    {profileInfo.name}
                </h2>

                <div className="mt-4 flex flex-wrap justify-center gap-2">
                    <span className="rounded-full border border-white/10 bg-white/10 px-3 py-1 font-mono text-xs font-semibold text-zinc-300">
                        {profileInfo.role}
                    </span>

                    <span className="rounded-full border border-white/10 bg-white/10 px-3 py-1 font-mono text-xs font-semibold text-zinc-300">
                        {profileInfo.tag}
                    </span>
                </div>
            </div>

            <div className="my-8 border-t border-dashed border-white/40" />

            <div className="space-y-5">
                {profileMeta.map((meta) => {
                    const Icon = meta.icon;

                    return (
                        <div
                            key={meta.label}
                            className="flex items-center gap-4 text-sm text-zinc-400"
                        >
                            <Icon size={18} className="shrink-0 text-zinc-500" />
                            <span>{meta.label}</span>
                        </div>
                    );
                })}
            </div>

            <div className="mt-8 space-y-3">
                    <div className="mt-8 space-y-4">
                        <a
                            href={quickActions[0].href}
                            className="group flex items-center justify-between rounded-xl bg-white px-4 py-3 text-sm font-semibold text-black transition hover:bg-zinc-200"
                        >
                            <span className="flex items-center gap-3">
                                {(() => {
                                    const Icon = quickActions[0].icon;
                                    return <Icon size={17} />;
                                })()}
                                {quickActions[0].label}
                            </span>

                            <ArrowUpRight
                                size={16}
                                className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                            />
                        </a>

                        <div className="grid grid-cols-2 gap-4">
                            {quickActions.slice(1).map((action) => {
                                const Icon = action.icon;

                                return (
                                    <a
                                        key={action.label}
                                        href={action.href}
                                        className="group flex items-center justify-center gap-3 rounded-xl border border-white/10 bg-white/4 px-4 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
                                    >
                                        <Icon size={17} />
                                        {action.label}
                                    </a>
                                );
                            })}
                        </div>
                    </div>
            </div>
        </motion.aside>
    );
}