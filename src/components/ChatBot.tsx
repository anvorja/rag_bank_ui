import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import {
  MessageCircle,
  X,
  Send,
  Sparkles,
  CreditCard,
  TrendingUp,
  Shield,
  ChevronDown,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface Message {
  id: string;
  type: "bot" | "user";
  content: string;
  timestamp: Date;
  quickReplies?: string[];
  expandable?: boolean;
  expanded?: boolean;
}

export const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      type: "bot",
      content: "¡Hola! Soy tu Asesor Financiero de Bank BorjaM 👋",
      timestamp: new Date(),
      quickReplies: [
        "Abrir cuenta",
        "Consultar préstamos",
        "Transferencias",
      ],
    },
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSendMessage = (text: string = inputValue) => {
    if (!text.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      type: "user",
      content: text,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue("");
    setIsTyping(true);

    // Simulate bot response
    setTimeout(() => {
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: "bot",
        content: getBotResponse(text),
        timestamp: new Date(),
        quickReplies: getQuickReplies(text),
      };
      setMessages((prev) => [...prev, botMessage]);
      setIsTyping(false);
    }, 1500);
  };

  const getBotResponse = (userInput: string): string => {
    const input = userInput.toLowerCase();
    if (input.includes("cuenta") || input.includes("abrir")) {
      return "Excelente elección. Puedes abrir tu cuenta 100% digital en menos de 5 minutos.";
    }
    if (input.includes("préstamo") || input.includes("crédito")) {
      return "Ofrecemos préstamos personales desde 3% TIN. ¿Qué monto necesitas?";
    }
    if (input.includes("transferencia")) {
      return "Las transferencias son instantáneas y sin comisiones entre cuentas Bank BorjaM.";
    }
    return "Entendido. ¿En qué más puedo ayudarte hoy?";
  };

  const getQuickReplies = (userInput: string): string[] | undefined => {
    const input = userInput.toLowerCase();
    if (input.includes("cuenta")) {
      return ["Ver requisitos", "Comenzar apertura", "Comparar cuentas"];
    }
    if (input.includes("préstamo")) {
      return ["Simular préstamo", "Ver tasas", "Hablar con asesor"];
    }
    return ["Ver más servicios", "Hablar con humano"];
  };

  const toggleExpand = (messageId: string) => {
    setMessages((prev) =>
      prev.map((msg) =>
        msg.id === messageId ? { ...msg, expanded: !msg.expanded } : msg
      )
    );
  };

  return (
    <>
      {/* Floating Chat Button */}
      <Button
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          "fixed bottom-8 right-8 h-16 w-16 rounded-full shadow-2xl z-50",
          "bg-primary hover:bg-primary/90 transition-all duration-300",
          "animate-pulse-glow",
          isOpen && "scale-0"
        )}
      >
        <MessageCircle className="h-6 w-6" />
      </Button>

      {/* Chat Window */}
      <div
        className={cn(
          "fixed bottom-8 right-8 w-[420px] h-[600px] z-50",
          "glass-panel rounded-2xl overflow-hidden",
          "transition-all duration-500 ease-out",
          "shadow-[0_0_50px_rgba(0,200,255,0.3)]",
          isOpen
            ? "scale-100 opacity-100"
            : "scale-0 opacity-0 pointer-events-none"
        )}
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-primary to-secondary p-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="relative">
              <Sparkles className="h-8 w-8 text-background" />
              <span className="absolute -top-1 -right-1 h-3 w-3 bg-green-500 rounded-full border-2 border-background animate-pulse" />
            </div>
            <div>
              <h3 className="font-semibold text-background">
                Asesor Financiero
              </h3>
              <p className="text-xs text-background/80 flex items-center gap-1">
                <span className="h-2 w-2 bg-green-400 rounded-full" />
                Conectado
              </p>
            </div>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsOpen(false)}
            className="text-background hover:bg-background/20"
          >
            <X className="h-5 w-5" />
          </Button>
        </div>

        {/* Messages Area */}
        <ScrollArea className="h-[420px] p-4 bg-background/95" ref={scrollRef}>
          <div className="space-y-4">
            {messages.map((message, idx) => (
              <div
                key={message.id}
                className={cn(
                  "animate-slide-up flex gap-2",
                  message.type === "user" && "flex-row-reverse"
                )}
                style={{ animationDelay: `${idx * 0.1}s` }}
              >
                {message.type === "bot" && (
                  <div className="flex-shrink-0 h-8 w-8 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
                    <Sparkles className="h-4 w-4 text-background" />
                  </div>
                )}

                <div
                  className={cn(
                    "max-w-[280px] rounded-2xl px-4 py-3",
                    "backdrop-blur-sm border transition-all duration-300",
                    message.type === "bot"
                      ? "bg-chat-bot border-primary/20 text-foreground"
                      : "bg-chat-user border-primary/30 text-foreground"
                  )}
                >
                  <p className="text-sm leading-relaxed">{message.content}</p>

                  {message.quickReplies && (
                    <div className="flex flex-wrap gap-2 mt-3">
                      {message.quickReplies.map((reply, i) => (
                        <Button
                          key={i}
                          variant="outline"
                          size="sm"
                          onClick={() => handleSendMessage(reply)}
                          className="h-7 text-xs border-primary/40 hover:bg-primary/20 hover:border-primary"
                        >
                          {reply}
                        </Button>
                      ))}
                    </div>
                  )}

                  <p className="text-[10px] text-muted-foreground mt-2">
                    {message.timestamp.toLocaleTimeString("es-ES", {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </p>
                </div>
              </div>
            ))}

            {isTyping && (
              <div className="flex gap-2 animate-slide-up">
                <div className="flex-shrink-0 h-8 w-8 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
                  <Sparkles className="h-4 w-4 text-background" />
                </div>
                <div className="bg-chat-bot backdrop-blur-sm border border-primary/20 rounded-2xl px-4 py-3">
                  <div className="flex gap-1">
                    <span className="h-2 w-2 bg-primary rounded-full animate-bounce" />
                    <span
                      className="h-2 w-2 bg-primary rounded-full animate-bounce"
                      style={{ animationDelay: "0.2s" }}
                    />
                    <span
                      className="h-2 w-2 bg-primary rounded-full animate-bounce"
                      style={{ animationDelay: "0.4s" }}
                    />
                  </div>
                </div>
              </div>
            )}
          </div>
        </ScrollArea>

        {/* Quick Actions */}
        <div className="px-4 py-2 border-t border-border/50 bg-background/95">
          <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
            <Badge
              variant="outline"
              className="cursor-pointer hover:bg-primary/20 border-primary/40 whitespace-nowrap"
            >
              <CreditCard className="h-3 w-3 mr-1" />
              Cuentas
            </Badge>
            <Badge
              variant="outline"
              className="cursor-pointer hover:bg-primary/20 border-primary/40 whitespace-nowrap"
            >
              <TrendingUp className="h-3 w-3 mr-1" />
              Inversiones
            </Badge>
            <Badge
              variant="outline"
              className="cursor-pointer hover:bg-primary/20 border-primary/40 whitespace-nowrap"
            >
              <Shield className="h-3 w-3 mr-1" />
              Seguros
            </Badge>
          </div>
        </div>

        {/* Input Area */}
        <div className="p-4 bg-background/95 border-t border-border/50">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSendMessage();
            }}
            className="flex gap-2"
          >
            <Input
              ref={inputRef}
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Escribe tu pregunta..."
              className="flex-1 bg-muted/50 border-primary/20 focus:border-primary"
            />
            <Button
              type="submit"
              size="icon"
              disabled={!inputValue.trim()}
              className="bg-primary hover:bg-primary/90 shadow-lg hover:shadow-primary/50 transition-all"
            >
              <Send className="h-4 w-4" />
            </Button>
          </form>
        </div>
      </div>
    </>
  );
};
