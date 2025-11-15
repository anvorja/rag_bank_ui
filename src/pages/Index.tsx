import { ParticlesBackground } from "@/components/ParticlesBackground";
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { ChatBot } from "@/components/ChatBot";

const Index = () => {
  return (
    <div className="min-h-screen bg-background text-foreground overflow-hidden">
      <ParticlesBackground />
      <Header />
      <Hero />
      <ChatBot />
    </div>
  );
};

export default Index;
