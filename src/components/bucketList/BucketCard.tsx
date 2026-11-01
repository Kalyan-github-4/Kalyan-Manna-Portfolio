"use client"

import Image from "next/image"
import { CheckCircle } from "@phosphor-icons/react"
import { motion, useReducedMotion } from "framer-motion"

import { cn } from "@/lib/utils"
import type { BucketItem } from "@/data/bucketListData"

const EASE = [0.22, 1, 0.36, 1] as const

interface BucketCardProps {
    item: BucketItem
    /** Position across the whole list — shown on the card */
    number: number
    /** Position within its section — staggers the entry */
    index: number
}

export function BucketCard({ item, number, index }: BucketCardProps) {
    const reduceMotion = useReducedMotion()

    return (
        <motion.article
            initial={{ opacity: 0, y: reduceMotion ? 0 : 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.7, delay: (index % 4) * 0.06, ease: EASE }}
            className={cn(
                "group relative h-80 overflow-hidden rounded-3xl border border-white/10 bg-zinc-950 transition-colors duration-500 hover:border-white/25",
                item.wide && "sm:col-span-2"
            )}
        >
            <Image
                src={item.image}
                alt=""
                fill
                sizes={
                    item.wide
                        ? "(min-width:1024px) 50vw, 100vw"
                        : "(min-width:1024px) 25vw, (min-width:640px) 50vw, 100vw"
                }
                className="object-cover transition-transform duration-900 ease-out group-hover:scale-105"
            />

            <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 bg-linear-to-t from-black via-black/30 to-black/50"
            />

            <div className="absolute inset-x-0 top-0 flex items-center justify-between p-5">
                <span className="font-mono text-[0.7rem] font-semibold tracking-[0.15em] text-white/70">
                    {String(number).padStart(2, "0")}
                </span>

                {item.doneOn && (
                    <span className="inline-flex items-center gap-1.5 rounded-md bg-amber-300 px-2 py-1 text-xs font-semibold text-zinc-950">
                        <CheckCircle size={12} weight="fill" aria-hidden="true" />
                        Done · {item.doneOn}
                    </span>
                )}
            </div>

            {/* Headings are globally serif on this site; cards use the sans face. */}
            <div className="absolute inset-x-0 bottom-0 p-5">
                <h3 className="font-sans text-xl font-semibold leading-tight text-white">
                    {item.title}
                </h3>

                {item.note && (
                    <p className="mt-1.5 text-sm leading-relaxed text-zinc-300">
                        {item.note}
                    </p>
                )}
            </div>
        </motion.article>
    )
}
