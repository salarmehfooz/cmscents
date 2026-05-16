import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Logo } from './Logo';

export const Navbar = ({ onOpenCart, cartCount }) => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 60);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav 
      className={`fixed top-0 left-0 right-0 z-[200] flex items-center justify-between px-5 md:px-[60px] transition-all duration-400 bg-black-rich border-b border-gold/20 ${
        scrolled ? 'h-[75px] shadow-[0_4px_40px_rgba(0,0,0,0.5)]' : 'h-[90px]'
      }`}
    >
      <a href="#" className="no-underline transition-transform hover:scale-105 active:scale-95">
        <Logo size="sm" />
      </a>

      <ul className="hidden md:flex gap-9 list-none">
        {['Collection', 'Our Story', 'Order', 'Contact'].map((item) => (
          <li key={item}>
            <a 
              href={`#${item.toLowerCase().replace(' ', '-')}`}
              className="text-[10px] tracking-[3px] uppercase text-white/50 no-underline transition-colors relative pb-1 hover:text-gold after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:height-[1px] after:bg-gold after:transition-all hover:after:w-full"
            >
              {item}
            </a>
          </li>
        ))}
      </ul>

      <div className="flex items-center gap-4">
        <button 
          onClick={onOpenCart}
          className="flex items-center gap-[10px] bg-transparent border border-gold/40 text-gold px-5 py-2 font-sans text-[10px] tracking-[3px] uppercase cursor-pointer transition-all hover:bg-gold hover:text-black-rich hover:border-gold"
        >
          <span className="hidden sm:inline">♛</span> Cart
          <AnimatePresence mode="popLayout">
            <motion.span 
              key={cartCount}
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 1.5, opacity: 0 }}
              className="bg-gold text-black-rich rounded-full w-[18px] height-[18px] text-[10px] flex items-center justify-center font-bold"
            >
              {cartCount}
            </motion.span>
          </AnimatePresence>
        </button>
      </div>
    </nav>
  );
};
