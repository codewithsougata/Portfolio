import React from "react";
import { motion } from "framer-motion";
import { Zap } from "lucide-react";

const cn = (...classes) => classes.filter(Boolean).join(" ");

export default function ChromaSnakeButton({
  children,
  onClick,
  className,
  icon: Icon = Zap,
  showIcon = true
}) {
  return (
    <div
      className={cn(
        "relative group isolate",
        "w-fit mx-auto sm:mx-0",
        "rounded-md",
        "p-[1px]",
        "overflow-hidden cursor-pointer",
        className
      )}
    >
      <motion.div
        animate={{ rotate: 360 }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "linear",
        }}
        className={cn(
          "absolute inset-[-100%] z-[-1]",
          "bg-[conic-gradient(from_0deg_at_50%_50%,transparent_0%,transparent_70%,#06b6d4_80%,#8b5cf6_90%,#ec4899_100%)]",
          "blur-[1px]",
          "group-hover:duration-[1.5s]"
        )}
      />

      <button
        onClick={onClick}
        type="button"
        className={cn(
          "relative z-10 w-full h-full cursor-pointer",
          "flex items-center justify-center gap-2 px-6 py-2.5 sm:px-7 sm:py-3",
          "rounded-md",
          "bg-zinc-950/90 dark:bg-zinc-950",
          "text-white text-sm font-semibold tracking-wide",
          "transition-all duration-300",
          "shadow-[inset_0_0_0_1px_rgba(255,255,255,0.1)]",
          "hover:bg-zinc-900"
        )}
      >
        {showIcon && Icon && (
          <motion.div
            whileHover={{ scale: 1.2, rotate: 15 }}
            className="text-cyan-400 group-hover:text-fuchsia-400 transition-colors"
          >
            {typeof Icon === "function" ? <Icon className="w-4 h-4" /> : Icon}
          </motion.div>
        )}

        <span className="flex items-center gap-1.5 bg-gradient-to-r from-zinc-100 to-zinc-300 bg-clip-text text-transparent">
          {children || "Start Free Trial"}
        </span>
      </button>

      <div className="absolute inset-0 z-[-2] rounded-full opacity-0 group-hover:opacity-20 transition-opacity duration-500 bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 blur-xl" />
    </div>
  );
}
