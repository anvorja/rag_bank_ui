import { Button } from "@/components/ui/button";
import { ArrowRight, Play } from "lucide-react";

export const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center pt-20 px-6">
      <div className="container mx-auto text-center space-y-8 max-w-4xl">
        <h1 className="text-5xl md:text-7xl font-bold leading-tight animate-fade-in">
          El Futuro de la <br />
          <span className="text-gradient">Banca Digital</span>
        </h1>

        <p className="text-lg md:text-xl text-foreground/80 max-w-2xl mx-auto animate-fade-in">
          Experimenta una banca sin límites. Tecnología de vanguardia, seguridad
          inquebrantable y una experiencia que se siente viva.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-fade-in">
          <Button
            size="lg"
            className="bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg hover:shadow-primary/50 transition-all group"
          >
            Comenzar Ahora
            <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="border-primary/40 hover:bg-primary/10"
          >
            <Play className="mr-2 h-4 w-4" />
            Ver Demo
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-16 max-w-3xl mx-auto">
          <div className="glass-panel p-6 rounded-2xl glass-hover group cursor-pointer">
            <div className="bg-primary/20 w-12 h-12 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <svg
                className="h-6 w-6 text-primary"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
                />
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-2">Cuenta Virtual</h3>
            <p className="text-foreground/70 text-sm">
              Abre tu cuenta en menos de 5 minutos
            </p>
          </div>

          <div className="glass-panel p-6 rounded-2xl glass-hover group cursor-pointer">
            <div className="bg-secondary/20 w-12 h-12 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <svg
                className="h-6 w-6 text-secondary"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 10V3L4 14h7v7l9-11h-7z"
                />
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-2">Velocidad Extrema</h3>
            <p className="text-foreground/70 text-sm">
              Transferencias procesadas al instante
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
