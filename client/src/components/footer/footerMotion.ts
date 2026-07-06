export const fadeUp = {
    hidden: {
        opacity: 0,
        y: 34,
        filter: "blur(8px)",
    },
    visible: (custom = 0) => ({
        opacity: 1,
        y: 0,
        filter: "blur(0px)",
        transition: {
            duration: 0.8,
            delay: custom * 0.12,
            ease: [0.22, 1, 0.36, 1] as const,
        },
    }),
}

export const fadeScale = {
    hidden: {
        opacity: 0,
        scale: 0.96,
        filter: "blur(10px)",
    },
    visible: {
        opacity: 1,
        scale: 1,
        filter: "blur(0px)",
        transition: {
            duration: 1,
            ease: [0.22, 1, 0.36, 1] as const,
        },
    },
}

export const staggerContainer = {
    hidden: {},
    visible: {
        transition: {
            staggerChildren: 0.1,
            delayChildren: 0.1,
        },
    },
}

export const linkItem = {
    hidden: {
        opacity: 0,
        x: -16,
    },
    visible: {
        opacity: 1,
        x: 0,
        transition: {
            duration: 0.55,
            ease: [0.22, 1, 0.36, 1] as const,
        },
    },
}