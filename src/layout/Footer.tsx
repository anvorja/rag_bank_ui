// src/layout/Footer.tsx
import { Sparkles } from "lucide-react";

export const Footer = () => {
  return (
    <footer className="relative z-10 glass-border mt-24">
      <div className="container mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-accent flex items-center justify-center">
                <Sparkles className="w-4 h-4 text-background" />
              </div>
              <span className="text-xl font-bold">Borgian Bank</span>
            </div>
            <p className="text-sm text-muted-foreground">
              Innovación financiera que se siente viva
            </p>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Productos</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li className="hover:text-foreground transition-colors cursor-pointer">Cuentas</li>
              <li className="hover:text-foreground transition-colors cursor-pointer">Tarjetas</li>
              <li className="hover:text-foreground transition-colors cursor-pointer">Inversiones</li>
              <li className="hover:text-foreground transition-colors cursor-pointer">Seguros</li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Compañía</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li className="hover:text-foreground transition-colors cursor-pointer">Nosotros</li>
              <li className="hover:text-foreground transition-colors cursor-pointer">Carreras</li>
              <li className="hover:text-foreground transition-colors cursor-pointer">Blog</li>
              <li className="hover:text-foreground transition-colors cursor-pointer">Prensa</li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Soporte</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li className="hover:text-foreground transition-colors cursor-pointer">Ayuda</li>
              <li className="hover:text-foreground transition-colors cursor-pointer">Seguridad</li>
              <li className="hover:text-foreground transition-colors cursor-pointer">Legal</li>
              <li className="hover:text-foreground transition-colors cursor-pointer">Privacidad</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-border/50 mt-12 pt-8 text-center text-sm text-muted-foreground">
          <p>© 2025 Borgian Bank. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  );
};