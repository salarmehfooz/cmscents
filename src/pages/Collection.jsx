import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { PRODUCTS } from '../types';
import { useDispatch } from 'react-redux';
import { addToCart } from '../store/cartSlice';

export default function Collection() {
  const dispatch = useDispatch();

  return (
    <div className="py-20 px-6 md:px-12 max-w-7xl mx-auto min-h-screen">
      <div className="text-center mb-20 space-y-4">
        <motion.p 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-gold text-[10px] tracking-[0.6em] uppercase"
        >
          ◆ The Signature Library ◆
        </motion.p>
        <motion.h1 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-5xl md:text-6xl text-luxury-dark"
        >
          Full Collection
        </motion.h1>
        <motion.div 
          initial={{ opacity: 0, scaleX: 0 }}
          animate={{ opacity: 1, scaleX: 1 }}
          transition={{ delay: 0.2, duration: 0.8 }}
          className="w-24 h-[1px] bg-gold mx-auto mt-8"
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16">
        {PRODUCTS.map((product, idx) => (
          <motion.div 
            key={product.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            className="group"
          >
            <div className="aspect-[4/5] relative overflow-hidden mb-6">
              <div className={`w-full h-full ${product.lbl} flex flex-col items-center justify-center gap-6 p-8 transition-transform duration-700 group-hover:scale-110`}>
                 <div className="w-[1px] h-14 bg-linear-to-b from-transparent via-[#C9A84C] to-transparent" />
                 <div className="font-display text-3xl font-bold text-[#D4A93A] tracking-widest text-center">{product.name}</div>
                 <div className="text-[10px] tracking-[0.5em] text-white/40 uppercase -mt-2">{product.sub}</div>
                 <div className="border border-gold/30 px-4 py-1.5 text-[9px] tracking-widest uppercase text-[#C9A84C]">Eau de Parfum</div>
                 <div className="text-4xl opacity-80">{product.icon}</div>
              </div>
              
              <div className="absolute inset-0 bg-luxury-dark/80 flex flex-col items-center justify-center gap-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <button 
                  onClick={() => dispatch(addToCart(product))}
                  className="bg-gold hover:bg-gold-dark text-white px-10 py-4 text-[10px] tracking-[0.4em] uppercase font-bold transition-all"
                >
                  ADD TO CART
                </button>
                <Link 
                  to={`/product/${product.id}`} 
                  className="border border-white/40 text-white hover:bg-white hover:text-luxury-dark px-10 py-4 text-[10px] tracking-[0.4em] uppercase font-bold transition-all"
                >
                  VIEW DETAILS
                </Link>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-gold text-[9px] tracking-[0.4em] uppercase mb-1">{product.category}</p>
                  <h3 className="font-display text-2xl text-luxury-dark tracking-wide">{product.name}</h3>
                </div>
                <div className="text-right">
                  <p className="font-display text-xl text-gold">Rs. {product.price.toLocaleString()}</p>
                  <p className="text-[9px] text-luxury-muted tracking-widest uppercase mt-1">50ml EDP</p>
                </div>
              </div>
              <p className="font-serif italic text-luxury-muted text-base line-clamp-2 leading-relaxed">
                {product.desc}
              </p>
              <div className="flex gap-3 pt-2">
                {product.notes.map((note) => (
                  <span key={note} className="text-[8px] tracking-[0.3em] uppercase border border-gold/10 px-3 py-1 text-luxury-muted bg-white">
                    {note}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
