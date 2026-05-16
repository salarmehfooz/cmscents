import React from "react";
import { motion } from "motion/react";
import { Logo } from "./Logo";

/* ================= CONTACT ================= */

const contactCards = [
  { icon: "📱", lbl: "WhatsApp", val: "+92 XXX XXXXXXX" },
  { icon: "📦", lbl: "Delivery", val: "All Pakistan" },
  { icon: "🕐", lbl: "Hours", val: "9AM – 10PM Daily" },
  { icon: "📸", lbl: "Instagram", val: "@cmscents" },
];

export const ContactSection = () => {
  return (
    <section
      id="contact"
      className="relative py-[110px] bg-gradient-to-b from-[#0b0b0b] via-[#090909] to-[#050505] overflow-hidden"
    >
      {/* gold ambient glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(201,168,76,0.12),transparent_60%)] pointer-events-none"></div>

      <div className="max-w-[1380px] mx-auto px-5 md:px-[60px] relative z-10">
        <motion.p className="sec-eyebrow text-gold">◆ Get In Touch ◆</motion.p>

        <motion.h2 className="sec-title text-white">Contact Us</motion.h2>

        <motion.p className="sec-sub text-white/50">
          We’re here to assist you with your fragrance journey
        </motion.p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mt-14">
          {contactCards.map((card, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className="group relative p-8 text-center rounded-2xl
                         bg-white/5 border border-white/10
                         backdrop-blur-xl overflow-hidden
                         hover:border-gold/30 transition"
            >
              {/* gold glow hover */}
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition
                              bg-[radial-gradient(circle,rgba(201,168,76,0.08),transparent_60%)]"
              ></div>

              <div className="text-2xl mb-4">{card.icon}</div>

              <div className="text-[9px] tracking-[4px] text-gold uppercase mb-2">
                {card.lbl}
              </div>

              <div className="font-display text-sm text-white/80">
                {card.val}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

/* ================= FOOTER ================= */

export const Footer = () => {
  return (
    <footer className="relative bg-black-rich border-t border-white/10 overflow-hidden">
      {/* subtle gold glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom,rgba(201,168,76,0.08),transparent_65%)]"></div>

      <div
        className="max-w-[1380px] mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-[2fr_1fr_1fr_1fr]
                      gap-14 px-5 md:px-[60px] py-[80px] relative z-10"
      >
        {/* BRAND */}
        <div>
          <Logo size="md" className="!items-start mb-6" />

          <p className="font-serif italic text-[13px] text-white/40 leading-[1.9] mb-6">
            Crafted to Leave an Impression. Each fragrance is a journey — from
            first spritz to final lingering note.
          </p>

          <div className="text-[11px] text-white/25 leading-[2.2]">
            <span className="text-gold text-[9px] tracking-[3px] uppercase block mb-2">
              Contact
            </span>
            WhatsApp: +92 XXX XXXXXXX <br />
            Email: info@cmscents.pk <br />
            Pakistan — Nationwide Delivery
          </div>
        </div>

        {/* COLLECTION */}
        <div>
          <div className="text-[9px] tracking-[5px] text-gold uppercase mb-6">
            Collection
          </div>

          <ul className="space-y-3">
            {[
              "Dynamic Mist",
              "Tempest Noir",
              "Executive Code",
              "Oud Royale",
              "Velvet Éclat",
              "Citrus Elixir",
            ].map((item) => (
              <li key={item}>
                <a
                  href="#collection"
                  className="text-sm text-white/30 hover:text-gold transition"
                >
                  {item}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* INFO */}
        <div>
          <div className="text-[9px] tracking-[5px] text-gold uppercase mb-6">
            Information
          </div>

          <ul className="space-y-3">
            {["Our Story", "How to Order", "Contact", "Return Policy"].map(
              (item) => (
                <li key={item}>
                  <a
                    href={`#${item.toLowerCase().replace(" ", "-")}`}
                    className="text-sm text-white/30 hover:text-gold transition"
                  >
                    {item}
                  </a>
                </li>
              ),
            )}
          </ul>
        </div>

        {/* POLICIES */}
        <div>
          <div className="text-[9px] tracking-[5px] text-gold uppercase mb-6">
            Policies
          </div>

          <ul className="space-y-3">
            {["Privacy Policy", "COD Policy", "Authenticity"].map((item) => (
              <li key={item}>
                <a
                  href="#"
                  className="text-sm text-white/30 hover:text-gold transition"
                >
                  {item}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* BOTTOM BAR */}
      <div
        className="max-w-[1380px] mx-auto border-t border-white/10 px-5 md:px-[60px]
                      py-6 flex flex-col md:flex-row justify-between items-center gap-4"
      >
        <span className="text-[10px] text-white/20 tracking-[2px]">
          © 2025 C.M Scents. All rights reserved.
        </span>

        <div className="flex gap-3">
          {["f", "in", "✦"].map((social) => (
            <a
              key={social}
              href="#"
              className="w-9 h-9 rounded-full border border-white/10
                         flex items-center justify-center
                         text-white/30 hover:text-gold hover:border-gold
                         transition"
            >
              {social}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
};
