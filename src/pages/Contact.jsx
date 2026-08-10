import { motion } from 'motion/react';
import { Phone, Mail, MapPin, Instagram, Facebook, Send } from 'lucide-react';
import { useState } from 'react';

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
        <p className="text-gold text-[10px] tracking-[0.8em] uppercase">◆ Connect ◆</p>
        <h1 className="text-5xl text-luxury-dark">Contact Us</h1>
        <div className="w-12 h-[1px] bg-gold mx-auto mt-6" />
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
        <div className="space-y-12">
          <div className="space-y-6">
            <h2 className="text-2xl text-luxury-dark font-display border-b border-gold/10 pb-4">Speak with Us</h2>
            <p className="font-serif italic text-lg text-luxury-muted leading-relaxed">
              Whether you're seeking a signature scent or inquiring about an order, we're here to provide personalized guidance.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
            <div className="space-y-4">
              <div className="flex items-center gap-3 text-gold">
                <Phone size={18} />
                <span className="text-[10px] tracking-[0.3em] uppercase font-bold text-luxury-muted">WhatsApp & Support</span>
              </div>
              <div className="space-y-2">
                <a 
                  href={`https://wa.me/${import.meta.env.VITE_WHATSAPP_NUMBER || '923000000000'}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-display text-sm tracking-widest text-luxury-dark hover:text-gold transition-colors flex items-center gap-2 group"
                >
                  <span className="font-bold">{import.meta.env.VITE_WHATSAPP_DISPLAY || '+92 300 0000000'}</span>
                  <span className="text-[9px] text-green-600 bg-green-50 px-2 py-0.5 border border-green-200 uppercase font-sans tracking-wider">Line 1</span>
                </a>
                <a 
                  href={`https://wa.me/${import.meta.env.VITE_WHATSAPP_NUMBER_2 || '923280000000'}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-display text-sm tracking-widest text-luxury-dark hover:text-gold transition-colors flex items-center gap-2 group"
                >
                  <span className="font-bold">{import.meta.env.VITE_WHATSAPP_DISPLAY_2 || '+92 328 0000000'}</span>
                  <span className="text-[9px] text-green-600 bg-green-50 px-2 py-0.5 border border-green-200 uppercase font-sans tracking-wider">Line 2</span>
                </a>
              </div>
            </div>
            <div className="space-y-4">
              <div className="flex items-center gap-3 text-gold">
                <Mail size={18} />
                <span className="text-[10px] tracking-[0.3em] uppercase font-bold text-luxury-muted">Email</span>
              </div>
              <p className="font-display text-sm tracking-widest text-luxury-dark uppercase">cmscentspk@gmail.com</p>
            </div>
            <div className="space-y-4">
              <div className="flex items-center gap-3 text-gold">
                <MapPin size={18} />
                <span className="text-[10px] tracking-[0.3em] uppercase font-bold text-luxury-muted">Studio</span>
              </div>
              <p className="font-display text-sm tracking-widest text-luxury-dark uppercase">Hyderabad, Pakistan</p>
            </div>
            <div className="space-y-4 text-gold">
              <div className="flex gap-4">
                <a 
                  href="https://www.facebook.com/people/CM-Scents/61591101163081/?mibextid=wwXIfr" 
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Facebook"
                  className="w-10 h-10 border border-gold/20 flex items-center justify-center hover:border-gold hover:text-gold transition-all"
                >
                  <Facebook size={18} />
                </a>
                <a 
                  href="https://www.tiktok.com/@c.mscents?_r=1&_t=ZS-97VTDUBgAQq" 
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="TikTok"
                  className="w-10 h-10 border border-gold/20 flex items-center justify-center hover:border-gold hover:text-gold transition-all"
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M19.589 6.686a4.793 4.793 0 0 1-3.77-4.245V2h-3.445v13.672a2.896 2.896 0 0 1-2.901 2.892 2.895 2.895 0 0 1-2.892-2.892 2.895 2.895 0 0 1 2.892-2.892c.319 0 .626.054.912.152V9.414a6.33 6.33 0 0 0-.912-.066 6.338 6.338 0 0 0-6.338 6.338 6.338 6.338 0 0 0 6.338 6.338 6.338 6.338 0 0 0 6.338-6.338V8.919a8.214 8.214 0 0 0 4.887 1.577V7.051a4.815 4.815 0 0 1-1.109-.365z"/>
                  </svg>
                </a>
                <a 
                  href="https://www.instagram.com/c.mscentss" 
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Instagram"
                  className="w-10 h-10 border border-gold/20 flex items-center justify-center hover:border-gold hover:text-gold transition-all"
                >
                  <Instagram size={18} />
                </a>
              </div>
              <span className="text-[8px] tracking-[0.4em] uppercase font-bold block mt-2">Follow our journey</span>
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
              <h3 className="font-display text-xl text-luxury-dark font-bold">MESSAGE RECEIVED</h3>
              <p className="font-serif italic text-luxury-muted text-lg">
                Thank you for reaching out. A specialist will contact you shortly.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-8">
              <div className="space-y-2">
                <label className="text-[10px] tracking-widest uppercase text-luxury-muted">Full Name</label>
                <input 
                  required
                  type="text" 
                  className="w-full border-b border-gold/20 focus:border-gold outline-none py-3 transition-colors bg-transparent"
                />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] tracking-widest uppercase text-luxury-muted">Email Address</label>
                <input 
                  required
                  type="email" 
                  className="w-full border-b border-gold/20 focus:border-gold outline-none py-3 transition-colors bg-transparent"
                />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] tracking-widest uppercase text-luxury-muted">Your Message</label>
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
