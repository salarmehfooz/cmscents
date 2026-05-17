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

  /* ---------------- NORMALIZER ---------------- */
  const normalizeCart = (cart) =>
    (cart || [])
      .map((p) => ({
        ...p,
        price: Number(p.price) || 0,
        qty: Number(p.qty) > 0 ? Number(p.qty) : 0,
      }))
      .filter((p) => p.qty > 0);

  const cartCount = cart.reduce(
    (sum, item) => sum + (Number(item.qty) || 0),
    0,
  );

  /* ---------------- ADD ---------------- */
  const addToCart = (product) => {
    setCart((prev) => {
      const exists = prev.find((i) => i.id === product.id);

      let updated;

      if (exists) {
        updated = prev.map((i) =>
          i.id === product.id ? { ...i, qty: Number(i.qty || 1) + 1 } : i,
        );
      } else {
        updated = [...prev, { ...product, qty: 1 }];
      }

      return normalizeCart(updated);
    });

    setIsCartOpen(true);
    setToastMsg(`${product.name} added to cart`);
  };

  /* ---------------- UPDATE QTY ---------------- */
  const updateCartQty = (id, delta) => {
    setCart((prev) => {
      const updated = prev
        .map((i) =>
          i.id === id ? { ...i, qty: Number(i.qty || 1) + delta } : i,
        )
        .filter((i) => (Number(i.qty) || 0) > 0);

      return normalizeCart(updated);
    });
  };

  /* ---------------- REMOVE ---------------- */
  const removeFromCart = (id) => {
    setCart((prev) => normalizeCart(prev.filter((i) => i.id !== id)));
  };

  return (
    <div className="min-h-screen bg-cream text-black-soft relative">
      <Navbar onOpenCart={() => setIsCartOpen(true)} cartCount={cartCount} />

      <main>
        <Hero />
        <StatsBar />

        <ProductSection onAddToCart={addToCart} />

        <AboutSection />
        <Testimonials />

        <OrderSection
          cart={cart}
          onToggleProduct={setCart}
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
