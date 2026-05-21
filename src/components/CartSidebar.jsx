import { X, Minus, Plus, Trash2 } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { toggleCart, updateQuantity, removeFromCart } from '../store/cartSlice';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';

export default function CartSidebar() {
  const dispatch = useDispatch();
  const { items, isOpen } = useSelector((state) => state.cart);
  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

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
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed top-0 right-0 h-full w-full max-w-md bg-white border-l border-gold/20 shadow-2xl z-[101] flex flex-col"
          >
            <div className="p-8 flex justify-between items-center border-b border-luxury-bg2">
              <h2 className="font-display text-lg tracking-[0.2em] text-luxury-dark">YOUR SELECTION</h2>
              <button 
                onClick={() => dispatch(toggleCart())}
                className="p-2 border border-gold/20 rounded-none text-luxury-muted hover:text-gold hover:border-gold transition-all"
              >
                <X size={20} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-8 space-y-6">
              {items.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center space-y-4">
                  <p className="font-serif italic text-xl text-luxury-muted">Your selection is currently empty.</p>
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
                  <div key={item.id} className="flex gap-4 pb-6 border-b border-luxury-bg2 group">
                    <div className={`w-20 h-24 ${item.lbl} flex items-center justify-center text-2xl`}>
                      {item.icon}
                    </div>
                    <div className="flex-1 space-y-1">
                      <div className="flex justify-between items-start">
                        <h3 className="font-display text-sm text-luxury-dark tracking-wide">{item.name}</h3>
                        <button 
                          onClick={() => dispatch(removeFromCart(item.id))}
                          className="text-luxury-muted hover:text-red-500 transition-colors opacity-0 group-hover:opacity-100"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                      <p className="text-[10px] text-luxury-muted tracking-[0.2em] uppercase">{item.sub} · 50ml</p>
                      
                      <div className="flex justify-between items-center pt-2">
                        <div className="flex items-center gap-4 border border-gold/10 px-2 py-1">
                          <button 
                            onClick={() => dispatch(updateQuantity({ id: item.id, quantity: item.quantity - 1 }))}
                            className="text-gold hover:scale-110 transition-transform"
                          >
                            <Minus size={14} />
                          </button>
                          <span className="font-display text-sm min-w-[20px] text-center">{item.quantity}</span>
                          <button 
                            onClick={() => dispatch(updateQuantity({ id: item.id, quantity: item.quantity + 1 }))}
                            className="text-gold hover:scale-110 transition-transform"
                          >
                            <Plus size={14} />
                          </button>
                        </div>
                        <span className="font-display text-sm text-gold">Rs. {(item.price * item.quantity).toLocaleString()}</span>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {items.length > 0 && (
              <div className="p-8 border-t border-gold/10 space-y-6">
                <div className="flex justify-between items-center">
                  <span className="font-display tracking-[0.3em] text-sm text-luxury-dark">TOTAL</span>
                  <span className="font-display text-2xl text-gold">Rs. {total.toLocaleString()}</span>
                </div>
                <Link 
                  to="/order" 
                  onClick={() => dispatch(toggleCart())}
                  className="block w-full bg-gold hover:bg-gold-dark text-white text-center py-4 font-display text-sm tracking-[0.3em] transition-all hover:scale-[1.02] shadow-gold/20"
                >
                  PROCEED TO ORDER
                </Link>
                <p className="text-center text-[10px] text-luxury-muted tracking-widest uppercase">
                  Free Delivery · COD Available
                </p>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
