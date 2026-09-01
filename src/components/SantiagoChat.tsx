import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";

interface SantiagoChatProps {
  isOpen: boolean;
  onClose: () => void;
}

const RELEVANCE_AGENT_URL =
  "https://app.relevanceai.com/agents/d7b62b/3785c80b-2f7e-5958-8205-9ab0bb7ec662/8054b867-8ce4-4250-8710-44feaa2cf640/embed-chat?hide_tool_steps=true&hide_file_uploads=true&hide_conversation_list=true&hide_logo=true&hide_description=true&bubble_style=agent&primary_color=%235F7A3A&input_placeholder_text=Escribe tu mensaje...";

export function SantiagoChat({ isOpen, onClose }: SantiagoChatProps) {
  const [loaded, setLoaded] = useState(false);
  const [mounted, setMounted] = useState(false);

  // Solo montar en cliente (evita errores de SSR)
  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) {
      window.addEventListener("keydown", handleKey);
      document.body.style.overflow = "hidden";
    }
    return () => {
      window.removeEventListener("keydown", handleKey);
      document.body.style.overflow = "";
    };
  }, [isOpen, onClose, mounted]);

  // No renderizar nada en el servidor
  if (!mounted) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-[9998] bg-black/60 backdrop-blur-sm"
          />
          <motion.div
            initial={{ opacity: 0, y: 60, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 60, scale: 0.95 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="fixed bottom-6 right-6 z-[9999] flex h-[600px] w-[380px] flex-col overflow-hidden rounded-3xl border border-cream/10 bg-ink shadow-2xl md:bottom-8 md:right-8"
          >
            {/* Header verde */}
            <div className="flex items-center justify-between border-b border-cream/10 bg-[#5F7A3A] px-5 py-4">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white/20 text-xl">
                  💬
                </div>
                <div>
                  <h3 className="font-display text-lg font-semibold text-white">
                    Santiago
                  </h3>
                  <p className="text-xs text-white/70">
                    Agente de reservas · Online
                  </p>
                </div>
              </div>
              <button
                onClick={onClose}
                className="rounded-full p-2 text-xl text-white/70 transition-colors hover:bg-white/20 hover:text-white"
              >
                ✕
              </button>
            </div>

            {/* Iframe */}
            <div className="relative flex-1 bg-white">
              {!loaded && (
                <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-white">
                  <div className="h-8 w-8 animate-spin rounded-full border-4 border-[#5F7A3A] border-t-transparent" />
                  <p className="text-sm text-gray-500">
                    Conectando con Santiago...
                  </p>
                </div>
              )}
              <iframe
                src={RELEVANCE_AGENT_URL}
                title="Santiago - Agente de Reservas"
                className="h-full w-full border-0"
                onLoad={() => setLoaded(true)}
                allow="microphone; clipboard-write"
              />
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}