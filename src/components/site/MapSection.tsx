import { motion } from "motion/react";
import { MapPin } from "lucide-react";

export function MapSection() {
  return (
    <section id="ubicacion" className="bg-cream py-16 md:py-24">
      <div className="mx-auto max-w-[1600px] px-4 md:px-12">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mb-8 md:mb-12"
        >
          <h2 className="text-[clamp(2.5rem,8vw,5rem)] text-ink">
            Encuéntranos
          </h2>
          <p className="mt-2 flex items-center gap-2 text-base text-ink/60 md:text-lg">
            <MapPin className="h-5 w-5 text-primary" />
            Calle Miguel Rua, 64 — 04007 Almería, España
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="overflow-hidden rounded-3xl shadow-[0_8px_40px_rgba(0,0,0,0.12)] ring-1 ring-black/5"
        >
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3196.1234567890123!2d-2.4637!3d36.8404!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xd7a9c3e8f5e1234%3A0x1234567890abcdef!2sCalle%20Miguel%20Rua%2C%2064%2C%2004007%20Almer%C3%ADa%2C%20Espa%C3%B1a!5e0!3m2!1ses!2ses!4v1690000000000!5m2!1ses!2ses"
            width="100%"
            height="400"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Ubicación Punto Verde"
            className="h-[300px] w-full md:h-[450px]"
          />
        </motion.div>
      </div>
    </section>
  );
}