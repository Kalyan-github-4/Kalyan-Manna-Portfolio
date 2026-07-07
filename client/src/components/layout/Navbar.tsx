"use client";

import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { useEffect, useMemo, useState } from "react";
import { CaretDown } from "@phosphor-icons/react";
import { MoreMenu } from "./MoreMenu";
import { Link, useLocation } from "react-router-dom";
import { Drawer, DrawerClose, DrawerContent, DrawerTrigger } from "../ui/drawer";
import type { Icon } from "@phosphor-icons/react";
import {
  House,
  User,
  FolderOpen,
  FileText,
  BookOpen,
  ListChecks,
  Laptop,
  Trophy,
  LinkSimple,
} from "@phosphor-icons/react";

interface NavItem {
  name: string;
  href: string;
  hasDropdown?: boolean;
  items?: NavItem[];
  icon?: Icon;
}

interface NavBarProps {
  items: NavItem[];
  className?: string;
}

// Fallback icon map keyed by href, used if an item doesn't carry its own `icon`.
const FALLBACK_ICONS: Record<string, Icon> = {
  "/": House,
  "/about": User,
  "/work": FolderOpen,
  "/blog": FileText,
  "/more/guestbook": BookOpen,
  "/more/bucket-list": ListChecks,
  "/more/links": LinkSimple,
  "/more/uses": Laptop,
  "/more/attribution": Trophy,
};

function resolveIcon(item: NavItem): Icon {
  return item.icon ?? FALLBACK_ICONS[item.href] ?? FileText;
}

export function NavBar({ items, className }: NavBarProps) {
  const { pathname } = useLocation();
  const [moreOpen, setMoreOpen] = useState(false);
  const [introDone, setIntroDone] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [prevScrollPos, setPrevScrollPos] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  // Scroll detection with show/hide logic
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollPos = window.scrollY;

      // Determine if scrolling down or up
      const isScrollingDown = currentScrollPos > prevScrollPos;

      // Hide navbar when scrolling down and past threshold
      // Show navbar when scrolling up (even slightly)
      if (isScrollingDown && currentScrollPos > 50) {
        setIsVisible(false);
        setIsScrolled(true);
      } else if (!isScrollingDown) {
        setIsVisible(true);
        setIsScrolled(currentScrollPos > 50);
      } else {
        setIsScrolled(currentScrollPos > 50);
      }

      setPrevScrollPos(currentScrollPos);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [prevScrollPos]);

  const greeting = useMemo(() => {
    const hour = new Date().getHours();

    if (hour < 12) {
      return {
        text: "Good Morning",
        icon: "🌅",
      };
    }

    if (hour < 17) {
      return {
        text: "Good Afternoon",
        icon: "☀️",
      };
    }

    return {
      text: "Good Evening",
      icon: "🌙",
    };
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIntroDone(true);
    }, 1800);

    return () => clearTimeout(timer);
  }, []);

  const mobileItems = items.flatMap((item) =>
    item.hasDropdown ? (item.items ?? []) : item
  );

  return (
    <motion.header
      className={cn(
        "fixed inset-x-0 top-6 z-50 px-4 md:px-6 lg:px-8",
        className
      )}
      initial={{ y: 0, opacity: 1 }}
      animate={{
        y: isVisible ? 0 : -120,
        opacity: isVisible ? 1 : 0,
      }}
      transition={{
        duration: 0.3,
        ease: "easeInOut",
      }}
    >
      {/* Desktop */}
      <div className="hidden md:grid w-full grid-cols-[1fr_auto_1fr] items-start gap-4">

        {/* Logo - with scroll visibility */}
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
          <Link to="/">
            <img
              src="/logo-white.png"
              alt="Kalyan Manna Logo"
              width={55}
              height={55}
              className="object-contain"
            />
          </Link>
        </motion.div>

        {/* Navbar */}
        <motion.div
          layout
          animate={{
            width: !introDone ? 250 : moreOpen ? 800 : 465,
          }}
          transition={{
            type: "spring",
            stiffness: 220,
            damping: 26,
          }}
          onMouseLeave={() => setMoreOpen(false)}
          className="
            overflow-hidden
            rounded-[30px]
            border border-white/10
            bg-zinc-950/45
            backdrop-blur-3xl
            backdrop-saturate-150
            shadow-[0_0_30px_rgba(255,255,255,0.08)]
          ">
          <div className="relative flex h-[52px] items-center justify-center overflow-hidden">
            <AnimatePresence mode="wait">
              {!introDone ? (
                <motion.div
                  key="greeting"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{
                    duration: 0.35,
                  }}
                  className="flex items-center gap-3 text-white font-medium">
                  {greeting.icon}
                  <span>{greeting.text}</span>
                </motion.div>
              ) : (
                <motion.div
                  key="navbar"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{
                    staggerChildren: 0.07,
                    delayChildren: 0.05,
                  }}
                  className="flex items-center justify-center p-1.5"
                >
                  {items
                    .map((item) => {
                      const isActive = item.hasDropdown
                        ? pathname.startsWith("/more")
                        : item.href === "/"
                          ? pathname === "/"
                          : pathname.startsWith(item.href);

                      return (
                        <Link
                          key={item.href}
                          to={item.href}
                          onClick={() => {
                            if (item.hasDropdown) {
                              setMoreOpen((prev) => !prev);
                            }
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
                </motion.div>
              )}
            </AnimatePresence>
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

        {/* Right Button - with scroll visibility */}
        <motion.div
          className="h-[52px] flex items-center justify-end"
          animate={{
            opacity: isScrolled ? 0 : 1,
            scale: isScrolled ? 0.8 : 1,
            x: isScrolled ? 20 : 0,
          }}
          transition={{
            duration: 0.4,
            ease: "easeInOut",
          }}
          style={{
            pointerEvents: isScrolled ? "none" : "auto",
          }}
        >
          <button
            className="
              self-center justify-self-end items-center
              rounded-full border border-white/10
              bg-zinc-950/45
              px-4 py-2
              text-xs font-medium text-white
              backdrop-blur-3xl backdrop-saturate-150
              transition hover:bg-zinc-800/70
              bg-linear-to-b from-zinc-600/50 to-zinc-700/30
              shadow-[inset_0_1px_1px_rgba(255,255,255,0.08),0_0_12px_rgba(255,255,255,0.08)]
              cursor-pointer
            "
          >
            Book a Call
          </button>
        </motion.div>
      </div>

      {/* Mobile */}
      <div className="flex justify-center md:hidden cursor-pointer">
        <Drawer>
          <DrawerTrigger asChild>
            <motion.button
              whileTap={{ scale: 0.96 }}
              className="
          flex items-center gap-20
          rounded-full border border-white/10
          bg-zinc-950/45 backdrop-blur-3xl backdrop-saturate-150
          px-3 py-1.5
          shadow-[inset_0_1px_1px_rgba(255,255,255,0.08),0_0_20px_rgba(255,255,255,0.06)]
        "
            >
              <img
                src="/logo-white.png"
                alt="Logo"
                className="h-8 w-8 object-contain"
              />
              <span className="pr-1 text-sm font-semibold uppercase tracking-wide text-white">
                Kalyan
              </span>
            </motion.button>
          </DrawerTrigger>

          <DrawerContent
            className="mx-auto w-[88vw] max-w-sm rounded-3xl border border-white/10 bg-zinc-900/90 backdrop-blur-3xl pb-4 "
          >
            <div className="space-y-5 px-5 pt-2">
              <h2 className="text-center text-base font-medium text-zinc-400">
                Navigate
              </h2>

              <div className="grid grid-cols-2 gap-3">
                {mobileItems.map((item) => {
                  const isActive =
                    item.href === "/"
                      ? pathname === "/"
                      : pathname.startsWith(item.href);
                  const ItemIcon = resolveIcon(item);

                  return (
                    <DrawerClose asChild key={item.href}>
                      <Link
                        to={item.href}
                        className={cn(
                          "flex items-center gap-3 rounded-2xl p-2 transition-colors",
                          isActive
                            ? "bg-white/10 text-white"
                            : "text-zinc-300 hover:bg-white/10 hover:text-white"
                        )}
                      >
                        <span
                          className={cn(
                            "flex h-9 w-9 shrink-0 items-center justify-center rounded-xl",
                            isActive ? "bg-white/15" : "bg-white/5"
                          )}
                        >
                          <ItemIcon size={16} weight="regular" />
                        </span>

                        <div className="flex flex-1 items-center justify-between">
                          <span className="text-xs font-medium">{item.name}</span>

                          {isActive && (
                            <motion.span
                              layoutId="mobile-active-dot"
                              animate={{
                                boxShadow: [
                                  "0 0 6px rgba(255,255,255,0.5)",
                                  "0 0 12px rgba(255,255,255,0.9)",
                                  "0 0 6px rgba(255,255,255,0.5)",
                                ],
                              }}
                              transition={{
                                duration: 2,
                                repeat: Infinity,
                                ease: "easeInOut",
                              }}
                              className="mr-2 h-2 w-2 rounded-full bg-white"
                            />
                          )}
                        </div>
                      </Link>
                    </DrawerClose>
                  );
                })}
              </div>
            </div>
          </DrawerContent>
        </Drawer>
      </div>
    </motion.header>
  );
}