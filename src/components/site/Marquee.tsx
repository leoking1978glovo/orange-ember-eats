const items = ["Fuego vivo", "Producto de mercado", "Cocina abierta", "Sin postureo", "Brasa 24/7"];

export function Marquee() {
  return (
    <div className="overflow-hidden border-y-4 border-ink bg-fire py-4">
      <div className="marquee-track flex w-max gap-10 whitespace-nowrap">
        {[0, 1].map((dup) => (
          <div key={dup} className="flex gap-10">
            {items.map((i) => (
              <span
                key={i + dup}
                className="font-display text-2xl tracking-tight text-ink uppercase md:text-4xl"
              >
                {i} <span className="text-cream">✦</span>
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
