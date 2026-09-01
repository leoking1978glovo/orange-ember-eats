import { useState } from "react";
import ChatWidgetPanel from "@/components/ChatWidgetPanel";

// ... tu código actual del Index ...

export default function Index() {
  const [isOpen, setIsOpen] = useState(false);
  const [chatKey, setChatKey] = useState(0);

  const handleNewConversation = () => {
    setChatKey((prev) => prev + 1);
  };

  return (
    <div className="relative min-h-screen">
      
      {/* ===== TODO TU CONTENIDO ACTUAL (hero, menú, about, etc.) ===== */}
      {/* NO BORRES NADA DE LO QUE YA TIENES */}


      {/* ===== CHAT FLOTANTE - PEGA ESTO AL FINAL ===== */}
      
      {/* Botón flotante 💬 */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-[#5F7A3A] text-white shadow-lg hover:scale-105 transition-transform"
      >
        {isOpen ? "✕" : "💬"}
      </button>

      {/* Panel del chat */}
      {isOpen && (
        <div className="fixed bottom-24 right-6 z-50 flex h-[600px] w-[380px] flex-col overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-2xl">
          
          {/* Header */}
          <div className="flex items-center justify-between bg-[#5F7A3A] px-4 py-3">
            <span className="font-semibold text-white text-sm">
              Santiago - Reservas
            </span>
            <button
              onClick={handleNewConversation}
              className="rounded px-2 py-1 text-xs text-white hover:bg-white/20"
            >
              🔄 Nueva
            </button>
          </div>

          {/* Iframe */}
          <div className="flex-1">
            <ChatWidgetPanel chatKey={chatKey} className="h-full w-full" />
          </div>
          
        </div>
      )}

    </div>
  );
}