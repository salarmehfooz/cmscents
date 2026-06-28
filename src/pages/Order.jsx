import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { clearCart } from "../store/cartSlice";
import { motion } from "motion/react";
import { ShoppingBag, Truck, CreditCard, CheckCircle2 } from "lucide-react";
import { Link } from "react-router-dom";

export default function Order() {
  const dispatch = useDispatch();
  const { items } = useSelector((state) => state.cart);
  const total = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );
  const totalSavings = items.reduce(
    (sum, item) =>
      sum +
      (item.originalPrice
        ? (item.originalPrice - item.price) * item.quantity
        : 0),
    0,
  );

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    city: "",
    address: "",
    payment: "COD",
    note: "",
  });

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const cities = [
    "Karachi",
    "Lahore",
    "Islamabad",
    "Rawalpindi",
    "Faisalabad",
    "Multan",
    "Peshawar",
    "Quetta",
    "Sialkot",
    "Gujranwala",
    "Hyderabad",
    "Bahawalpur",
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (items.length === 0) return;

    setIsSubmitting(true);

    // Prepare data exactly as Apps Script expects
    const orderData = {
      name: formData.name,
      phone: formData.phone,
      city: formData.city,
      address: formData.address,
      products: items
        .map((item) => `${item.name} (${item.quantity})`)
        .join(", "),
      total: total,
      payment: formData.payment,
      note: formData.note || "None",
    };

    try {
      const SCRIPT_URL =
        "https://script.google.com/macros/s/AKfycbzJ-e6FbB2zm2FMgSjBQ3lUu19z0hn1MmtlilHSrzUP2kuuKLVN1_s0B2g5n6fO1EEVrA/exec";

      // Send as plain text to avoid preflight CORS issues with Apps Script
      // Apps Script doPost(e) reads JSON from e.postData.contents
      await fetch(SCRIPT_URL, {
        method: "POST",
        mode: "no-cors",
        headers: {
          "Content-Type": "text/plain", // Use text/plain to avoid CORS preflight, script handles parsing
        },
        body: JSON.stringify(orderData),
      });

      // Since mode is 'no-cors', we can't see the response body,
      // but we assume success if no error is thrown during fetch
      setIsSubmitting(false);
      setIsSubmitted(true);
      dispatch(clearCart());
    } catch (error) {
      console.error("Submission error:", error);
      alert(
        "There was a problem submitting your order. Please try again or contact us on WhatsApp.",
      );
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center p-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white border border-gold/20 p-12 md:p-20 text-center max-w-xl w-full space-y-8"
        >
          <div className="w-20 h-20 bg-gold/10 text-gold rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle2 size={40} />
          </div>
          <div className="space-y-4">
            <h2 className="font-display text-3xl text-luxury-dark tracking-widest">
              ORDER PLACED!
            </h2>
            <p className="font-serif italic text-xl text-luxury-muted leading-relaxed">
              Thank you for choosing C.M Scents. Our team will contact you on
              WhatsApp shortly to confirm your delivery details.
            </p>
          </div>
          <div className="pt-8 border-t border-gold/10 flex flex-col gap-4">
            <Link
              to="/"
              className="bg-gold text-white px-12 py-4 font-display text-xs tracking-[0.4em] uppercase transition-all hover:bg-gold-dark"
            >
              Continue Shopping
            </Link>
            <p className="text-[10px] tracking-widest uppercase text-luxury-muted">
              Est. Delivery: 2–4 Working Days
            </p>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="bg-luxury-bg min-h-screen py-20 px-6 md:px-12">
      <div className="max-w-7xl mx-auto space-y-12">
        <div className="text-center space-y-4">
          <p className="text-gold text-[10px] tracking-[0.8em] uppercase">
            ◆ Selection Review ◆
          </p>
          <h1 className="text-5xl text-luxury-dark">Complete Your Order</h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Form Side */}
          <div className="lg:col-span-7 space-y-8">
            <form
              onSubmit={handleSubmit}
              className="bg-white border border-gold/10 p-10 space-y-10"
            >
              <div className="space-y-6">
                <h3 className="font-display text-sm tracking-[0.3em] uppercase text-gold pb-4 border-b border-gold/10 mb-8">
                  Shipping Information
                </h3>

                <div className="space-y-2">
                  <label className="text-[10px] tracking-widest uppercase text-luxury-muted">
                    Full Name
                  </label>
                  <input
                    required
                    type="text"
                    placeholder="Your full name"
                    className="w-full border-b border-gold/20 focus:border-gold outline-none py-3 px-1 transition-colors text-sm font-medium"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-2">
                    <label className="text-[10px] tracking-widest uppercase text-luxury-muted">
                      Phone Number
                    </label>
                    <input
                      required
                      type="tel"
                      placeholder="03XX-XXXXXXX"
                      className="w-full border-b border-gold/20 focus:border-gold outline-none py-3 px-1 transition-colors text-sm font-medium"
                      value={formData.phone}
                      onChange={(e) =>
                        setFormData({ ...formData, phone: e.target.value })
                      }
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] tracking-widest uppercase text-luxury-muted">
                      City
                    </label>
                    <select
                      required
                      className="w-full border-b border-gold/20 focus:border-gold outline-none py-3 px-1 transition-colors text-sm font-medium bg-transparent"
                      value={formData.city}
                      onChange={(e) =>
                        setFormData({ ...formData, city: e.target.value })
                      }
                    >
                      <option value="">Select your city</option>
                      {cities.map((city) => (
                        <option key={city} value={city}>
                          {city}
                        </option>
                      ))}
                      <option value="Other">Other City</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] tracking-widest uppercase text-luxury-muted">
                    Full Address
                  </label>
                  <textarea
                    required
                    placeholder="House/Flat #, Street, Area..."
                    className="w-full border-b border-gold/20 focus:border-gold outline-none py-3 px-1 transition-colors text-sm font-medium min-h-[80px] resize-none"
                    value={formData.address}
                    onChange={(e) =>
                      setFormData({ ...formData, address: e.target.value })
                    }
                  />
                </div>
              </div>

              <div className="space-y-6">
                <h3 className="font-display text-sm tracking-[0.3em] uppercase text-gold pb-4 border-b border-gold/10 mb-8">
                  Payment Method
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {[
                    {
                      id: "COD",
                      label: "Cash on Delivery",
                      icon: <ShoppingBag size={18} />,
                    },
                    {
                      id: "BANK",
                      label: "Bank Transfer",
                      icon: <CreditCard size={18} />,
                    },
                  ].map((method) => (
                    <button
                      key={method.id}
                      type="button"
                      onClick={() =>
                        setFormData({ ...formData, payment: method.id })
                      }
                      className={`flex items-center gap-4 p-5 border transition-all text-xs tracking-widest uppercase font-bold ${formData.payment === method.id ? "border-gold bg-gold/5 text-gold" : "border-gold/10 hover:border-gold/30 text-luxury-muted"}`}
                    >
                      {method.icon}
                      {method.label}
                    </button>
                  ))}
                </div>
                <div className="p-4 bg-luxury-bg2 border border-gold/5 text-[10px] tracking-[0.1em] text-luxury-muted flex gap-3 text-center items-center">
                  <p>
                    Orders outside major cities may require 24h advance
                    processing for logistics.
                  </p>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] tracking-widest uppercase text-luxury-muted">
                  Special Instructions (Optional)
                </label>
                <textarea
                  placeholder="Anything we should know..."
                  className="w-full border-b border-gold/20 focus:border-gold outline-none py-3 px-1 transition-colors text-sm font-medium min-h-[60px] resize-none"
                  value={formData.note}
                  onChange={(e) =>
                    setFormData({ ...formData, note: e.target.value })
                  }
                />
              </div>

              <button
                disabled={isSubmitting || items.length === 0}
                className="w-full bg-gold hover:bg-gold-dark text-white py-6 font-display text-sm tracking-[0.5em] uppercase transition-all disabled:opacity-50 disabled:translate-y-0 hover:-translate-y-1 shadow-xl shadow-gold/20"
              >
                {isSubmitting ? "Processing Order..." : "Place My Order ♛"}
              </button>
            </form>
          </div>

          {/* Cart Summary Side */}
          <div className="lg:col-span-5">
            <div className="bg-white border border-gold/20 p-10 space-y-10 sticky top-32">
              <h3 className="font-display text-sm tracking-[0.3em] uppercase text-luxury-dark pb-4 border-b border-gold/10">
                Summary
              </h3>

              <div className="space-y-6 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
                {items.length === 0 ? (
                  <p className="text-center font-serif italic text-luxury-muted py-10">
                    Your cart is empty.
                  </p>
                ) : (
                  items.map((item) => (
                    <div key={item.id} className="flex gap-4">
                      <div className="w-16 h-16 overflow-hidden relative border border-gold/10 flex items-center justify-center bg-white shrink-0">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-full h-full object-cover"
                          referrerPolicy="no-referrer"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex justify-between items-start gap-2">
                          <h4 className="font-display text-xs tracking-widest text-luxury-dark truncate">
                            {item.name}
                          </h4>
                          <div className="flex flex-col items-end shrink-0">
                            {item.originalPrice && (
                              <span className="text-[10px] text-luxury-muted line-through mb-0.5 leading-none">
                                Rs.{" "}
                                {(
                                  item.originalPrice * item.quantity
                                ).toLocaleString()}
                              </span>
                            )}
                            <span className="font-display text-xs text-gold">
                              Rs.{" "}
                              {(item.price * item.quantity).toLocaleString()}
                            </span>
                          </div>
                        </div>
                        <p className="text-[9px] tracking-widest uppercase text-luxury-muted mt-1">
                          {item.quantity} x {item.sub}
                        </p>
                      </div>
                    </div>
                  ))
                )}
              </div>

              <div className="space-y-4 pt-8 border-t border-gold/10">
                <div className="flex justify-between items-center text-luxury-muted text-xs tracking-widest uppercase">
                  <span>Subtotal</span>
                  <span>Rs. {total.toLocaleString()}</span>
                </div>
                <div className="flex justify-between items-center text-luxury-muted text-xs tracking-widest uppercase">
                  <span>Shipping</span>
                  <span className="text-green-600 font-bold">FREE</span>
                </div>
                {totalSavings > 0 && (
                  <div className="flex justify-between items-center text-xs tracking-widest uppercase text-green-600 font-bold">
                    <span>Discount Savings</span>
                    <span>- Rs. {totalSavings.toLocaleString()}</span>
                  </div>
                )}
                <div className="flex justify-between items-center pt-4">
                  <span className="font-display tracking-[0.4em] text-sm text-luxury-dark uppercase">
                    Total
                  </span>
                  <span className="font-display text-3xl text-gold">
                    Rs. {total.toLocaleString()}
                  </span>
                </div>
              </div>

              <div className="space-y-4 pt-6">
                <div className="flex gap-3 items-center p-5 bg-luxury-bg border border-gold/5">
                  <Truck size={20} className="text-gold shrink-0" />
                  <div className="space-y-1">
                    <p className="text-[9px] tracking-widest uppercase font-bold text-luxury-dark">
                      Premium Express Delivery
                    </p>
                    <p className="text-[9px] text-luxury-muted">
                      Deliveries across Pakistan within 2 to 4 business days.
                    </p>
                  </div>
                </div>
                <p className="text-[10px] text-center text-luxury-muted font-serif italic">
                  Guaranteed authenticity and artisanal quality with every
                  bottle.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
