export const diagonalStripeStyle = {
    backgroundImage:
        "repeating-linear-gradient(45deg, rgba(255,255,255,0.125) 0px, rgba(255,255,255,0.125) 1px, transparent 1px, transparent 4px)",
    // Pins the hatching to the viewport so it holds still while the page scrolls.
    backgroundAttachment: "fixed",
}

export const faintDiagonalStripeStyle = {
    backgroundImage:
        "linear-gradient(145deg, rgba(255,255,255,0.03) 0%, rgba(0,0,0,0.4) 100%), repeating-linear-gradient(135deg, rgba(255,255,255,0.04) 0px, rgba(255,255,255,0.04) 1px, transparent 1px, transparent 2px)",
}

export const ghostDiagonalStripeStyle = {
    backgroundImage:
        "linear-gradient(145deg, rgba(255,255,255,0.015) 0%, rgba(0,0,0,0.2) 100%), repeating-linear-gradient(135deg, rgba(255,255,255,0.02) 0px, rgba(255,255,255,0.02) 1px, transparent 1px, transparent 2px)",
}

export const denseDiagonalStripeStyle = {
    backgroundImage:
        "linear-gradient(145deg, rgba(255,255,255,0.08) 0%, rgba(0,0,0,0.4) 100%), repeating-linear-gradient(135deg, rgba(255,255,255,0.1) 0px, rgba(255,255,255,0.1) 1px, transparent 1px, transparent 3px)",
}
