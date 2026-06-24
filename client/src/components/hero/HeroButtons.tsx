import { useState } from "react";
import { ArrowRight, Copy, Check } from "@phosphor-icons/react"
export function HeroButtons() {
  const email = "kalyanmanna439@gmail.com";
  const [copied, setCopied] = useState(false);
  // const magneticRef = useMagnetic(0.2);
  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
      setTimeout(() => {
        setCopied(false);
      }, 2000);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
      <button
        
        className="cursor-pointer group relative overflow-hidden inline-flex items-center justify-between rounded-full border border-white/20 bg-white/10 backdrop-blur-xl py-1 pl-5 pr-1 text-sm font-semibold text-white transition-all duration-500"
      >
        {/* Animated Fill */}
        <span className="absolute right-1 top-1/2 h-8 w-8 -translate-y-1/2 rounded-full bg-white transition-all duration-700 ease-[cubic-bezier(.19,1,.22,1)] group-hover:right-0 group-hover:top-0 group-hover:h-full group-hover:w-full group-hover:translate-y-0" />

        {/* Text */}
        <span className="relative z-10 transition-colors duration-500 group-hover:text-slate-900 text-sm">
          Let's Connect
        </span>

        {/* Arrow */}
        <span className="relative z-10 ml-2 flex h-10 w-10 items-center justify-center rounded-full bg-white text-slate-900 transition-transform duration-500 group-hover:translate-x-1">
          <ArrowRight size={14} />
        </span>
      </button>

      <button
        onClick={handleCopy}
        className="group inline-flex items-center gap-2 px-8 py-4 text-sm font-semibold text-zinc-400 transition-all duration-300 hover:text-zinc-300 active:scale-95 cursor-pointer"
      >
        <span className="relative flex h-5 w-5 items-center justify-center ">
          <Copy
            size={18}
            className={`absolute transition-all duration-300 ${copied
                ? "scale-0 rotate-90 opacity-0"
                : "scale-100 rotate-0 opacity-100"
              }`}
          />
          <Check
            size={18}
            className={`absolute text-green-400 transition-all duration-300 ${copied
                ? "scale-100 rotate-0 opacity-100"
                : "scale-0 -rotate-90 opacity-0"
              }`}
          />
        </span>
        <span className="transition-all duration-300">
          {copied ? "Copied to clipboard" : email}
        </span>
      </button>
    </div>
  )
}