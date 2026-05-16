import React from "react";
import { motion } from "motion/react";
import { PRODS } from "../constants";

export const ProductSection = ({ onAddToCart }) => {
  return (
    <section
      id="collection"
      className="bg-gradient-to-b from-[#070707] via-[#0b0b0b] to-[#050505] py-[120px] relative overflow-hidden"
    >
      {/* noise + gold glow */}
      <div className="absolute inset-0 bg-noise opacity-[0.04] pointer-events-none"></div>
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
            ◆ Our Collection ◆
          </motion.p>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="sec-title text-white mt-3"
          >
            Signature Fragrances
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-serif text-white/60 text-lg mt-4"
          >
            Six distinguished perfumes — crafted to leave an impression
          </motion.p>
        </div>

        {/* GRID */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {PRODS.map((p, i) => (
            <motion.div
              key={p.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className="group relative rounded-2xl overflow-hidden border border-gold/10 bg-white/5 backdrop-blur-md hover:border-gold/30 transition-all duration-500 hover:shadow-[0_25px_80px_rgba(201,168,76,0.15)]"
            >
              {/* IMAGE */}
              <div className="relative aspect-[4/5] overflow-hidden">
                <img
                  src={p.image}
                  alt={p.name}
                  className="w-full h-full object-cover scale-105 group-hover:scale-115 transition-transform duration-700"
                />

                {/* cinematic overlays */}
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent"></div>
                <div className="absolute inset-0 bg-gold/10 mix-blend-overlay opacity-70"></div>
                <div className="absolute inset-0 shadow-[inset_0_0_120px_rgba(0,0,0,0.75)]"></div>

                {/* hover CTA */}
                <div className="absolute inset-0 flex items-end justify-center pb-6 opacity-0 group-hover:opacity-100 transition-all duration-500">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onAddToCart(p);
                    }}
                    className="bg-gold text-black px-6 py-3 text-[10px] tracking-[4px] uppercase font-semibold hover:bg-gold/90 active:scale-95 transition"
                  >
                    Add to Selection
                  </button>
                </div>
              </div>

              {/* TEXT */}
              <div className="p-7">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <div className="text-[9px] tracking-[5px] text-gold/80 uppercase mb-2">
                      {p.cat}
                    </div>

                    <div className="font-display text-xl text-white tracking-[2px]">
                      {p.name}
                    </div>
                  </div>

                  <div className="font-display text-lg text-gold">
                    Rs. {p.price.toLocaleString()}
                  </div>
                </div>

                <p className="font-serif italic text-sm text-white/60 leading-relaxed min-h-[50px]">
                  {p.desc}
                </p>

                {/* NOTES */}
                <div className="mt-6 flex flex-wrap gap-2">
                  {p.notes.map((n, idx) => (
                    <span
                      key={idx}
                      className="text-[8px] tracking-[3px] text-white/50 border border-gold/10 px-3 py-1 uppercase hover:border-gold/40 hover:text-gold transition"
                    >
                      {n}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
