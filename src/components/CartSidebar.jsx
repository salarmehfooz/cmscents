import React from "react";
import { motion, AnimatePresence } from "motion/react";
import { X, Trash2, Plus, Minus } from "lucide-react";

export const CartSidebar = ({
  isOpen,
  onClose,
  cart,
  onUpdateQty,
  onRemove,
}) => {
  /* ---------------- SAFE CART ---------------- */
  const safeCart = (cart || []).map((item) => ({
    ...item,
    price: Number(item.price) || 0,
    qty: Number(item.qty) > 0 ? Number(item.qty) : 1,
  }));

  /* ---------------- SAFE TOTAL ---------------- */
  const subtotal = safeCart.reduce((sum, item) => {
    return sum + item.price * item.qty;
  }, 0);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* BACKDROP */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[300]"
          />

          {/* SIDEBAR */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 28, stiffness: 220 }}
            className="fixed top-0 right-0 bottom-0 w-full md:w-[460px]
                       bg-gradient-to-b from-[#0a0a0a] via-[#0b0b0b] to-[#050505]
                       border-l border-gold/10 z-[400] flex flex-col"
          >
            <div className="flex justify-between items-center p-7 px-8 border-b border-white/10">
              <span className="font-display text-[11px] tracking-[5px] text-gold/80 uppercase">
                Your Selection
              </span>

              <button
                onClick={onClose}
                className="w-9 h-9 rounded-full border border-gold/20 text-white/60
                           hover:border-gold/50 hover:text-gold transition
                           flex items-center justify-center"
              >
                <X size={16} />
              </button>
            </div>

            {/* ITEMS */}
            <div className="flex-1 overflow-y-auto px-8 py-6">
              {safeCart.length === 0 ? (
                <div className="text-center py-[80px]">
                  <p className="font-serif italic text-white/40">
                    Your selection is empty
                  </p>
                </div>
              ) : (
                <div className="space-y-6">
                  {safeCart.map((item) => (
                    <div
                      key={item.id}
                      className="flex gap-4 items-center pb-6 border-b border-white/5"
                    >
                      {/* ICON */}
                      <div className="w-[52px] h-[52px] rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-xl">
                        {item.icon}
                      </div>

                      {/* DETAILS */}
                      <div className="flex-1 min-w-0">
                        <div className="font-display text-[13px] text-white">
                          {item.name}
                        </div>

                        <div className="text-[10px] text-white/40 uppercase mt-1">
                          {item.sub} · 50ml EDP
                        </div>

                        {/* QTY */}
                        <div className="flex items-center gap-3 mt-3">
                          <button
                            onClick={() => onUpdateQty(item.id, -1)}
                            className="w-7 h-7 rounded-full border border-gold/20 text-gold flex items-center justify-center"
                          >
                            <Minus size={12} />
                          </button>

                          <span className="text-white font-display text-sm min-w-[20px] text-center">
                            {item.qty}
                          </span>

                          <button
                            onClick={() => onUpdateQty(item.id, 1)}
                            className="w-7 h-7 rounded-full border border-gold/20 text-gold flex items-center justify-center"
                          >
                            <Plus size={12} />
                          </button>
                        </div>
                      </div>

                      {/* PRICE + REMOVE */}
                      <div className="flex flex-col items-end gap-3">
                        <button
                          onClick={() => onRemove(item.id)}
                          className="text-white/40 hover:text-red-400 transition"
                        >
                          <Trash2 size={16} />
                        </button>

                        <div className="font-display text-gold text-sm">
                          Rs. {(item.price * item.qty).toLocaleString()}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* FOOTER */}
            {safeCart.length > 0 && (
              <div className="p-7 px-8 border-t border-white/10 bg-black/40">
                <div className="flex justify-between mb-6">
                  <span className="text-white/50 uppercase text-[11px]">
                    Total
                  </span>

                  <span className="font-display text-2xl text-gold">
                    Rs. {subtotal.toLocaleString()}
                  </span>
                </div>

                <a
                  href="#order"
                  onClick={onClose}
                  className="block w-full text-center bg-gold text-black py-4 rounded-full"
                >
                  Proceed to Order →
                </a>

                <p className="text-center text-[10px] text-white/30 mt-4 uppercase">
                  Free delivery · COD Available
                </p>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
