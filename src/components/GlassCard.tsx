// src/components/GlassCard.tsx
import { ReactNode, CSSProperties } from "react";
import { cn } from "@/lib/utils";

interface GlassCardProps {
  children: ReactNode;
  className?: string;
  hover?: boolean;
  glow?: boolean;
  style?: CSSProperties;
}

export const GlassCard = ({ 
  children, 
  className, 
  hover = true,
  glow = false,
  style
}: GlassCardProps) => {
  return (
    <div
      style={style}
      className={cn(
        "glass rounded-2xl p-6 transition-all duration-500",
        hover && "hover:scale-[1.02] hover-glow cursor-pointer",
        glow && "pulse-glow",
        className
      )}
    >
      {children}
    </div>
  );
};
