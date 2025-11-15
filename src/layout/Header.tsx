// src/layout/Header.tsx
import { Sparkles } from "lucide-react";
import { GlassButton } from "@/components/GlassButton";

export const Header = () => {
  return (
    <nav className="relative z-10 glass-border">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary to-accent flex items-center justify-center glow-primary">
              <Sparkles className="w-6 h-6 text-background" />
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Borgian Bank
            </span>
          </div>

          <div className="hidden md:flex items-center gap-8">
            <a
              href="#servicios"
              className="text-muted-foreground hover:text-foreground transition-colors focus:outline-none focus:text-foreground"
            >
              Servicios
            </a>
            <a
              href="#nosotros"
              className="text-muted-foreground hover:text-foreground transition-colors focus:outline-none focus:text-foreground"
            >
              Nosotros
            </a>
            <a
              href="#contacto"
              className="text-muted-foreground hover:text-foreground transition-colors focus:outline-none focus:text-foreground"
            >
              Contacto
            </a>
            <GlassButton variant="primary" className="px-6 py-2">
              Abrir Cuenta
            </GlassButton>
          </div>

          {/* Mobile menu button - could be expanded later */}
          <div className="md:hidden">
            <GlassButton variant="primary" className="px-4 py-2 text-sm">
              Menú
            </GlassButton>
          </div>
        </div>
      </div>
    </nav>
  );
};