import { motion } from "motion/react";
import { Link } from "react-router-dom";
import { PRODUCTS } from "../types";
import { useDispatch } from "react-redux";
import { addToCart } from "../store/cartSlice";
import { isAzadiSaleActive } from "../utils/saleUtils";

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
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mb-8 inline-block select-none"
          >
            <span className="bg-red-600/10 text-red-600 border border-red-600/30 px-5 py-2 text-[10px] tracking-[0.4em] uppercase font-bold rounded-full inline-flex items-center gap-3 backdrop-blur-xs shadow-lg shadow-red-900/5 animate-pulse">
              <span className="w-1.5 h-1.5 rounded-full bg-red-600 relative flex">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-red-600"></span>
              </span>
              Sale Now On
            </span>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-[10px] tracking-[0.8em] text-gold uppercase mb-8 flex items-center justify-center gap-4"
          >
            <span className="opacity-50">──</span> Luxury Fragrances · Pakistan{" "}
            <span className="opacity-50">──</span>
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="font-display text-[clamp(70px,12vw,150px)] font-bold leading-none text-luxury-dark tracking-[0.05em] mb-2"
          >
            C.M
          </motion.h1>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="font-display text-[clamp(18px,3.5vw,38px)] text-gold tracking-[0.6em] uppercase"
          >
            Scents
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.0 }}
            className="font-serif italic text-lg text-luxury-muted tracking-[0.15em] mt-8 mb-2"
          >
            Crafted to Leave an Impression
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.1 }}
            className="text-[10px] tracking-[0.3em] text-[#C9A84C]/80 uppercase font-display mb-12"
          >
            {isAzadiSaleActive()
              ? "◆ 14th August Azadi Grand Sale · Flat 40% Off ◆"
              : "◆ Exceptional Craftsmanship · Pure Luxury ◆"}
          </motion.p>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.7 }}
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
              className="bg-white border border-gold/10 overflow-hidden group relative flex flex-col cursor-pointer"
            >
              <Link
                to={`/product/${product.id}`}
                className="flex flex-col h-full"
              >
                <div className="aspect-square relative overflow-hidden bg-luxury-dark/5">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    referrerPolicy="no-referrer"
                  />

                  {product.originalPrice && (
                    <span className="absolute top-4 left-4 bg-red-600 text-white font-display text-[9px] tracking-[0.2em] uppercase px-3 py-1 pointer-events-none z-10 shadow-lg shadow-red-900/20 animate-pulse">
                      SALE
                    </span>
                  )}

                  {/* Desktop Hover Overlay */}
                  <div className="hidden md:flex absolute inset-0 bg-luxury-dark/80 flex-col items-center justify-center gap-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <button
                      type="button"
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        dispatch(addToCart(product));
                      }}
                      className="bg-gold hover:bg-gold-dark text-white px-8 py-3 text-[10px] tracking-[0.3em] uppercase transition-colors font-bold"
                    >
                      Add to Cart
                    </button>
                    <span className="border border-white/30 text-white hover:bg-white hover:text-luxury-dark px-8 py-3 text-[10px] tracking-[0.3em] uppercase transition-colors font-bold">
                      View Details
                    </span>
                  </div>
                </div>

                <div className="p-8 space-y-4 border-t border-luxury-bg2 flex-1 flex flex-col justify-between">
                  <div className="space-y-2">
                    <p className="text-[8px] tracking-[0.4em] text-gold uppercase">
                      {product.category}
                    </p>
                    <h3 className="font-display text-xl text-luxury-dark tracking-wide group-hover:text-gold transition-colors">
                      {product.name}
                    </h3>
                    <p className="font-serif italic text-sm text-luxury-muted leading-relaxed line-clamp-2">
                      {product.desc}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-gold/5 space-y-4">
                    <div className="flex justify-between items-center">
                      <div className="flex flex-col">
                        {product.originalPrice ? (
                          <div className="flex items-baseline gap-2">
                            <span className="font-display text-base text-luxury-muted line-through">
                              Rs. {product.originalPrice.toLocaleString()}
                            </span>
                            <span className="font-display text-xl text-gold pb-0.5">
                              Rs. {product.price.toLocaleString()}
                            </span>
                          </div>
                        ) : (
                          <span className="font-display text-xl text-gold">
                            Rs. {product.price.toLocaleString()}
                          </span>
                        )}
                      </div>
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

                    {/* Mobile Quick Tap Buttons */}
                    <div className="md:hidden flex gap-2 pt-2">
                      <span className="flex-1 text-center border border-gold text-gold py-2.5 text-[9px] tracking-[0.2em] uppercase font-bold bg-white">
                        View Details
                      </span>
                      <button
                        type="button"
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          dispatch(addToCart(product));
                        }}
                        className="flex-1 text-center bg-gold text-white py-2.5 text-[9px] tracking-[0.2em] uppercase font-bold"
                      >
                        Add to Cart
                      </button>
                    </div>
                  </div>
                </div>
              </Link>
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

      {/* Contact Section */}
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
          <a
            href={`https://wa.me/${import.meta.env.VITE_WHATSAPP_NUMBER || "923000000000"}`}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-white border border-gold/10 hover:border-gold p-8 text-center hover:shadow-xl hover:shadow-gold/5 transition-all group cursor-pointer block"
          >
            <div className="text-3xl mb-3 group-hover:scale-110 transition-transform">
              📱
            </div>
            <p className="text-gold text-[8px] tracking-[0.4em] uppercase mb-2 font-bold">
              WhatsApp Line 1
            </p>
            <p className="font-display text-sm tracking-widest text-luxury-dark uppercase group-hover:text-gold transition-colors font-bold">
              {import.meta.env.VITE_WHATSAPP_DISPLAY || "+92 300 0000000"}
            </p>
            <span className="text-[9px] text-green-600 font-sans tracking-wider mt-2 block font-medium">
              💬 Tap to Chat
            </span>
          </a>

          <a
            href={`https://wa.me/${import.meta.env.VITE_WHATSAPP_NUMBER_2 || "923280000000"}`}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-white border border-gold/10 hover:border-gold p-8 text-center hover:shadow-xl hover:shadow-gold/5 transition-all group cursor-pointer block"
          >
            <div className="text-3xl mb-3 group-hover:scale-110 transition-transform">
              📱
            </div>
            <p className="text-gold text-[8px] tracking-[0.4em] uppercase mb-2 font-bold">
              WhatsApp Line 2
            </p>
            <p className="font-display text-sm tracking-widest text-luxury-dark uppercase group-hover:text-gold transition-colors font-bold">
              {import.meta.env.VITE_WHATSAPP_DISPLAY_2 || "+92 328 0000000"}
            </p>
            <span className="text-[9px] text-green-600 font-sans tracking-wider mt-2 block font-medium">
              💬 Tap to Chat
            </span>
          </a>

          <div className="bg-white border border-gold/10 p-8 text-center">
            <div className="text-3xl mb-3">📦</div>
            <p className="text-gold text-[8px] tracking-[0.4em] uppercase mb-2 font-bold">
              Nationwide Delivery
            </p>
            <p className="font-display text-sm tracking-widest text-luxury-dark uppercase">
              All Over Pakistan
            </p>
            <span className="text-[9px] text-luxury-muted tracking-wider mt-2 block">
              Fast 2-4 Days Shipping
            </span>
          </div>

          <a
            href="https://www.instagram.com/c.mscentss"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-white border border-gold/10 hover:border-gold p-8 text-center hover:shadow-xl hover:shadow-gold/5 transition-all group cursor-pointer block"
          >
            <div className="text-3xl mb-3 group-hover:scale-110 transition-transform">
              📸
            </div>
            <p className="text-gold text-[8px] tracking-[0.4em] uppercase mb-2 font-bold font-display">
              Instagram
            </p>
            <p className="font-display text-sm tracking-widest text-luxury-dark uppercase group-hover:text-gold transition-colors">
              @c.mscentss
            </p>
            <span className="text-[9px] text-luxury-muted tracking-wider mt-2 block">
              Follow Our Journey
            </span>
          </a>
        </div>
      </section>
    </div>
  );
}
