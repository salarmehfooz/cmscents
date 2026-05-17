import React from "react";
import { motion } from "motion/react";
import { PRODS } from "../constants";

export const ProductSection = ({ onAddToCart }) => {
  const handleAdd = (p) => {
    onAddToCart({
      ...p,
      price: Number(p.price) || 0,
      qty: 1,
    });
  };

  return (
    <section
      id="collection"
      className="bg-gradient-to-b from-[#070707] via-[#0b0b0b] to-[#050505] py-[120px] relative overflow-hidden"
    >
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

          <motion.h2 className="sec-title text-white mt-3">
            Signature Fragrances
          </motion.h2>

          <motion.p className="font-serif text-white/60 text-lg mt-4">
            Six distinguished perfumes — crafted to leave an impression
          </motion.p>
        </div>

        {/* GRID */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {PRODS.map((p, i) => (
            <motion.div
              key={p.id}
              className="group relative rounded-2xl overflow-hidden border border-gold/10 bg-white/5"
            >
              {/* IMAGE */}
              <div className="relative aspect-[4/5] overflow-hidden">
                <img
                  src={p.image}
                  alt={p.name}
                  className="w-full h-full object-cover"
                />

                <div className="absolute inset-0 flex items-end justify-center pb-6 opacity-0 group-hover:opacity-100 transition">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleAdd(p);
                      {
                        /* ✅ FIX HERE */
                      }
                    }}
                    className="bg-gold text-black px-6 py-3 text-[10px] uppercase"
                  >
                    Add to Selection
                  </button>
                </div>
              </div>

              {/* TEXT */}
              <div className="p-7">
                <div className="flex justify-between">
                  <div>
                    <div className="text-[9px] text-gold/80 uppercase">
                      {p.cat}
                    </div>
                    <div className="text-white text-xl">{p.name}</div>
                  </div>

                  <div className="text-gold">
                    Rs. {Number(p.price).toLocaleString()}
                  </div>
                </div>

                <p className="text-white/60 text-sm mt-3">{p.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
