export const fadeUp = {
    hidden: {
        opacity: 0,
        y: 40,
    },
    visible: (custom = 0) => ({
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.7,
            delay: 0.15 * custom,
            ease: [0.25, 1, 0.5, 1] as const,
        },
    }),
}