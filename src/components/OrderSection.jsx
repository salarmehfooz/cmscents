import React, { useState } from "react";
import { motion } from "motion/react";
import { PRODS, CITIES, SHEET_URL } from "../constants";

export const OrderSection = ({
  cart,
  onToggleProduct,
  onSuccess,
  showToast,
}) => {
  const pickedIds = new Set(cart.map((item) => item.id));

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

  const selectedProducts = cart;

  /* ---------------- SAFE TOTAL (NO NaN EVER) ---------------- */
  const totalAmount = selectedProducts.reduce((sum, p) => {
    const price = Number(p.price) || 0;
    const qty = Number(p.qty) > 0 ? Number(p.qty) : 1;

    return sum + price * qty;
  }, 0);

  /* ---------------- FIXED QTY LOGIC ---------------- */

  const increaseQty = (product) => {
    const exists = cart.find((item) => item.id === product.id);

    let updated;

    if (exists) {
      updated = cart.map((item) =>
        item.id === product.id
          ? { ...item, qty: Number(item.qty || 1) + 1 }
          : item,
      );
    } else {
      updated = [...cart, { ...product, qty: 1 }];
    }

    onToggleProduct(updated);
  };

  const decreaseQty = (product) => {
    const exists = cart.find((item) => item.id === product.id);
    if (!exists) return;

    const updated = cart
      .map((item) => {
        if (item.id !== product.id) return item;

        const newQty = Number(item.qty || 1) - 1;
        return newQty > 0 ? { ...item, qty: newQty } : null;
      })
      .filter(Boolean);

    onToggleProduct(updated);
  };

  const handleSubmit = async () => {
    const cityValue =
      formData.city === "Other" ? formData.cityOther : formData.city;

    if (cart.length === 0)
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
      products: selectedProducts
        .map((p) => `${p.name} (x${Number(p.qty || 1)})`)
        .join(", "),
      total: `Rs. ${totalAmount.toLocaleString()}`,
      payment: formData.payment,
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
    <section
      id="order"
      className="bg-gradient-to-b from-[#070707] via-[#0b0b0b] to-[#050505] py-[120px] relative overflow-hidden"
    >
      <div className="absolute inset-0 bg-noise opacity-[0.04] pointer-events-none"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(201,168,76,0.08),transparent_60%)]"></div>

      <div className="max-w-[1380px] mx-auto px-5 md:px-[60px] relative z-10">
        {/* HEADER */}
        <div className="text-center mb-16">
          <p className="sec-eyebrow text-gold/80 tracking-[6px]">
            ◆ Place Your Order ◆
          </p>
          <h2 className="sec-title text-white mt-3">
            Complete Your Experience
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] gap-12">
          {/* LEFT */}
          <motion.div className="space-y-10">
            {/* PRODUCTS */}
            <div>
              <label className="text-[10px] tracking-[5px] uppercase text-gold/70">
                Select Fragrance(s)
              </label>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-4">
                {PRODS.map((p) => {
                  const inCart = pickedIds.has(p.id);
                  const qty = Number(cart.find((c) => c.id === p.id)?.qty) || 0;

                  return (
                    <div
                      key={p.id}
                      className={`group p-4 rounded-xl border transition-all backdrop-blur-md ${
                        inCart
                          ? "bg-white/10 border-gold/40"
                          : "bg-white/5 border-white/10"
                      }`}
                    >
                      <div className="flex justify-between items-start">
                        <div>
                          <div
                            onClick={() => increaseQty(p)}
                            className="cursor-pointer"
                          >
                            <div className="font-display text-white text-sm tracking-[1px]">
                              {p.name}
                            </div>
                            <div className="text-[10px] text-white/40 uppercase tracking-[2px]">
                              {p.sub}
                            </div>
                            <div className="text-gold text-xs mt-1">
                              Rs. {p.price}
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => decreaseQty(p)}
                            className="w-7 h-7 bg-white/10 rounded"
                          >
                            -
                          </button>

                          <span className="text-white w-5 text-center">
                            {qty}
                          </span>

                          <button
                            onClick={() => increaseQty(p)}
                            className="w-7 h-7 bg-white/10 rounded"
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
                    setFormData({
                      ...formData,
                      [field]: e.target.value,
                    })
                  }
                  placeholder={field === "name" ? "Full Name" : "Phone Number"}
                  className="bg-white/5 border border-white/10 text-white p-4 rounded-xl"
                />
              ))}
            </div>

            <select
              value={formData.city}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  city: e.target.value,
                })
              }
              className="w-full p-4 bg-black border border-white/10 rounded"
            >
              <option value="">Select City</option>
              {CITIES.map((c) => (
                <option key={c}>{c}</option>
              ))}
              <option value="Other">Other</option>
            </select>

            <textarea
              value={formData.address}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  address: e.target.value,
                })
              }
              placeholder="Delivery Address"
              className="w-full p-4 bg-white/5 border border-white/10 rounded"
            />
          </motion.div>

          {/* RIGHT */}
          <motion.div className="sticky top-[120px]">
            <div className="p-8 rounded-2xl border border-gold/15 bg-white/5">
              <h3 className="text-gold uppercase text-xs tracking-[4px] mb-6">
                Order Summary
              </h3>

              <div className="space-y-4">
                {cart.length === 0 ? (
                  <p className="text-white/40">No fragrances selected</p>
                ) : (
                  cart.map((p) => (
                    <div key={p.id} className="flex justify-between">
                      <div>
                        {p.name}
                        <div className="text-gold text-xs">
                          Rs.{" "}
                          {(
                            Number(p.price) * (Number(p.qty) || 1)
                          ).toLocaleString()}
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>

              <div className="border-t border-white/10 mt-6 pt-6 flex justify-between">
                <span>Total</span>
                <span className="text-gold">
                  Rs. {totalAmount.toLocaleString()}
                </span>
              </div>

              <button
                onClick={handleSubmit}
                disabled={loading || cart.length === 0}
                className="w-full mt-6 bg-gold text-black p-4 rounded"
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
