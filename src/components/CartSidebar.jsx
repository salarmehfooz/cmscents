import { X, Minus, Plus, Trash2, Sparkles, CheckCircle2 } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { toggleCart, updateQuantity, removeFromCart } from "../store/cartSlice";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "motion/react";
import { calculateCartTotals, isSaleActive } from "../utils/saleUtils";

export default function CartSidebar() {
  const dispatch = useDispatch();
  const { items, isOpen } = useSelector((state) => state.cart);

  const {
    total,
    totalSavings,
    bundleApplied,
    bundleSavings,
    bundleCount,
    totalItemsCount,
    itemsToNextBundle,
  } = calculateCartTotals(items);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => dispatch(toggleCart())}
            className="fixed inset-0 bg-luxury-dark/60 backdrop-blur-sm z-[100]"
          />

          {/* Sidebar */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed top-0 right-0 h-full w-full max-w-md bg-white border-l border-gold/20 shadow-2xl z-[101] flex flex-col"
          >
            <div className="p-8 flex justify-between items-center border-b border-luxury-bg2">
              <h2 className="font-display text-lg tracking-[0.2em] text-luxury-dark">
                YOUR SELECTION
              </h2>
              <button
                onClick={() => dispatch(toggleCart())}
                className="p-2 border border-gold/20 rounded-none text-luxury-muted hover:text-gold hover:border-gold transition-all cursor-pointer"
              >
                <X size={20} />
              </button>
            </div>

            {/* Special Offer Alert Banner in Cart */}
            {isSaleActive() && items.length > 0 && (
              <div className="px-6 pt-4">
                {bundleApplied ? (
                  <div className="bg-[#0A160E] border border-gold/40 p-3 text-gold-light text-xs flex items-center gap-3">
                    <CheckCircle2
                      size={18}
                      className="text-emerald-400 shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <p className="font-display font-bold text-white tracking-wider uppercase text-[11px]">
                        {bundleCount > 1
                          ? `${bundleCount}x 3-Packs Bundle Applied!`
                          : "Bundle Applied: 3 for Rs. 5,000!"}
                      </p>
                      <p className="text-[10px] text-gray-300">
                        {bundleSavings > 0
                          ? `Saved extra Rs. ${bundleSavings.toLocaleString()} on top of 20% off!`
                          : "Enjoy 3 perfumes for Rs. 5,000!"}
                      </p>
                    </div>
                  </div>
                ) : (
                  <div className="bg-amber-950/20 border border-gold/30 p-3 text-luxury-dark text-xs flex items-center justify-between gap-3">
                    <div className="flex items-center gap-2 min-w-0">
                      <Sparkles size={16} className="text-gold shrink-0" />
                      <p className="text-[11px] leading-tight text-luxury-dark">
                        Add{" "}
                        <span className="font-bold text-red-600">
                          {itemsToNextBundle} more{" "}
                          {itemsToNextBundle === 1 ? "bottle" : "bottles"}
                        </span>{" "}
                        to unlock{" "}
                        <strong className="font-bold text-gold-dark">
                          3 for Rs. 5,000!
                        </strong>
                      </p>
                    </div>
                    <Link
                      to="/collection"
                      onClick={() => dispatch(toggleCart())}
                      className="text-[9px] uppercase tracking-wider font-bold bg-gold hover:bg-gold-dark text-white px-2.5 py-1.5 shrink-0 transition-colors"
                    >
                      + Add
                    </Link>
                  </div>
                )}
              </div>
            )}

            <div className="flex-1 overflow-y-auto p-6 sm:p-8 space-y-6">
              {items.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center space-y-4">
                  <p className="font-serif italic text-xl text-luxury-muted">
                    Your selection is currently empty.
                  </p>
                  <Link
                    to="/collection"
                    onClick={() => dispatch(toggleCart())}
                    className="text-gold tracking-[0.3em] text-xs uppercase hover:underline"
                  >
                    Discover our fragrances
                  </Link>
                </div>
              ) : (
                items.map((item) => (
                  <div
                    key={item.id}
                    className="flex gap-4 pb-6 border-b border-luxury-bg2 group"
                  >
                    <div className="w-20 h-24 overflow-hidden relative border border-gold/10 flex items-center justify-center bg-white shrink-0">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-cover"
                        referrerPolicy="no-referrer"
                      />
                    </div>
                    <div className="flex-1 space-y-1">
                      <div className="flex justify-between items-start">
                        <h3 className="font-display text-sm text-luxury-dark tracking-wide">
                          {item.name}
                        </h3>
                        <button
                          onClick={() => dispatch(removeFromCart(item.id))}
                          className="text-luxury-muted hover:text-red-500 transition-colors opacity-0 group-hover:opacity-100 cursor-pointer"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                      <p className="text-[10px] text-luxury-muted tracking-[0.2em] uppercase">
                        {item.sub} · 50ml
                      </p>

                      <div className="flex justify-between items-center pt-2">
                        <div className="flex items-center gap-4 border border-gold/10 px-2 py-1">
                          <button
                            onClick={() =>
                              dispatch(
                                updateQuantity({
                                  id: item.id,
                                  quantity: item.quantity - 1,
                                }),
                              )
                            }
                            className="text-gold hover:scale-110 transition-transform cursor-pointer"
                          >
                            <Minus size={14} />
                          </button>
                          <span className="font-display text-sm min-w-[20px] text-center">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() =>
                              dispatch(
                                updateQuantity({
                                  id: item.id,
                                  quantity: item.quantity + 1,
                                }),
                              )
                            }
                            className="text-gold hover:scale-110 transition-transform cursor-pointer"
                          >
                            <Plus size={14} />
                          </button>
                        </div>
                        <div className="flex flex-col items-end">
                          {item.originalPrice && (
                            <span className="text-[10px] text-luxury-muted line-through leading-none mb-1">
                              Rs.{" "}
                              {(
                                item.originalPrice * item.quantity
                              ).toLocaleString()}
                            </span>
                          )}
                          <span className="font-display text-sm text-gold">
                            Rs. {(item.price * item.quantity).toLocaleString()}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {items.length > 0 && (
              <div className="p-6 sm:p-8 border-t border-gold/10 space-y-5 bg-white">
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="font-display tracking-[0.3em] text-sm text-luxury-dark">
                      TOTAL
                    </span>
                    <span className="font-display text-2xl text-gold font-bold">
                      Rs. {total.toLocaleString()}
                    </span>
                  </div>
                  {bundleApplied && (
                    <div className="flex justify-between items-center text-[10px] tracking-widest uppercase text-emerald-800 font-bold bg-emerald-50 px-3 py-1.5 border border-emerald-600/20">
                      <span>BUNDLE OFFER (3 FOR RS. 5,000)</span>
                      <span>ACTIVE ✓</span>
                    </div>
                  )}
                  {totalSavings > 0 && (
                    <div className="flex justify-between items-center text-[10px] tracking-widest uppercase text-green-700 font-bold bg-green-500/10 px-3 py-1.5 border border-green-600/20">
                      <span>YOUR TOTAL SAVINGS</span>
                      <span>Rs. {totalSavings.toLocaleString()}</span>
                    </div>
                  )}
                </div>
                <Link
                  to="/order"
                  onClick={() => dispatch(toggleCart())}
                  className="block w-full bg-gold hover:bg-gold-dark text-white text-center py-4 font-display text-sm tracking-[0.3em] transition-all hover:scale-[1.02] shadow-gold/20"
                >
                  PROCEED TO ORDER
                </Link>
                <p className="text-center text-[10px] text-luxury-muted tracking-widest uppercase">
                  Free Delivery Nationwide · COD Available
                </p>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
