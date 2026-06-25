"use client"

import { useEffect, useRef, useState } from "react"
import { AboutImage } from "./AboutImage"
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip"

export function AboutOrbit() {
    const sectionRef = useRef<HTMLDivElement>(null)
    const [progress, setProgress] = useState(0)
    const [orbitRadius, setOrbitRadius] = useState(230)

    useEffect(() => {
        const handleScroll = () => {
            if (!sectionRef.current) return

            const rect = sectionRef.current.getBoundingClientRect()
            const viewportHeight = window.innerHeight

            // Start when the section reaches the center of the viewport
            const start = viewportHeight * 0.6
            const end = -300

            const value = (start - rect.top) / (start - end)

            setProgress(Math.max(0, Math.min(1, value)))
        }

        handleScroll()
        window.addEventListener("scroll", handleScroll)
        return () => window.removeEventListener("scroll", handleScroll)
    }, [])

    useEffect(() => {
        const updateRadius = () => {
            if (window.innerWidth < 640) {
                setOrbitRadius(150)
            } else if (window.innerWidth < 768) {
                setOrbitRadius(180)
            } else if (window.innerWidth < 1024) {
                setOrbitRadius(200)
            } else {
                setOrbitRadius(230)
            }
        }

        updateRadius()
        window.addEventListener("resize", updateRadius)

        return () => window.removeEventListener("resize", updateRadius)
    }, [])

    const expandRadius = progress * orbitRadius

    // Define images without hardcoded angles
    const images = [
        {
            id: 1,
            title: "I Code",
            alt: "Coding",
            src: "https://images.unsplash.com/photo-1515879218367-8466d910aaa4?w=900&auto=format&fit=crop&q=80",
        },
        {
            id: 2,
            title: "I Lift",
            alt: "Gym",
            src: "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=900&auto=format&fit=crop&q=80",
        },
        {
            id: 3,
            title: "I Explore",
            alt: "Travel",
            src: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=900&auto=format&fit=crop&q=80",
        },
        {
            id: 4,
            title: "I Draw",
            alt: "Drawing",
            src: "https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=900&auto=format&fit=crop&q=80",
        },
        {
            id: 5,
            title: "I Play",
            alt: "Gaming",
            src: "https://images.unsplash.com/photo-1606144042614-b2417e99c4e3?w=900&auto=format&fit=crop&q=80",
        },
        {
            id: 6,
            title: "I Run",
            alt: "Running",
            src: "https://images.unsplash.com/photo-1552674605-db6ffd4facb5?w=900&auto=format&fit=crop&q=80",
        },
        {
            id: 7,
            title: "I Create",
            alt: "Creative Workspace",
            src: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=900&auto=format&fit=crop&q=80",
        },
    ]

    return (
        <div className="min-h-[160vh] sm:min-h-[180vh] lg:min-h-[200vh]" ref={sectionRef}>
            <div className="sticky top-0 flex h-screen items-center justify-center p-4 sm:p-6 md:p-8"
            >
                <div className="relative">
                    <div
                        className={`w-[280px] h-[280px] sm:w-[340px] sm:h-[340px] md:w-[420px] md:h-[420px] lg:w-[450px] lg:h-[450px] rounded-full flex items-center justify-center transition-all duration-500 ${progress > 0.3 ? "border-2 border-gray-200 dark:border-gray-700" : ""
                            }`}
                    >
                        <div
                            className={`w-[220px] h-[220px] sm:w-[280px] sm:h-[280px] md:w-[340px] md:h-[340px] lg:w-[360px] lg:h-[360px] rounded-full flex items-center justify-center relative transition-all duration-500 ${progress > 0.1 ? "border-2 border-blue-100 dark:border-blue-800" : ""
                                }`}
                        >
                            <div className="w-[180px] h-[180px] sm:w-[220px] sm:h-[220px] md:w-[260px] md:h-[260px] lg:w-[280px] lg:h-[280px] rounded-full bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 dark:from-purple-600 dark:via-pink-600 dark:to-red-600 p-0.5 flex items-center justify-center relative">
                                <div className="w-full h-full rounded-full bg-white dark:bg-black flex items-center justify-center relative">
                                    {/* Map through images with automatic angle calculation */}
                                    {images.map((image, index) => {
                                        // Calculate angle evenly spaced around the circle
                                        const angle = (2 * Math.PI * index) / images.length

                                        return (
                                            <TooltipProvider key={image.id}>
                                                <Tooltip delayDuration={100}>
                                                    <TooltipTrigger asChild>
                                                        <div
                                                            className="absolute w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 lg:w-16 lg:h-16 rounded-2xl overflow-hidden border-4 border-white dark:border-gray-800 shadow-xl transition-all duration-300 hover:scale-105 hover:-translate-y-1 hover:shadow-violet-300/10 cursor-pointer"
                                                            style={{
                                                                    transform: `translate(
                                                                    ${expandRadius * Math.cos(angle)}px,
                                                                    ${expandRadius * Math.sin(angle)}px
                                                                )`,
                                                            }}
                                                        >
                                                            <img
                                                                src={image.src}
                                                                alt={image.alt}
                                                                className="w-full h-full object-cover"
                                                            />
                                                        </div>
                                                    </TooltipTrigger>

                                                    <TooltipContent
                                                        side="top"
                                                        className="text-zinc-700  text-xs font-semibold"
                                                    >
                                                        {image.title}
                                                    </TooltipContent>
                                                </Tooltip>
                                            </TooltipProvider>
                                        )
                                    })}

                                    <div
                                        className={`flex flex-col items-center justify-center relative z-20 transition-opacity duration-500 ${progress > 0.6 ? "opacity-100" : "opacity-0"
                                            }`}
                                    >
                                        <AboutImage />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}