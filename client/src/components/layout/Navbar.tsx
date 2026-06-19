"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { useState } from "react";

interface NavItem {
  name: string;
  href: string;
}

interface NavBarProps {
  items: NavItem[];
  className?: string;
}

export function NavBar({ items, className }: NavBarProps) {
  const [active, setActive] = useState(items[0]?.href);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-6 z-50 px-6 md:px-10",
        className
      )}
    >
      <div className="mx-auto grid max-w-7xl grid-cols-[1fr_auto_1fr] items-center gap-4">
        {/* Logo */}
        <a href="/" className="flex items-center justify-self-start">
          <img
            src="/logo.png"
            alt="Kalyan Manna Logo"
            width={55}
            height={55}
            className="object-contain"
          />
        </a>

        {/* Navbar */}
        <nav className="justify-self-center">
          <div
            className="
              flex items-center gap-2
              rounded-full
              border border-white/10
              bg-zinc-900/70
              p-1.5
              backdrop-blur-2xl
              shadow-[0_0_30px_rgba(255,255,255,0.08)]
            "
          >
            {items.map((item) => {
              const isActive = active === item.href;

              return (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={() => setActive(item.href)}
                  className={cn(
                    "relative flex items-center justify-center rounded-full",
                    "px-6 py-2.5",
                    "text-sm font-medium",
                    "transition-all duration-300",
                    "md:gap-2",
                    // Hover effect on the anchor
                    "hover:text-zinc-100"
                  )}
                >
                  {isActive && (
                    <motion.div
                      layoutId="active-pill"
                      transition={{
                        type: "spring",
                        stiffness: 350,
                        damping: 30,
                      }}
                      className="
                        absolute inset-0 rounded-full
                        border border-white/10
                        bg-linear-to-b
                        from-zinc-600/70
                        to-zinc-700/40
                        shadow-[inset_0_1px_1px_rgba(255,255,255,0.08),0_0_12px_rgba(255,255,255,0.08)]
                      "
                    />
                  )}

                  <span
                    className={cn(
                      "relative z-10 hidden md:block",
                      // Active state takes priority
                      isActive ? "text-white" : "text-zinc-400 group-hover:text-zinc-100"
                    )}
                  >
                    {item.name}
                  </span>
                  {isActive && (
                    <motion.div
                      layoutId="glow"
                      className="absolute -top-1 left-1/2 h-1.5 w-8 -translate-x-1/2 rounded-full bg-zinc-200 opacity-70"
                    />
                  )}
                </a>
              );
            })}
          </div>
        </nav>

        {/* Right Button */}
        <a
          href="#contact"
          className="
            justify-self-end
            rounded-full
            border border-white/10
            bg-zinc-900/70
            px-6 py-3
            text-sm font-medium
            text-white
            backdrop-blur-2xl
            transition
            hover:bg-zinc-800
          "
        >
          Let's Talk
        </a>
      </div>
    </header>
  );
}