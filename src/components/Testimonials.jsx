import React from "react";
import { motion } from "motion/react";

const testimonials = [
  {
    quote:
      "Oud Royale is unlike anything I've experienced. Deep, rich, lasts all day. I receive compliments every time. This is my signature scent now.",
    author: "Ahmed K.",
    city: "Lahore, Pakistan",
    stars: "★★★★★",
  },
  {
    quote:
      "Velvet Éclat is pure elegance. Feminine, soft, luxurious. The packaging alone is stunning — felt like receiving a gift from a high-end boutique.",
    author: "Sara M.",
    city: "Karachi, Pakistan",
    stars: "★★★★★",
  },
  {
    quote:
      "Executive Code is my go-to for important meetings. It commands presence. Professional yet bold — stays with you all day.",
    author: "Usman R.",
    city: "Islamabad, Pakistan",
    stars: "★★★★★",
  },
];

export const Testimonials = () => {
  return (
    <section className="bg-gradient-to-b from-[#070707] via-[#0b0b0b] to-[#050505] py-[110px] relative overflow-hidden">
      {/* subtle noise */}
      <div className="absolute inset-0 bg-noise opacity-[0.04] pointer-events-none"></div>

      {/* soft gold glow background */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(201,168,76,0.08),transparent_60%)]"></div>

      <div className="max-w-[1380px] mx-auto px-5 md:px-[60px] relative z-10">
        {/* HEADER */}
        <div className="text-center mb-16">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="sec-eyebrow text-gold/80 tracking-[6px]"
          >
            ◆ Client Experiences ◆
          </motion.p>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="sec-title text-white mt-3"
          >
            Impressions That Last
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="sec-sub text-white/60"
          >
            Words from those who wear our story
          </motion.p>
        </div>

        {/* CARDS */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className="relative group p-8 rounded-2xl border border-gold/10 bg-white/5 backdrop-blur-md overflow-hidden transition-all duration-500 hover:border-gold/30 hover:shadow-[0_20px_60px_rgba(201,168,76,0.12)]"
            >
              {/* gold hover glow */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition duration-500 bg-[radial-gradient(circle_at_top_left,rgba(201,168,76,0.12),transparent_60%)]"></div>

              {/* quote mark */}
              <div className="font-serif text-[70px] text-gold/10 leading-none absolute top-4 left-5">
                “
              </div>

              {/* stars */}
              <div className="text-gold text-[11px] tracking-[3px] mb-5 relative z-10">
                {t.stars}
              </div>

              {/* quote */}
              <p className="font-serif italic text-[15px] leading-[1.9] text-white/70 relative z-10 mb-6">
                {t.quote}
              </p>

              {/* author */}
              <div className="font-display text-[11px] tracking-[4px] text-gold uppercase relative z-10">
                {t.author}
              </div>

              <div className="text-[10px] text-white/40 tracking-[2px] mt-1 relative z-10">
                {t.city}
              </div>

              {/* bottom gold line */}
              <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-linear-to-r from-transparent via-gold to-transparent opacity-20 group-hover:opacity-60 transition"></div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
