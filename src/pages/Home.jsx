import { motion } from "motion/react";
import { Link } from "react-router-dom";
import { PRODUCTS } from "../types";
import { useDispatch } from "react-redux";
import { addToCart } from "../store/cartSlice";

export default function Home() {
  const dispatch = useDispatch();

  return (
    <div className="overflow-hidden">
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center justify-center bg-luxury-bg overflow-hidden">
        <div className="absolute inset-0 opacity-[0.35] bg-[radial-gradient(circle,rgba(184,146,42,0.18)_1px,transparent_1px)] bg-[size:38px_38px]" />

        <div
          className="absolute right-[-80px] top-1/2 -translate-y-1/2 font-display font-bold text-[420px] leading-none text-transparent border-title select-none pointer-events-none opacity-[0.055]"
          style={{ WebkitTextStroke: "1px var(--color-gold)" }}
        >
          CM
        </div>

        <div className="relative z-10 text-center px-6">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-[10px] tracking-[0.8em] text-gold uppercase mb-8 flex items-center justify-center gap-4"
          >
            <span className="opacity-50">──</span> Luxury Fragrances · Pakistan{" "}
            <span className="opacity-50">──</span>
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="font-display text-[clamp(70px,12vw,150px)] font-bold leading-none text-luxury-dark tracking-[0.05em] mb-2"
          >
            C.M
          </motion.h1>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="font-display text-[clamp(18px,3.5vw,38px)] text-gold tracking-[0.6em] uppercase"
          >
            Scents
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9 }}
            className="font-serif italic text-lg text-luxury-muted tracking-[0.15em] mt-8 mb-12"
          >
            Crafted to Leave an Impression
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.1 }}
            className="flex flex-col sm:flex-row gap-6 justify-center items-center"
          >
            <Link
              to="/collection"
              className="bg-gold hover:bg-gold-dark text-white px-12 py-4 text-[10px] tracking-[0.4em] uppercase transition-all hover:-translate-y-1 shadow-lg shadow-gold/20"
            >
              Explore Collection
            </Link>
            <Link
              to="/order"
              className="border-1.5 border-gold text-gold hover:bg-gold hover:text-white px-12 py-4 text-[10px] tracking-[0.4em] uppercase transition-all"
            >
              Order Now
            </Link>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        >
          <span className="text-[8px] tracking-[0.4em] text-luxury-muted uppercase">
            Scroll
          </span>
          <div className="w-[1px] h-12 bg-linear-to-b from-gold to-transparent animate-pulse" />
        </motion.div>
      </section>

      {/* Stats Strip */}
      <section className="bg-luxury-dark grid grid-cols-2 md:grid-cols-4 text-white">
        {[
          { num: "6", label: "Signature Fragrances" },
          { num: "50ml", label: "Eau De Parfum" },
          { num: "100%", label: "Authentic" },
          { num: "🇵🇰", label: "Ships Nationwide" },
        ].map((stat, idx) => (
          <div
            key={idx}
            className="text-center py-10 border-r border-white/5 last:border-r-0"
          >
            <span className="font-display text-3xl text-gold block mb-2">
              {stat.num}
            </span>
            <span className="text-[8px] tracking-[0.4em] uppercase text-white/40">
              {stat.label}
            </span>
          </div>
        ))}
      </section>

      {/* Featured Products */}
      <section className="py-24 px-6 md:px-12 max-w-7xl mx-auto">
        <p className="text-gold text-center text-[10px] tracking-[0.6em] uppercase mb-4">
          ◆ Our Collection ◆
        </p>
        <h2 className="text-center text-4xl mb-4">The Signature Range</h2>
        <p className="font-serif italic text-center text-luxury-muted text-lg mb-20">
          Six distinguished fragrances, each a story unto itself
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {PRODUCTS.slice(0, 3).map((product) => (
            <motion.div
              key={product.id}
              whileHover={{ y: -8 }}
              className="bg-white border border-gold/10 overflow-hidden group relative flex flex-col"
            >
              <div className="aspect-square relative overflow-hidden">
                <div
                  className={`w-full h-full ${product.lbl} flex flex-col items-center justify-center gap-6 p-8`}
                >
                  <div className="w-[1px] h-10 bg-linear-to-b from-transparent via-[#C9A84C] to-transparent" />
                  <div className="font-display text-2xl font-bold text-[#D4A93A] tracking-widest text-center">
                    {product.name}
                  </div>
                  <div className="text-[9px] tracking-[0.5em] text-white/40 uppercase -mt-2">
                    {product.sub}
                  </div>
                  <div className="border border-gold/30 px-3 py-1 text-[8px] tracking-widest uppercase text-[#C9A84C]">
                    Eau de Parfum
                  </div>
                  <div className="text-3xl opacity-80">{product.icon}</div>
                  <div className="font-display text-[9px] tracking-[0.3em] text-[#C9A84C]/40 uppercase mt-2">
                    50ml · 1.7 FL.OZ
                  </div>
                </div>

                <div className="absolute inset-0 bg-luxury-dark/80 flex flex-col items-center justify-center gap-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <button
                    onClick={() => dispatch(addToCart(product))}
                    className="bg-gold hover:bg-gold-dark text-white px-8 py-3 text-[10px] tracking-[0.3em] uppercase transition-colors"
                  >
                    Add to Cart
                  </button>
                  <Link
                    to={`/product/${product.id}`}
                    className="border border-white/30 text-white hover:bg-white hover:text-luxury-dark px-8 py-3 text-[10px] tracking-[0.3em] uppercase transition-colors"
                  >
                    View Details
                  </Link>
                </div>
              </div>

              <div className="p-8 space-y-4 border-t border-luxury-bg2">
                <p className="text-[8px] tracking-[0.4em] text-gold uppercase">
                  {product.category}
                </p>
                <h3 className="font-display text-xl text-luxury-dark tracking-wide">
                  {product.name}
                </h3>
                <p className="font-serif italic text-sm text-luxury-muted leading-relaxed line-clamp-2">
                  {product.desc}
                </p>
                <div className="flex justify-between items-center pt-4">
                  <span className="font-display text-xl text-gold">
                    Rs. {product.price.toLocaleString()}
                  </span>
                  <div className="flex gap-2">
                    {product.notes.slice(0, 2).map((note) => (
                      <span
                        key={note}
                        className="text-[7px] tracking-widest uppercase border border-gold/20 px-2 py-0.5 text-luxury-muted"
                      >
                        {note}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <Link
            to="/collection"
            className="font-display text-xs tracking-[0.4em] uppercase text-gold hover:text-gold-dark transition-colors border-b border-gold/30 pb-2"
          >
            View Full Collection
          </Link>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="bg-luxury-bg2 py-24 scroll-mt-20">
        <div className="max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <div className="hidden lg:flex aspect-[4/5] bg-luxury-dark items-center justify-center relative group">
            <div className="absolute inset-5 border border-gold/20 group-hover:border-gold/40 transition-colors" />
            <span
              className="font-display text-[130px] leading-none text-transparent border-title opacity-20"
              style={{ WebkitTextStroke: "1px var(--color-gold)" }}
            >
              CM
            </span>
          </div>

          <div className="space-y-8">
            <p className="text-gold text-[10px] tracking-[0.6em] uppercase">
              ◆ Our Story ◆
            </p>
            <h2 className="text-4xl text-luxury-dark leading-tight tracking-wide">
              Crafted With Purpose,
              <br />
              Worn with Distinction.
            </h2>
            <div className="font-serif italic text-lg text-luxury-muted leading-relaxed space-y-6">
              <p>
                At <strong className="text-gold font-normal">C.M Scents</strong>
                , every fragrance is born from a passion for artisanal
                perfumery. We believe a great scent is not merely worn — it
                becomes part of you, a silent signature that speaks before you
                do.
              </p>
              <p>
                Our collection spans from the deep mystery of{" "}
                <strong>Tempest Noir</strong> to the vibrant freshness of{" "}
                <strong>Dynamic Mist</strong>, the regal warmth of{" "}
                <strong>Oud Royale</strong>, and the luminous femininity of{" "}
                <strong>Velvet Éclat</strong>.
              </p>
            </div>
            <div className="w-[2px] h-14 bg-linear-to-b from-transparent via-gold to-transparent" />
            <p className="font-display text-xs tracking-[0.4em] text-gold">
              FREE DELIVERY ACROSS PAKISTAN
            </p>
          </div>
        </div>
      </section>

      {/* Contact Section Placeholder/Hook */}
      <section
        id="contact"
        className="py-24 max-w-7xl mx-auto px-6 md:px-12 scroll-mt-20"
      >
        <p className="text-gold text-center text-[10px] tracking-[0.6em] uppercase mb-4">
          ◆ Get In Touch ◆
        </p>
        <h2 className="text-center text-4xl mb-4">Contact Us</h2>
        <p className="font-serif italic text-center text-luxury-muted text-lg mb-16">
          We're here to assist you in finding your signature scent
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { icon: "📱", label: "WhatsApp", value: "+92 300 0000000" },
            { icon: "📦", label: "Delivery", value: "All Pakistan" },
            { icon: "🕐", label: "Hours", value: "9AM – 10PM Daily" },
            { icon: "📸", label: "Instagram", value: "@cmscents" },
          ].map((item, idx) => (
            <div
              key={idx}
              className="bg-white border border-gold/10 p-10 text-center hover:shadow-xl hover:shadow-gold/5 transition-all"
            >
              <div className="text-3xl mb-4">{item.icon}</div>
              <p className="text-gold text-[8px] tracking-[0.4em] uppercase mb-2">
                {item.label}
              </p>
              <p className="font-display text-sm tracking-widest text-luxury-dark uppercase">
                {item.value}
              </p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
