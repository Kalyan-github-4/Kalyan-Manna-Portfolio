import { motion } from "framer-motion"
import { Link } from "react-router-dom"

interface NavbarLogoProps {
  isScrolled: boolean
}

export function NavbarLogo({ isScrolled }: NavbarLogoProps) {
  return (
    <motion.div
      className="flex items-center justify-self-start"
      animate={{
        opacity: isScrolled ? 0 : 1,
        scale: isScrolled ? 0.8 : 1,
        x: isScrolled ? -20 : 0,
      }}
      transition={{
        duration: 0.4,
        ease: "easeInOut",
      }}
      style={{
        pointerEvents: isScrolled ? "none" : "auto",
      }}
    >
      <Link to="/" aria-label="Go to homepage">
        <img
          src="/logo-white.png"
          alt="Kalyan Manna Logo"
          width={55}
          height={55}
          className="object-contain"
        />
      </Link>
    </motion.div>
  )
}