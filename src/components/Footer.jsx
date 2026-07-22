import { Link } from 'react-router-dom';
import { Instagram, Facebook, Mail, Phone, MapPin } from 'lucide-react';

export default function Footer() {
  const whatsapp1 = import.meta.env.VITE_WHATSAPP_NUMBER || '923333641997';
  const whatsappDisplay1 = import.meta.env.VITE_WHATSAPP_DISPLAY || '+92 333 364 1997';
  const whatsapp2 = import.meta.env.VITE_WHATSAPP_NUMBER_2 || '923103648768';
  const whatsappDisplay2 = import.meta.env.VITE_WHATSAPP_DISPLAY_2 || '+92 310 364 8768';

  return (
    <footer className="bg-luxury-dark pt-24 pb-12 px-6 md:px-12 text-white/80">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-20 border-b border-gold/10 pb-20">
        <div className="space-y-6">
          <Link to="/" className="inline-flex flex-col items-start group">
            <span className="font-display text-3xl tracking-[0.4em] text-gold group-hover:text-gold-light transition-colors">C.M</span>
            <span className="text-[10px] tracking-[0.4em] text-white/40 uppercase -mt-1">Scents</span>
          </Link>
          <p className="font-serif italic text-sm leading-relaxed text-white/50 max-w-xs">
            Crafted to leave an impression. Each fragrance is a journey — from the first spritz to the final lingering note.
          </p>
          <div className="space-y-3 pt-4">
            <a 
              href={`https://wa.me/${whatsapp1}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 text-xs tracking-widest uppercase text-gold hover:text-gold-light transition-colors"
            >
              <Phone size={14} />
              <span>{whatsappDisplay1}</span>
            </a>
            <a 
              href={`https://wa.me/${whatsapp2}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 text-xs tracking-widest uppercase text-gold hover:text-gold-light transition-colors"
            >
              <Phone size={14} />
              <span>{whatsappDisplay2}</span>
            </a>
            <div className="flex items-center gap-3 text-xs tracking-widest uppercase text-gold">
              <Mail size={14} />
              <span>cmscentspk@gmail.com</span>
            </div>
            <div className="flex items-center gap-3 text-xs tracking-widest uppercase text-gold">
              <MapPin size={14} />
              <span>Hyderabad, Pakistan</span>
            </div>
          </div>
        </div>

        <div>
          <h3 className="font-display text-xs tracking-[0.5em] text-gold uppercase mb-10 border-b border-gold/20 pb-4">Collection</h3>
          <ul className="space-y-4">
            {['Dynamic Mist', 'Tempest Noir', 'Executive Code', 'Oud Royale', 'Velvet Éclat', 'Citrus Elixir'].map((item) => (
              <li key={item}>
                <Link to="/collection" className="text-xs tracking-widest uppercase hover:text-gold transition-colors block underline-offset-8 hover:underline">
                  {item}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="font-display text-xs tracking-[0.5em] text-gold uppercase mb-10 border-b border-gold/20 pb-4">Information</h3>
          <ul className="space-y-4">
            <li>
              <Link to="/#about" className="text-xs tracking-widest uppercase hover:text-gold transition-colors block">Our Story</Link>
            </li>
            <li>
              <Link to="/how-to-order" className="text-xs tracking-widest uppercase hover:text-gold transition-colors block">How to Order</Link>
            </li>
            <li>
              <Link to="/contact" className="text-xs tracking-widest uppercase hover:text-gold transition-colors block">Contact Us</Link>
            </li>
            <li>
              <Link to="/return-policy" className="text-xs tracking-widest uppercase hover:text-gold transition-colors block">Return Policy</Link>
            </li>
            <li>
              <Link to="/authenticity" className="text-xs tracking-widest uppercase hover:text-gold transition-colors block">Authenticity</Link>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="font-display text-xs tracking-[0.5em] text-gold uppercase mb-10 border-b border-gold/20 pb-4">Follow Us</h3>
          <p className="text-xs tracking-widest uppercase mb-6 leading-relaxed">
            Stay updated with our latest releases and artisanal scent stories.
          </p>
          <div className="flex gap-4">
            <a 
              href="https://www.facebook.com/people/CM-Scents/61591101163081/?mibextid=wwXIfr" 
              target="_blank" 
              rel="noopener noreferrer"
              aria-label="Facebook"
              className="w-10 h-10 border border-gold/30 flex items-center justify-center hover:border-gold hover:text-gold transition-all"
            >
              <Facebook size={16} />
            </a>
            <a 
              href="https://www.tiktok.com/@c.mscents?_r=1&_t=ZS-97VTDUBgAQq" 
              target="_blank" 
              rel="noopener noreferrer"
              aria-label="TikTok"
              className="w-10 h-10 border border-gold/30 flex items-center justify-center hover:border-gold hover:text-gold transition-all"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M19.589 6.686a4.793 4.793 0 0 1-3.77-4.245V2h-3.445v13.672a2.896 2.896 0 0 1-2.901 2.892 2.895 2.895 0 0 1-2.892-2.892 2.895 2.895 0 0 1 2.892-2.892c.319 0 .626.054.912.152V9.414a6.33 6.33 0 0 0-.912-.066 6.338 6.338 0 0 0-6.338 6.338 6.338 6.338 0 0 0 6.338 6.338 6.338 6.338 0 0 0 6.338-6.338V8.919a8.214 8.214 0 0 0 4.887 1.577V7.051a4.815 4.815 0 0 1-1.109-.365z"/>
              </svg>
            </a>
            <a 
              href="https://www.instagram.com/c.mscentss" 
              target="_blank" 
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="w-10 h-10 border border-gold/30 flex items-center justify-center hover:border-gold hover:text-gold transition-all"
            >
              <Instagram size={16} />
            </a>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
        <p className="text-[10px] tracking-widest uppercase text-white/30">
          © 2026 C.M Scents. All rights reserved.
        </p>
        <div className="flex gap-8">
          <a href="#" className="text-[10px] tracking-widest uppercase text-white/30 hover:text-gold">Privacy Policy</a>
          <a href="#" className="text-[10px] tracking-widest uppercase text-white/30 hover:text-gold">Terms of Service</a>
        </div>
      </div>
    </footer>
  );
}
