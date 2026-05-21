import { Link } from "react-router-dom";
import {
  Instagram,
  Facebook,
  Linkedin,
  Mail,
  Phone,
  MapPin,
} from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-luxury-dark pt-24 pb-12 px-6 md:px-12 text-white/80">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-20 border-b border-gold/10 pb-20">
        <div className="space-y-6">
          <Link to="/" className="inline-flex flex-col items-start group">
            <span className="font-display text-3xl tracking-[0.4em] text-gold group-hover:text-gold-light transition-colors">
              C.M
            </span>
            <span className="text-[10px] tracking-[0.4em] text-white/40 uppercase -mt-1">
              Scents
            </span>
          </Link>
          <p className="font-serif italic text-sm leading-relaxed text-white/50 max-w-xs">
            Crafted to leave an impression. Each fragrance is a journey — from
            the first spritz to the final lingering note.
          </p>
          <div className="space-y-4 pt-4">
            <div className="flex items-center gap-3 text-xs tracking-widest uppercase text-gold">
              <Phone size={14} />
              <span>+92 300 0000000</span>
            </div>
            <div className="flex items-center gap-3 text-xs tracking-widest uppercase text-gold">
              <Mail size={14} />
              <span>info@cmscents.pk</span>
            </div>
            <div className="flex items-center gap-3 text-xs tracking-widest uppercase text-gold">
              <MapPin size={14} />
              <span>Lahore, Pakistan</span>
            </div>
          </div>
        </div>

        <div>
          <h3 className="font-display text-xs tracking-[0.5em] text-gold uppercase mb-10 border-b border-gold/20 pb-4">
            Collection
          </h3>
          <ul className="space-y-4">
            {[
              "Dynamic Mist",
              "Tempest Noir",
              "Executive Code",
              "Oud Royale",
              "Velvet Éclat",
              "Citrus Elixir",
            ].map((item) => (
              <li key={item}>
                <Link
                  to="/collection"
                  className="text-xs tracking-widest uppercase hover:text-gold transition-colors block underline-offset-8 hover:underline"
                >
                  {item}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="font-display text-xs tracking-[0.5em] text-gold uppercase mb-10 border-b border-gold/20 pb-4">
            Information
          </h3>
          <ul className="space-y-4">
            <li>
              <Link
                to="/#about"
                className="text-xs tracking-widest uppercase hover:text-gold transition-colors block"
              >
                Our Story
              </Link>
            </li>
            <li>
              <Link
                to="/how-to-order"
                className="text-xs tracking-widest uppercase hover:text-gold transition-colors block"
              >
                How to Order
              </Link>
            </li>
            <li>
              <Link
                to="/contact"
                className="text-xs tracking-widest uppercase hover:text-gold transition-colors block"
              >
                Contact Us
              </Link>
            </li>
            <li>
              <Link
                to="/return-policy"
                className="text-xs tracking-widest uppercase hover:text-gold transition-colors block"
              >
                Return Policy
              </Link>
            </li>
            <li>
              <Link
                to="/authenticity"
                className="text-xs tracking-widest uppercase hover:text-gold transition-colors block"
              >
                Authenticity
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="font-display text-xs tracking-[0.5em] text-gold uppercase mb-10 border-b border-gold/20 pb-4">
            Follow Us
          </h3>
          <p className="text-xs tracking-widest uppercase mb-6 leading-relaxed">
            Stay updated with our latest releases and artisanal scent stories.
          </p>
          <div className="flex gap-4">
            <a
              href="#"
              className="w-10 h-10 border border-gold/30 flex items-center justify-center hover:border-gold hover:text-gold transition-all"
            >
              <Instagram size={16} />
            </a>
            <a
              href="#"
              className="w-10 h-10 border border-gold/30 flex items-center justify-center hover:border-gold hover:text-gold transition-all"
            >
              <Facebook size={16} />
            </a>
            <a
              href="#"
              className="w-10 h-10 border border-gold/30 flex items-center justify-center hover:border-gold hover:text-gold transition-all"
            >
              <Linkedin size={16} />
            </a>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
        <p className="text-[10px] tracking-widest uppercase text-white/30">
          © 2024 C.M Scents. All rights reserved.
        </p>
        <div className="flex gap-8">
          <a
            href="#"
            className="text-[10px] tracking-widest uppercase text-white/30 hover:text-gold"
          >
            Privacy Policy
          </a>
          <a
            href="#"
            className="text-[10px] tracking-widest uppercase text-white/30 hover:text-gold"
          >
            Terms of Service
          </a>
        </div>
      </div>
    </footer>
  );
}
