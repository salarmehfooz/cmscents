import React, { useState } from "react";
import { Navbar } from "./components/Navbar";
import { Hero } from "./components/Hero";
import { StatsBar } from "./components/StatsBar";
import { ProductSection } from "./components/ProductSection";
import { AboutSection } from "./components/AboutSection";
import { Testimonials } from "./components/Testimonials";
import { OrderSection } from "./components/OrderSection";
import { ContactSection, Footer } from "./components/Footer";
import { CartSidebar } from "./components/CartSidebar";
import { SuccessModal, Toast } from "./components/UIFeedback";

export default function App() {
  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [toastMsg, setToastMsg] = useState("");

  const cartCount = cart.reduce((sum, item) => sum + item.qty, 0);

  const addToCart = (product) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.id === product.id ? { ...item, qty: item.qty + 1 } : item,
        );
      }
      return [...prev, { ...product, qty: 1 }];
    });
    setIsCartOpen(true);
    setToastMsg(`${product.name} added to cart`);
  };

  const updateCartQty = (id, delta) => {
    setCart((prev) => {
      const item = prev.find((i) => i.id === id);
      if (!item) return prev;
      const newQty = Math.max(0, item.qty + delta);
      if (newQty === 0) return prev.filter((i) => i.id !== id);
      return prev.map((i) => (i.id === id ? { ...i, qty: newQty } : i));
    });
  };

  const removeFromCart = (id) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
  };

  const toggleProduct = (product) => {
    setCart((prev) => {
      const exists = prev.find((item) => item.id === product.id);
      if (exists) {
        return prev.filter((item) => item.id !== product.id);
      }
      return [...prev, { ...product, qty: 1 }];
    });
  };

  return (
    <div className="min-h-screen bg-cream text-black-soft selection:bg-gold selection:text-black-rich relative">
      <div className="fixed inset-0 bg-noise opacity-[0.015] pointer-events-none z-[9999]"></div>

      <Navbar onOpenCart={() => setIsCartOpen(true)} cartCount={cartCount} />

      <main>
        <Hero />
        <StatsBar />
        <ProductSection onAddToCart={addToCart} />
        <AboutSection />
        <Testimonials />
        <OrderSection
          cart={cart}
          onToggleProduct={toggleProduct}
          onSuccess={() => setIsModalOpen(true)}
          showToast={setToastMsg}
        />
        <ContactSection />
      </main>

      <Footer />

      <CartSidebar
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cart={cart}
        onUpdateQty={updateCartQty}
        onRemove={removeFromCart}
      />

      <SuccessModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />

      <Toast msg={toastMsg} onClear={() => setToastMsg("")} />
    </div>
  );
}
