import React from "react";
import { motion } from "motion/react";

const stats = [
  { value: "6", label: "Fragrances" },
  { value: "50ml", label: "Eau de Parfum" },
  { value: "100%", label: "Authentic" },
  { value: "🇵🇰", label: "Ships Nationwide" },
];

const container = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.12,
    },
  },
};

const item = {
  hidden: { opacity: 0, y: 18 },
  show: { opacity: 1, y: 0 },
};

export const StatsBar = () => {
  return (
    <section className="relative bg-black overflow-hidden">
      {/* gold ambient glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(201,168,76,0.10),transparent_60%)]"></div>

      <motion.div
        className="grid grid-cols-2 md:grid-cols-4 relative z-10"
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.4 }}
      >
        {stats.map((stat, i) => (
          <motion.div
            key={i}
            variants={item}
            className="
              relative
              flex flex-col items-center justify-center
              py-12 px-4 text-center
              border-r border-white/5 last:border-r-0
              group
              overflow-hidden
            "
          >
            {/* hover gold glow */}
            <div
              className="absolute inset-0 opacity-0 group-hover:opacity-100 transition
                            bg-[radial-gradient(circle,rgba(201,168,76,0.08),transparent_70%)]"
            ></div>

            {/* value */}
            <span className="font-display text-3xl md:text-4xl text-gold leading-none relative z-10">
              {stat.value}
            </span>

            {/* label */}
            <span className="mt-3 text-[10px] tracking-[0.35em] text-white/40 uppercase relative z-10">
              {stat.label}
            </span>

            {/* bottom gold hairline */}
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-2/3 h-px bg-gradient-to-r from-transparent via-gold/20 to-transparent"></div>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
};
