"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { CaretDown } from "@phosphor-icons/react";
import { AnimatePresence } from "framer-motion";
import { MoreMenu } from "./MoreMenu";
import { Link } from "react-router-dom";
import { Drawer, DrawerContent, DrawerTrigger } from "../ui/drawer";
interface NavItem {
  name: string;
  href: string;
  hasDropdown?: boolean;
}

interface NavBarProps {
  items: NavItem[];
  className?: string;
}

export function NavBar({ items, className }: NavBarProps) {
  const [active, setActive] = useState(items[0]?.href);
  const [moreOpen, setMoreOpen] = useState(false);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-6 z-50 px-4 md:px-10",
        className
      )}
    >
      {/* Desktop */}
      <div className="hidden md:grid mx-auto max-w-7xl grid-cols-[1fr_auto_1fr] items-start gap-4">
        {/* Logo */}
        <Link to="/" className="flex items-center justify-self-start">
          <img
            src="/logo-white.png"
            alt="Kalyan Manna Logo"
            width={55}
            height={55}
            className="object-contain"
          />
        </Link>

        {/* Navbar */}
        <motion.div
          layout
          animate={{
            width: moreOpen ? 800 : 465,
          }}
          transition={{
            type: "spring",
            stiffness: 300,
            damping: 30,
          }}
          onMouseLeave={() => setMoreOpen(false)}
          className="
            overflow-hidden
            rounded-[30px]
            border border-white/10
            bg-zinc-900/70
            backdrop-blur-2xl
            shadow-[0_0_30px_rgba(255,255,255,0.08)]
          ">
          <div className="flex items-center justify-center p-1.5">
            {items
              .map((item) => {
                const isActive = !item.hasDropdown && active === item.href;

                return (
                  <Link
                    key={item.href}
                    to={item.href}
                    onClick={() => {
                      if (item.hasDropdown) {
                        setMoreOpen((prev) => !prev);
                        return;
                      }

                      setActive(item.href);
                    }}
                    onMouseEnter={() => {
                      if (item.hasDropdown && !moreOpen) {
                        setMoreOpen(true);
                      }
                    }}
                    className={cn(
                      "relative flex items-center justify-center rounded-[30px]",
                      "px-6 py-2.5",
                      "text-sm font-medium",
                      "transition-all duration-300",
                      "md:gap-2",
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
                        "hover:text-zinc-100",
                        "transition-colors duration-300",
                        // Active state takes priority
                        isActive ? "text-white" : "text-zinc-400 "
                      )}
                    >
                      {item.name}
                    </span>
                    {item.hasDropdown && (
                      <motion.div
                        animate={{
                          rotate: moreOpen ? 180 : 0,
                        }}
                      >
                        <CaretDown
                          size={14}
                          className="relative z-10 text-zinc-400"
                        />
                      </motion.div>
                    )}
                    {isActive && (
                      <motion.div
                        layoutId="glow"
                        className="absolute -top-1 left-1/2 h-1.5 w-8 -translate-x-1/2 rounded-full bg-zinc-200 opacity-70"
                      />
                    )}
                  </Link>
                );
              })}
          </div>

          {/* Expandable Area */}
          <AnimatePresence>
            {moreOpen && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.25 }}
                className="overflow-hidden border-t border-white/10"
              >
                <MoreMenu />
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Right Button */}
        <Link
          to="#contact"
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
        </Link>
      </div>
      <div className="flex justify-center md:hidden">
        <Drawer>
          <DrawerTrigger asChild>
            <button
              className="
                flex
                w-3/5
                max-w-sm
                items-center
                justify-around
                gap-3
                rounded-full
                border
                border-white/10
                bg-zinc-900/70
                
                backdrop-blur-2xl
              "
            >
              <img
                src="/logo-white.png"
                alt="Logo"
                className="h-10 w-10"
              />

              <span className="font-medium text-white uppercase">
                Kalyan
              </span>
            </button>
          </DrawerTrigger>

          <DrawerContent
            className="
            max-h-[80vh]
            max-w-sm
            overflow-y-auto
            rounded-3xl
            border-white/10
            bg-zinc-900/90
            backdrop-blur-3xl
          "
          >
            <div className="space-y-4">

              <h2 className="text-center text-xl font-semibold text-white">
                Navigation
              </h2>

              <div className="grid grid-cols-2 gap-3">

                {items
                .filter((item) => !item.hasDropdown)
                .map((item) => (
                  <Link
                    key={item.href}
                    to={item.href}
                    className="
                      rounded-xl
                      border border-white/10
                      bg-white/5
                      p-4
                      text-center
                      text-zinc-300
                      transition
                      hover:bg-white/10
                    "
                  >
                    {item.name}
                  </Link>
                ))}

              </div>

            </div>
          </DrawerContent>
        </Drawer>
      </div>
    </header>
  );
}