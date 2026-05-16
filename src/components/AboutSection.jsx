import React from "react";
import { motion } from "motion/react";

export const AboutSection = () => {
  return (
    <section
      id="our-story"
      className="bg-gradient-to-b from-[#0a0a0a] via-[#0b0b0b] to-[#070707] py-[100px] relative overflow-hidden"
    >
      {/* subtle noise */}
      <div className="absolute inset-0 bg-noise opacity-[0.03] pointer-events-none"></div>

      <div className="max-w-[1380px] mx-auto px-5 md:px-[60px] relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          {/* LEFT IMAGE */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="hidden lg:block aspect-[4/5] relative overflow-hidden border border-gold/10 shadow-sm"
          >
            <img
              src="/about.jpeg"
              alt="C.M Scents Story"
              className="w-full h-full object-cover scale-[1.05]"
            />

            <div className="absolute inset-0 bg-gradient-to-br from-black/70 via-black/40 to-black/85"></div>
            <div className="absolute inset-0 bg-gold/10 mix-blend-overlay"></div>
            <div className="absolute inset-0 shadow-[inset_0_0_120px_rgba(0,0,0,0.75)]"></div>
            <div className="absolute inset-0 bg-linear-to-br from-transparent via-transparent to-gold/10"></div>

            <div className="absolute inset-[18px] border border-gold/10 pointer-events-none z-[2]"></div>
            <div className="absolute bottom-0 left-0 right-0 h-[3px] bg-linear-to-r from-transparent via-gold to-transparent opacity-30"></div>
          </motion.div>

          {/* RIGHT TEXT */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="flex flex-col text-left"
          >
            <p className="sec-eyebrow text-gold/80 tracking-[6px] uppercase">
              ◆ Our Story ◆
            </p>

            <h2 className="sec-title text-white mb-8">Crafted With Purpose</h2>

            <div className="space-y-6">
              <p className="font-serif text-[17px] leading-[2] text-white/70">
                At <strong className="text-gold font-normal">C.M Scents</strong>
                , every fragrance is born from a passion for artisanal
                perfumery. We believe a great scent is not merely worn — it
                becomes part of you, a silent signature that speaks before you
                do.
              </p>

              <p className="font-serif text-[17px] leading-[2] text-white/65">
                Our collection spans from the dark mystery of{" "}
                <strong className="text-gold font-normal ">Tempest Noir</strong>{" "}
                to the vibrant freshness of{" "}
                <strong className="text-gold/90 font-normal tracking-wide">
                  Dynamic Mist
                </strong>
                , the regal warmth of{" "}
                <strong className="text-gold/90 font-normal tracking-wide">
                  Oud Royale
                </strong>
                , and the luminous femininity of{" "}
                <strong className="text-gold/90 font-normal tracking-wide">
                  Velvet Éclat
                </strong>
                .
              </p>

              <p className="font-serif text-[17px] leading-[2] text-white/60">
                Each 50ml bottle is a symphony of top, heart, and base notes —
                designed to evolve beautifully on your skin throughout the day.
              </p>
            </div>

            {/* divider */}
            <div className="w-[2px] h-[60px] bg-linear-to-b from-transparent via-gold/70 to-transparent my-8"></div>

            <div className="font-display text-[11px] tracking-[6px] text-gold/80 uppercase">
              FREE DELIVERY ACROSS PAKISTAN
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
