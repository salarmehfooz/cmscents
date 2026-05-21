import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { ShoppingBag, Menu, X } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { toggleCart } from "../store/cartSlice";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const dispatch = useDispatch();
  const cartItemsCount = useSelector((state) =>
    state.cart.items.reduce((total, item) => total + item.quantity, 0),
  );

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Collection", path: "/collection" },
    { name: "Our Story", path: "/#about" },
    { name: "Contact", path: "/contact" },
  ];

  return (
    <nav
      className={cn(
        "glass-nav h-20 flex items-center justify-between px-6 md:px-12",
        isScrolled && "shadow-md shadow-gold/10",
      )}
    >
      {/* Mobile Menu Toggle */}
      <button
        className="md:hidden text-luxury-muted p-2"
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
      >
        {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Brand Logo */}
      <Link to="/" className="flex flex-col items-center group">
        <span className="font-display text-2xl tracking-[0.4em] text-gold group-hover:text-gold-dark transition-colors">
          C.M
        </span>
        <span className="text-[10px] tracking-[0.4em] text-luxury-muted uppercase -mt-1">
          Scents
        </span>
      </Link>

      {/* Desktop Links */}
      <ul className="hidden md:flex gap-10">
        {navLinks.map((link) => (
          <li key={link.name}>
            <Link
              to={link.path}
              className={cn(
                "text-[10px] tracking-[0.3em] uppercase text-luxury-muted hover:text-gold transition-colors font-medium",
                location.pathname === link.path && "text-gold",
              )}
            >
              {link.name}
            </Link>
          </li>
        ))}
      </ul>

      {/* Actions */}
      <div className="flex items-center gap-4">
        <button
          onClick={() => dispatch(toggleCart())}
          className="flex items-center gap-3 bg-gold hover:bg-gold-dark text-white px-5 py-2.5 rounded-none text-[10px] tracking-[0.3em] uppercase font-bold transition-all hover:-translate-y-0.5"
        >
          <span className="hidden sm:inline">♛ Cart</span>
          <ShoppingBag size={14} className="sm:hidden" />
          <span className="bg-white text-gold w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold">
            {cartItemsCount}
          </span>
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="absolute top-20 left-0 w-full bg-luxury-bg border-b border-gold/10 p-8 flex flex-col gap-6 md:hidden animate-in fade-in slide-in-from-top-4 duration-300">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              onClick={() => setIsMobileMenuOpen(false)}
              className="text-sm tracking-[0.3em] uppercase text-luxury-muted active:text-gold font-medium"
            >
              {link.name}
            </Link>
          ))}
        </div>
      )}
    </nav>
  );
}
