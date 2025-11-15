// src/components/GlassButton.tsx
import type {ReactNode} from "react";
import { cn } from "@/lib/utils";

interface GlassButtonProps {
  children: ReactNode;
  className?: string;
  variant?: "primary" | "secondary" | "accent";
  onClick?: () => void;
}

export const GlassButton = ({ 
  children, 
  className,
  variant = "primary",
  onClick 
}: GlassButtonProps) => {
  const variants = {
    primary: "glass hover:bg-primary/20 hover:border-primary/40 hover:glow-primary",
    secondary: "glass hover:bg-secondary/30 hover:border-foreground/30",
    accent: "glass hover:bg-accent/20 hover:border-accent/40 hover:glow-accent",
  };

  return (
    <button
      onClick={onClick}
      className={cn(
        "relative px-8 py-4 rounded-xl font-semibold text-foreground",
        "transition-all duration-500 transform hover:scale-105",
        "group overflow-hidden",
        variants[variant],
        className
      )}
    >
      {/* Shimmer effect */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
        <div 
          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
          style={{
            backgroundSize: "200% 100%",
            animation: "shimmer 2s linear infinite"
          }}
        />
      </div>
      
      {/* Content */}
      <span className="relative z-10 flex items-center gap-2">
        {children}
      </span>
    </button>
  );
};
