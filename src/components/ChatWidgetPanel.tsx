import { useState, useEffect } from "react";

interface ChatWidgetPanelProps {
  className?: string;
  chatKey?: number;
}

const RELEVANCE_AGENT_URL_BASE =
  "https://app.relevanceai.com/agents/d7b62b/3785c80b-2f7e-5958-8205-9ab0bb7ec662/8054b867-8ce4-4250-8710-44feaa2cf640/embed-chat?hide_tool_steps=true&hide_file_uploads=true&hide_conversation_list=true&hide_logo=true&hide_description=true&bubble_style=agent&primary_color=%235F7A3A&input_placeholder_text=Escribe tu mensaje...";

// Clave para guardar el ID de usuario en el localStorage de ESTE dominio
const USER_ID_KEY = 'punto-verde-chat-user-id';

export default function ChatWidgetPanel({
  className,
  chatKey = 0,
}: ChatWidgetPanelProps) {
  // Generar o recuperar un user_id único para este navegador
  const [userId, setUserId] = useState(() => {
    if (typeof window === 'undefined') return '';
    const stored = localStorage.getItem(USER_ID_KEY);
    if (stored) return stored;
    const newId = `pv-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    localStorage.setItem(USER_ID_KEY, newId);
    return newId;
  });

  // Cuando chatKey cambia (al cerrar con X y volver a abrir), generar NUEVO userId
  useEffect(() => {
    const newId = `pv-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    localStorage.setItem(USER_ID_KEY, newId);
    setUserId(newId);
  }, [chatKey]);

  // URL con user_id único + timestamp anti-caché
  const agentUrl = `${RELEVANCE_AGENT_URL_BASE}&user_id=${encodeURIComponent(userId)}&_t=${Date.now()}`;

  return (
    <div className={`relative ${className || ""}`}>
      <ChatIframe key={userId} src={agentUrl} />
    </div>
  );
}

function ChatIframe({ src }: { src: string }) {
  const [loaded, setLoaded] = useState(false);

  return (
    <>
      {!loaded && (
        <div className="absolute inset-0 z-10 flex flex-col items-center justify-center gap-3 bg-white">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-[#5F7A3A] border-t-transparent" />
          <p className="text-sm text-gray-500">Conectando con Santiago...</p>
        </div>
      )}

      <iframe
        src={src}
        title="Santiago - Agente de Reservas"
        className="h-full w-full border-0"
        onLoad={() => setLoaded(true)}
        allow="microphone; clipboard-write"
      />
    </>
  );
}