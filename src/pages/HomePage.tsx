// src/pages/HomePage.tsx
import { ParticlesBackground } from "@/components/ParticlesBackground";
import { GlassCard } from "@/components/GlassCard";
import { GlassButton } from "@/components/GlassButton";
import { FinancialAdvisorChatbot } from "@/components/chatbot";
import {
  CreditCard,
  Shield,
  Zap,
  TrendingUp,
  Globe,
  Lock,
  Smartphone,
  Users,
  ArrowRight,
  Sparkles
} from "lucide-react";
import {Footer, Header} from "@/layout";

const HomePage = () => {
  const features = [
    {
      icon: Shield,
      title: "Seguridad Total",
      description: "Protección de nivel bancario con encriptación de última generación"
    },
    {
      icon: Zap,
      title: "Transacciones Instantáneas",
      description: "Transferencias en tiempo real las 24 horas del día"
    },
    {
      icon: TrendingUp,
      title: "Inversiones Inteligentes",
      description: "Algoritmos de IA para optimizar tu cartera de inversiones"
    },
    {
      icon: Globe,
      title: "Banca Global",
      description: "Opera en más de 150 países sin comisiones ocultas"
    }
  ];

  const services = [
    {
      icon: CreditCard,
      title: "Tarjetas Premium",
      benefit: "Hasta 5% cashback",
      color: "primary"
    },
    {
      icon: Lock,
      title: "Cuentas Protegidas",
      benefit: "Seguro hasta $250,000",
      color: "accent"
    },
    {
      icon: Smartphone,
      title: "App Móvil",
      benefit: "Gestión total desde tu móvil",
      color: "primary"
    },
    {
      icon: Users,
      title: "Soporte 24/7",
      benefit: "Atención personalizada",
      color: "accent"
    }
  ];

  return (
    <div className="min-h-screen bg-background text-foreground overflow-hidden">
      <ParticlesBackground />

      <Header />

      {/* Hero Section */}
      <section className="relative z-10 container mx-auto px-6 pt-16 sm:pt-24 pb-24 sm:pb-32">
        <div className="max-w-4xl mx-auto text-center">
          <div className="breathe mb-8">
            <h1 className="text-4xl sm:text-6xl md:text-7xl font-bold mb-6 leading-tight">
              El Futuro de la
              <span className="block bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent animate-shimmer">
                Banca Digital
              </span>
            </h1>
          </div>

          <p className="text-lg sm:text-xl text-muted-foreground mb-8 sm:mb-12 max-w-2xl mx-auto px-4">
            Experimenta una banca sin límites. Tecnología de vanguardia,
            seguridad inquebrantable y una experiencia que se siente viva.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center px-4">
            <GlassButton variant="primary" className="group w-full sm:w-auto">
              Comenzar Ahora
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </GlassButton>
            <GlassButton variant="secondary" className="w-full sm:w-auto">
              Ver Demo
            </GlassButton>
          </div>

          {/* Floating Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-16 sm:mt-24 px-4">
            <GlassCard className="float" glow>
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center glow-primary flex-shrink-0">
                  <CreditCard className="w-6 h-6 text-primary" />
                </div>
                <div className="text-left">
                  <h3 className="text-xl font-semibold mb-2">Cuenta Virtual</h3>
                  <p className="text-muted-foreground">
                    Abre tu cuenta en menos de 5 minutos
                  </p>
                </div>
              </div>
            </GlassCard>

            <GlassCard className="float" style={{ animationDelay: "1s" }}>
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-accent/20 flex items-center justify-center glow-accent flex-shrink-0">
                  <Zap className="w-6 h-6 text-accent" />
                </div>
                <div className="text-left">
                  <h3 className="text-xl font-semibold mb-2">Velocidad Extrema</h3>
                  <p className="text-muted-foreground">
                    Transferencias procesadas al instante
                  </p>
                </div>
              </div>
            </GlassCard>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section id="servicios" className="relative z-10 container mx-auto px-6 py-16 sm:py-24">
        <div className="text-center mb-12 sm:mb-16 px-4">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
            Tecnología que <span className="text-primary">Respira</span>
          </h2>
          <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto">
            Cada característica diseñada para ofrecerte una experiencia bancaria premium
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 px-4">
          {features.map((feature, index) => (
            <GlassCard
              key={index}
              className="breathe"
              style={{ animationDelay: `${index * 0.2}s` }}
            >
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center mb-4 glow-primary mx-auto sm:mx-0">
                <feature.icon className="w-7 h-7 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-center sm:text-left">{feature.title}</h3>
              <p className="text-muted-foreground text-center sm:text-left">{feature.description}</p>
            </GlassCard>
          ))}
        </div>
      </section>

      {/* Services Section */}
      <section className="relative z-10 container mx-auto px-6 py-16 sm:py-24">
        <div className="glass rounded-3xl p-8 sm:p-12 mx-4 sm:mx-0">
          <h2 className="text-3xl sm:text-4xl font-bold text-center mb-8 sm:mb-12">
            Servicios <span className="text-accent">Premium</span>
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((service, index) => (
              <div
                key={index}
                className="glass-border rounded-2xl p-6 hover:scale-105 transition-all duration-500 cursor-pointer hover-glow group"
              >
                <div className={`w-12 h-12 rounded-xl bg-${service.color}/20 flex items-center justify-center mb-4 group-hover:glow-${service.color}`}>
                  <service.icon className={`w-6 h-6 text-${service.color}`} />
                </div>
                <h3 className="text-lg font-semibold mb-2">{service.title}</h3>
                <p className="text-sm text-primary font-medium">{service.benefit}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative z-10 container mx-auto px-6 py-16 sm:py-24">
        <div className="mx-4 sm:mx-0">
          <GlassCard className="text-center py-12 sm:py-16" glow>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6 px-4">
              ¿Listo para el <span className="text-primary">Futuro</span>?
            </h2>
            <p className="text-lg sm:text-xl text-muted-foreground mb-6 sm:mb-8 max-w-2xl mx-auto px-4">
              Únete a más de 1 millón de usuarios que ya confían en Borgian Bank
            </p>
            <GlassButton variant="primary" className="text-lg">
              Abrir Cuenta Gratis
              <Sparkles className="w-5 h-5" />
            </GlassButton>
          </GlassCard>
        </div>
      </section>

      <Footer />

      {/* Financial Advisor Chatbot */}
      <FinancialAdvisorChatbot />
    </div>
  );
};

export default HomePage;