import React from "react";
import { motion, AnimatePresence } from "motion/react";

export const SuccessModal = ({ isOpen, onClose }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[500] flex items-center justify-center p-5">
          {/* backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/80 backdrop-blur-md"
          />

          {/* glow background */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(201,168,76,0.12),transparent_60%)]"></div>

          {/* modal */}
          <motion.div
            initial={{ scale: 0.92, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.92, opacity: 0, y: 20 }}
            transition={{ duration: 0.4 }}
            className="relative z-10 w-full max-w-[440px] rounded-2xl border border-gold/20 bg-white/5 backdrop-blur-xl p-12 text-center shadow-[0_30px_120px_rgba(0,0,0,0.6)]"
          >
            {/* gold accent line */}
            <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-gold to-transparent opacity-60"></div>

            {/* icon */}
            <div className="text-gold text-5xl mb-6">✦</div>

            {/* title */}
            <div className="font-display text-[20px] tracking-[4px] text-white mb-4">
              Order Confirmed
            </div>

            {/* text */}
            <p className="font-serif italic text-[15px] text-white/60 leading-[1.8] mb-8">
              Thank you. Our team will contact you on WhatsApp shortly to
              confirm your delivery. Your fragrance will arrive within 2–4
              working days.
            </p>

            {/* button */}
            <button
              onClick={onClose}
              className="w-full bg-gold text-black py-4 rounded-full text-sm tracking-[3px] uppercase hover:scale-[1.02] transition shadow-[0_0_40px_rgba(201,168,76,0.2)]"
            >
              Continue Shopping
            </button>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export const Toast = ({ msg, onClear }) => {
  React.useEffect(() => {
    if (msg) {
      const timer = setTimeout(onClear, 3000);
      return () => clearTimeout(timer);
    }
  }, [msg, onClear]);

  return (
    <AnimatePresence>
      {msg && (
        <motion.div
          initial={{ y: 20, x: "-50%", opacity: 0 }}
          animate={{ y: 0, x: "-50%", opacity: 1 }}
          exit={{ y: 20, x: "-50%", opacity: 0 }}
          transition={{ duration: 0.35 }}
          className="fixed bottom-8 left-1/2 z-[999] px-6 py-3 rounded-full
                     bg-white/5 backdrop-blur-md border border-gold/20
                     text-white/70 text-[11px] tracking-[2px]
                     flex items-center gap-3 shadow-[0_10px_40px_rgba(0,0,0,0.5)]"
        >
          <span className="text-gold text-[10px]">✦</span>
          {msg}
        </motion.div>
      )}
    </AnimatePresence>
  );
};
