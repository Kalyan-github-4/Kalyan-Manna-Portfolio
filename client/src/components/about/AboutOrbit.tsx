"use client"

import { useEffect, useRef, useState } from "react"
import { AboutImage } from "./AboutImage"

export function AboutOrbit() {
    const sectionRef = useRef<HTMLDivElement>(null)
    const [progress, setProgress] = useState(0)

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

const expandRadius = progress * 230

    // Define images without hardcoded angles
    const images = [
        {
            id: 1,
            src: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0",
            alt: "Gym"
        },
        {
            id: 2,
            src: "https://images.unsplash.com/photo-1488085061387-422e29b40080?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0",
            alt: "Travel"
        },
        {
            id: 3,
            src: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0",
            alt: "Coding"
        },
        {
            id: 4,
            src: "https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0",
            alt: "Painting"
        },
        {
            id: 5,
            src: "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0",
            alt: "Gaming"
        },
        {
            id: 6,
            src: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0",
            alt: "Leadership"
        },
        {
            id: 7,
            src: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0",
            alt: "Football"
        },
    ]

    return (
        <div className="min-h-[200vh]" ref={sectionRef}>
            <div className="h-screen flex items-center justify-center p-8 sticky top-0">
                <div className="relative">
                    <div
                        className={`w-[450px] h-[450px] rounded-full flex items-center justify-center transition-all duration-500 ${
    progress > 0.3 ? "border-2 border-gray-200 dark:border-gray-700" : ""
}`}
                    >
                        <div
                            className={`w-[360px] h-[360px] rounded-full flex items-center justify-center relative transition-all duration-500 ${progress > 0.1 ? "border-2 border-blue-100 dark:border-blue-800" : ""
                                }`}
                        >
                            <div className="w-[280px] h-[280px] rounded-full bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 dark:from-purple-600 dark:via-pink-600 dark:to-red-600 p-0.5 flex items-center justify-center relative">
                                <div className="w-full h-full rounded-full bg-white dark:bg-black flex items-center justify-center relative">
                                    {/* Map through images with automatic angle calculation */}
                                    {images.map((image, index) => {
                                        // Calculate angle evenly spaced around the circle
                                        const angle = (2 * Math.PI * index) / images.length

                                        return (
                                            <div
                                                key={image.id}
                                                className="absolute w-16 h-16 rounded-2xl overflow-hidden border-4 border-white dark:border-gray-800 shadow-lg transition-transform duration-300 ease-out z-0"
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
                                                    crossOrigin="anonymous"
                                                />
                                            </div>
                                        )
                                    })}

                                    <div
                                        className={`flex flex-col items-center justify-center relative z-20 transition-opacity duration-500 ${
    progress > 0.6 ? "opacity-100" : "opacity-0"
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