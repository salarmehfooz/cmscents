import { motion } from "motion/react";
import { Phone, Mail, MapPin, Instagram, Facebook, Send } from "lucide-react";
import { useState } from "react";

export default function Contact() {
  const [isSent, setIsSent] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSent(true);
    setTimeout(() => setIsSent(false), 5000);
  };

  return (
    <div className="py-24 px-6 md:px-12 max-w-7xl mx-auto min-h-screen">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center space-y-4 mb-20"
      >
        <p className="text-gold text-[10px] tracking-[0.8em] uppercase">
          ◆ Connect ◆
        </p>
        <h1 className="text-5xl text-luxury-dark">Contact Us</h1>
        <div className="w-12 h-[1px] bg-gold mx-auto mt-6" />
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
        <div className="space-y-12">
          <div className="space-y-6">
            <h2 className="text-2xl text-luxury-dark font-display border-b border-gold/10 pb-4">
              Speak with Us
            </h2>
            <p className="font-serif italic text-lg text-luxury-muted leading-relaxed">
              Whether you're seeking a signature scent or inquiring about an
              order, we're here to provide personalized guidance.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
            <div className="space-y-4">
              <div className="flex items-center gap-3 text-gold">
                <Phone size={18} />
                <span className="text-[10px] tracking-[0.3em] uppercase font-bold text-luxury-muted">
                  Inquiries
                </span>
              </div>
              <p className="font-display text-sm tracking-widest text-luxury-dark">
                +92 300 0000000
              </p>
            </div>
            <div className="space-y-4">
              <div className="flex items-center gap-3 text-gold">
                <Mail size={18} />
                <span className="text-[10px] tracking-[0.3em] uppercase font-bold text-luxury-muted">
                  Email
                </span>
              </div>
              <p className="font-display text-sm tracking-widest text-luxury-dark uppercase">
                info@cmscents.pk
              </p>
            </div>
            <div className="space-y-4">
              <div className="flex items-center gap-3 text-gold">
                <MapPin size={18} />
                <span className="text-[10px] tracking-[0.3em] uppercase font-bold text-luxury-muted">
                  Studio
                </span>
              </div>
              <p className="font-display text-sm tracking-widest text-luxury-dark uppercase">
                Lahore, Pakistan
              </p>
            </div>
            <div className="space-y-4 text-gold">
              <div className="flex gap-4">
                <a
                  href="#"
                  className="w-10 h-10 border border-gold/20 flex items-center justify-center hover:border-gold hover:text-gold transition-all"
                >
                  <Instagram size={18} />
                </a>
                <a
                  href="#"
                  className="w-10 h-10 border border-gold/20 flex items-center justify-center hover:border-gold hover:text-gold transition-all"
                >
                  <Facebook size={18} />
                </a>
              </div>
              <span className="text-[8px] tracking-[0.4em] uppercase font-bold block mt-2">
                Follow our journey
              </span>
            </div>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-white border border-gold/10 p-10 md:p-12"
        >
          {isSent ? (
            <div className="h-full flex flex-col items-center justify-center text-center space-y-6 py-20">
              <div className="w-16 h-16 bg-gold/10 text-gold rounded-full flex items-center justify-center">
                <Send size={24} />
              </div>
              <h3 className="font-display text-xl text-luxury-dark font-bold">
                MESSAGE RECEIVED
              </h3>
              <p className="font-serif italic text-luxury-muted text-lg">
                Thank you for reaching out. A specialist will contact you
                shortly.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-8">
              <div className="space-y-2">
                <label className="text-[10px] tracking-widest uppercase text-luxury-muted">
                  Full Name
                </label>
                <input
                  required
                  type="text"
                  className="w-full border-b border-gold/20 focus:border-gold outline-none py-3 transition-colors bg-transparent"
                />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] tracking-widest uppercase text-luxury-muted">
                  Email Address
                </label>
                <input
                  required
                  type="email"
                  className="w-full border-b border-gold/20 focus:border-gold outline-none py-3 transition-colors bg-transparent"
                />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] tracking-widest uppercase text-luxury-muted">
                  Your Message
                </label>
                <textarea
                  required
                  className="w-full border-b border-gold/20 focus:border-gold outline-none py-3 transition-colors bg-transparent min-h-[120px] resize-none"
                />
              </div>
              <button className="w-full bg-luxury-dark text-white hover:bg-gold py-5 font-display text-xs tracking-[0.5em] uppercase transition-all">
                Send Message ♛
              </button>
            </form>
          )}
        </motion.div>
      </div>
    </div>
  );
}
