// Shared timing for the bento grid. Kept in one place so every tile enters on
// the same curve — the grid should read as one object settling, not five.
export const BENTO_EASE = [0.22, 1, 0.36, 1] as const

export const bentoFadeUp = {
  hidden: { opacity: 0, y: 32 },
  visible: (index = 0) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      delay: 0.08 * index,
      ease: BENTO_EASE,
    },
  }),
}
