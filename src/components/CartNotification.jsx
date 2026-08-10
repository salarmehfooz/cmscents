import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { clearNotification, openCart } from "../store/cartSlice";
import { CheckCircle2, X, ShoppingBag } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

export default function CartNotification() {
  const dispatch = useDispatch();
  const notification = useSelector((state) => state.cart.notification);

  useEffect(() => {
    if (notification) {
      const timer = setTimeout(() => {
        dispatch(clearNotification());
      }, 4000);
      return () => clearTimeout(timer);
    }
  }, [notification, dispatch]);

  return (
    <AnimatePresence>
      {notification && (
        <motion.div
          key={notification.id}
          initial={{ opacity: 0, y: -20, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -20, scale: 0.95 }}
          transition={{ duration: 0.25, ease: "easeOut" }}
          className="fixed top-24 right-4 md:right-8 z-[120] max-w-sm w-[calc(100vw-2rem)] bg-luxury-dark text-white border border-gold/40 shadow-2xl p-4 flex items-center gap-4"
        >
          {notification.image ? (
            <div className="w-12 h-12 bg-white/10 border border-gold/30 shrink-0 overflow-hidden">
              <img
                src={notification.image}
                alt={notification.name}
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
          ) : (
            <div className="w-10 h-10 bg-gold/20 border border-gold/40 flex items-center justify-center shrink-0 text-gold">
              <ShoppingBag size={18} />
            </div>
          )}

          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-1.5 text-gold text-[10px] tracking-[0.2em] uppercase font-bold">
              <CheckCircle2 size={12} className="text-gold" />
              <span>{notification.message}</span>
            </div>
            <p className="font-display text-sm tracking-wide text-white truncate mt-0.5">
              {notification.name}
            </p>
            {notification.price && (
              <p className="text-xs text-gold font-mono font-medium mt-0.5">
                Rs. {notification.price.toLocaleString()}
              </p>
            )}
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={() => {
                dispatch(openCart());
                dispatch(clearNotification());
              }}
              className="bg-gold hover:bg-gold-dark text-white text-[9px] tracking-widest uppercase font-bold px-3 py-2 transition-colors whitespace-nowrap"
            >
              View
            </button>
            <button
              onClick={() => dispatch(clearNotification())}
              className="text-white/60 hover:text-white p-1 transition-colors"
              aria-label="Close notification"
            >
              <X size={16} />
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
