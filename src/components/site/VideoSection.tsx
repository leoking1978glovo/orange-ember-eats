import { motion } from "motion/react";

export function VideoSection() {
  return (
    <section className="relative h-[70vh] w-full overflow-hidden bg-ink md:h-[85vh]">
      <video
        className="absolute inset-0 h-full w-full object-cover opacity-55"
        autoPlay
        muted
        loop
        playsInline
        poster="https://images.unsplash.com/photo-1514933651103-005eec06c04b?w=1600&q=60"
        src="https://cdn.coverr.co/videos/coverr-cooking-in-a-restaurant-kitchen-4029/1080p.mp4"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/30 to-ink/60" />

      <div className="relative flex h-full items-center justify-center px-6 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <p className="mb-6 text-xs font-semibold tracking-[0.4em] text-secondary uppercase">
            Entre bambalinas
          </p>
          <h2 className="mx-auto max-w-[14ch] text-[clamp(2.5rem,9vw,6rem)] text-cream">
            El ruido de la <span className="text-fire">cocina</span>
          </h2>
          <p className="mx-auto mt-6 max-w-lg text-cream/70">
            Doce personas, tres fuegos y un servicio que no para. Así suena cada noche en Brasa.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
