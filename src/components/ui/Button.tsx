"use client";

import { motion } from "framer-motion";
import Link from "next/link";

interface ButtonProps {
  children: React.ReactNode;
  href?: string;
  onClick?: () => void;
  variant?: "primary" | "secondary" | "outline";
  className?: string;
  type?: "button" | "submit";
  disabled?: boolean;
}

export default function Button({
  children,
  href,
  onClick,
  variant = "primary",
  className = "",
  type = "button",
  disabled = false,
}: ButtonProps) {
  const baseStyles =
    "relative px-6 py-3 rounded-lg font-medium transition-all duration-300 overflow-hidden";

  const variants = {
    primary:
      "bg-gradient-to-r from-[#6366f1] to-[#a855f7] text-white hover:shadow-lg hover:shadow-[#6366f1]/25",
    secondary: "bg-[#171717] text-white border border-white/10 hover:border-[#6366f1]/50",
    outline:
      "bg-transparent text-[#6366f1] border-2 border-[#6366f1] hover:bg-[#6366f1] hover:text-white",
  };

  const content = (
    <motion.span
      className={`${baseStyles} ${variants[variant]} ${className} inline-flex items-center justify-center gap-2`}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      {variant === "primary" && (
        <span className="absolute inset-0 bg-gradient-to-r from-[#22d3ee] to-[#6366f1] opacity-0 hover:opacity-100 transition-opacity duration-300" />
      )}
      <span className="relative z-10">{children}</span>
    </motion.span>
  );

  if (href) {
    return <Link href={href}>{content}</Link>;
  }

  return (
    <button type={type} onClick={onClick} disabled={disabled}>
      {content}
    </button>
  );
}
