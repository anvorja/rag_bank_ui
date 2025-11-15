import { Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

export const Header = () => {
  return (
    <header className="fixed top-0 left-0 right-0 z-40 glass-panel border-b border-border/50">
      <nav className="container mx-auto px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="bg-gradient-to-br from-primary to-secondary p-2 rounded-xl">
            <Sparkles className="h-5 w-5 text-background" />
          </div>
          <span className="text-xl font-bold">
            Bank <span className="text-gradient">BorjaM</span>
          </span>
        </div>

        <div className="hidden md:flex items-center gap-8">
          <a
            href="#servicios"
            className="text-sm text-foreground/80 hover:text-foreground transition-colors"
          >
            Servicios
          </a>
          <a
            href="#nosotros"
            className="text-sm text-foreground/80 hover:text-foreground transition-colors"
          >
            Nosotros
          </a>
          <a
            href="#contacto"
            className="text-sm text-foreground/80 hover:text-foreground transition-colors"
          >
            Contacto
          </a>
        </div>

        <Button className="bg-foreground text-background hover:bg-foreground/90">
          Abrir Cuenta
        </Button>
      </nav>
    </header>
  );
};
