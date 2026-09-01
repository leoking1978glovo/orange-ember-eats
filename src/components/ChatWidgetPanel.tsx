import { useState } from "react";

interface ChatWidgetPanelProps {
  className?: string;
  pendingMessage?: string | null;
  onPendingMessageSent?: () => void;
  chatKey?: number; // ← NUEVO: fuerza remontaje del iframe
}

const RELEVANCE_AGENT_URL =
  "https://app.relevanceai.com/agents/d7b62b/3785c80b-2f7e-5958-8205-9ab0bb7ec662/8054b867-8ce4-4250-8710-44feaa2cf640/embed-chat?hide_tool_steps=true&hide_file_uploads=true&hide_conversation_list=true&hide_logo=true&hide_description=true&bubble_style=agent&primary_color=%235F7A3A&input_placeholder_text=Escribe tu mensaje...";

export default function ChatWidgetPanel({
  className,
  chatKey,
}: ChatWidgetPanelProps) {
  const [loaded, setLoaded] = useState(false);

  return (
    <div className={`relative ${className || ""}`}>
      {!loaded && (
        <div className="absolute inset-0 z-10 flex flex-col items-center justify-center gap-3 bg-white">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-[#5F7A3A] border-t-transparent" />
          <p className="text-sm text-gray-500">Conectando con Santiago...</p>
        </div>
      )}
      <iframe
        key={chatKey} // ← NUEVO: cada vez que cambia, el iframe se recrea desde cero
        src={RELEVANCE_AGENT_URL}
        title="Santiago - Agente de Reservas"
        className="h-full w-full border-0"
        onLoad={() => setLoaded(true)}
        allow="microphone; clipboard-write"
      />
    </div>
  );
}