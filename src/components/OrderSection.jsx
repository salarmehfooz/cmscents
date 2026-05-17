import React, { useState } from "react";
import { motion } from "motion/react";
import { PRODS, CITIES, SHEET_URL } from "../constants";

export const OrderSection = ({
  cart,
  onToggleProduct,
  onSuccess,
  showToast,
}) => {
  const safeCart = (cart || []).map((p) => ({
    ...p,
    price: Number(p.price) || 0,
    qty: Number(p.qty) > 0 ? Number(p.qty) : 1,
  }));

  const pickedIds = new Set(safeCart.map((item) => item.id));

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    city: "",
    cityOther: "",
    address: "",
    payment: "COD",
    note: "",
  });

  const [loading, setLoading] = useState(false);

  const totalAmount = safeCart.reduce((sum, p) => {
    const qty = p.qty > 0 ? p.qty : 1;
    return sum + p.price * qty;
  }, 0);

  const increaseQty = (product) => {
    const exists = safeCart.find((item) => item.id === product.id);

    let updated;
    if (exists) {
      updated = safeCart.map((item) =>
        item.id === product.id
          ? { ...item, qty: (Number(item.qty) || 1) + 1 }
          : item,
      );
    } else {
      updated = [...safeCart, { ...product, qty: 1 }];
    }

    onToggleProduct(updated);
  };

  const decreaseQty = (product) => {
    const exists = safeCart.find((item) => item.id === product.id);
    if (!exists) return;

    const updated = safeCart
      .map((item) => {
        if (item.id !== product.id) return item;

        const newQty = (Number(item.qty) || 1) - 1;
        return newQty > 0 ? { ...item, qty: newQty } : null;
      })
      .filter(Boolean);

    onToggleProduct(updated);
  };

  const handleSubmit = async () => {
    const cityValue =
      formData.city === "Other" ? formData.cityOther : formData.city;

    if (safeCart.length === 0)
      return showToast("Please select at least one fragrance");
    if (!formData.name.trim()) return showToast("Please enter your full name");
    if (!formData.phone.trim())
      return showToast("Please enter your phone number");
    if (!cityValue.trim()) return showToast("Please select or enter your city");
    if (!formData.address.trim())
      return showToast("Please enter your delivery address");

    setLoading(true);

    const payload = {
      timestamp: new Date().toLocaleString("en-PK", {
        timeZone: "Asia/Karachi",
      }),
      name: formData.name,
      phone: formData.phone,
      city: cityValue,
      address: formData.address,
      payment: formData.payment,
      products: safeCart.map((p) => `${p.name} (x${p.qty})`).join(", "),
      total: `Rs. ${totalAmount.toLocaleString()}`,
      note: formData.note || "—",
    };

    try {
      if (SHEET_URL) {
        await fetch(SHEET_URL, {
          method: "POST",
          mode: "no-cors",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
      }

      onSuccess();
    } catch (e) {
      console.error(e);
      showToast("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="relative py-[120px] bg-gradient-to-b from-black via-[#070707] to-black overflow-hidden">
      {/* glow background */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(201,168,76,0.10),transparent_60%)]" />
      <div className="absolute inset-0 opacity-[0.03] bg-noise pointer-events-none" />

      <div className="max-w-[1380px] mx-auto px-5 md:px-[60px] relative z-10">
        {/* HEADER */}
        <div className="text-center mb-16">
          <p className="text-gold/70 tracking-[6px] text-[11px] uppercase">
            ◆ Place Your Order ◆
          </p>
          <h2 className="text-white text-3xl md:text-4xl font-light mt-3 tracking-wide">
            Complete Your Experience
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] gap-12">
          {/* LEFT */}
          <motion.div className="space-y-10">
            {/* PRODUCTS */}
            <div>
              <label className="text-[10px] tracking-[5px] uppercase text-gold/60">
                Select Fragrances
              </label>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-4">
                {PRODS.map((p) => {
                  const qty =
                    Number(safeCart.find((c) => c.id === p.id)?.qty) || 0;

                  return (
                    <div
                      key={p.id}
                      className={`p-4 rounded-xl border backdrop-blur-md transition-all duration-300
                      ${
                        pickedIds.has(p.id)
                          ? "bg-white/10 border-gold/40 shadow-[0_0_25px_rgba(201,168,76,0.08)]"
                          : "bg-white/5 border-white/10 hover:border-gold/20"
                      }`}
                    >
                      <div className="flex justify-between items-start">
                        {/* INFO */}
                        <div
                          onClick={() => increaseQty(p)}
                          className="cursor-pointer"
                        >
                          <div className="text-white text-sm tracking-wide">
                            {p.name}
                          </div>
                          <div className="text-[10px] text-white/40 uppercase">
                            {p.sub}
                          </div>
                          <div className="text-gold text-xs mt-1">
                            Rs. {p.price}
                          </div>
                        </div>

                        {/* QTY */}
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => decreaseQty(p)}
                            className="w-7 h-7 rounded bg-white/10 text-white hover:bg-gold/20 transition"
                          >
                            -
                          </button>

                          <span className="text-white w-5 text-center text-sm">
                            {qty}
                          </span>

                          <button
                            onClick={() => increaseQty(p)}
                            className="w-7 h-7 rounded bg-white/10 text-white hover:bg-gold/20 transition"
                          >
                            +
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* FORM */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {["name", "phone"].map((field) => (
                <input
                  key={field}
                  value={formData[field]}
                  onChange={(e) =>
                    setFormData({ ...formData, [field]: e.target.value })
                  }
                  placeholder={field === "name" ? "Full Name" : "Phone Number"}
                  className="bg-white/5 border border-white/10 text-white p-4 rounded-xl
                             focus:border-gold/40 focus:outline-none"
                />
              ))}
            </div>

            {/* CITY */}
            <select
              value={formData.city}
              onChange={(e) =>
                setFormData({ ...formData, city: e.target.value })
              }
              className="w-full p-4 bg-white/5 border border-white/10 text-black rounded-xl"
            >
              <option value="">Select City</option>
              {CITIES.map((c) => (
                <option key={c}>{c}</option>
              ))}
              <option value="Other">Other</option>
            </select>

            {/* ADDRESS */}
            <textarea
              value={formData.address}
              onChange={(e) =>
                setFormData({ ...formData, address: e.target.value })
              }
              placeholder="Delivery Address"
              className="w-full p-4 bg-white/5 border border-white/10 text-black rounded-xl"
            />

            {/* PAYMENT */}
            <div>
              <label className="text-[10px] tracking-[5px] uppercase text-gold/60">
                Payment Method
              </label>

              <select
                value={formData.payment}
                onChange={(e) =>
                  setFormData({ ...formData, payment: e.target.value })
                }
                className="w-full mt-3 p-4 bg-white/5 border border-white/10 text-black rounded-xl"
              >
                <option value="COD">Cash on Delivery</option>
                <option value="Card">EasyPaisa / JazzCash</option>
                <option value="Bank Transfer">Bank Transfer</option>
              </select>
            </div>
          </motion.div>

          {/* RIGHT */}
          <motion.div className="sticky top-[120px]">
            <div className="p-8 rounded-2xl border border-gold/20 bg-white/5 backdrop-blur-xl">
              <h3 className="text-gold text-xs tracking-[5px] uppercase mb-6">
                Order Summary
              </h3>

              <div className="space-y-4">
                {safeCart.length === 0 ? (
                  <p className="text-white/40">No fragrances selected</p>
                ) : (
                  safeCart.map((p) => (
                    <div key={p.id} className="flex justify-between text-sm">
                      <span className="text-white/80">{p.name}</span>
                      <span className="text-gold">
                        Rs. {(p.price * p.qty).toLocaleString()}
                      </span>
                    </div>
                  ))
                )}
              </div>

              <div className="border-t border-white/10 mt-6 pt-6 flex justify-between">
                <span className="text-white/60">Total</span>
                <span className="text-gold text-lg">
                  Rs. {totalAmount.toLocaleString()}
                </span>
              </div>

              <button
                onClick={handleSubmit}
                disabled={loading || safeCart.length === 0}
                className="w-full mt-6 bg-gold text-black py-4 rounded-xl
                           hover:scale-[1.02] transition font-medium"
              >
                {loading ? "Processing..." : "Confirm Order"}
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
