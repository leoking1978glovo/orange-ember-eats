import banderaColombia from "@/assets/bandera-de-colombia.png";

const items = [
  "Producto fresco",
  "Cocina con alma",
  "Sabor natural",
  { type: "flag" as const },
  { type: "flag" as const },
  "Punto Verde",
];

export function Marquee() {
  return (
    <div className="overflow-hidden border-y-4 border-ink bg-[#5F7A3A] py-4">
      <div className="marquee-track flex w-max gap-10 whitespace-nowrap items-center">
        {[0, 1].map((dup) => (
          <div key={dup} className="flex gap-10 items-center">
            {items.map((item, idx) => (
              <span
                key={idx + "-" + dup}
                className="flex items-center gap-4 font-display text-2xl tracking-tight text-[#F5EEDC] uppercase md:text-4xl"
              >
                {typeof item === "string" ? (
                  <>
                    {item} <span className="text-cream">✦</span>
                  </>
                ) : (
                  <img
                    src={banderaColombia}
                    alt="Colombia"
                    className="h-8 w-auto md:h-12 drop-shadow-sm"
                  />
                )}
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}