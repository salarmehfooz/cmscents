import React, { useState } from "react";
import { motion } from "motion/react";
import { PRODS, CITIES, SHEET_URL } from "../constants";

export const OrderSection = ({ cart, setCart, onSuccess, showToast }) => {
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

  /* ---------------- PRODUCT TOGGLE ---------------- */
  const onToggleProduct = (product) => {
    const exists = cart.find((item) => item.id === product.id);

    if (exists) {
      setCart(cart.filter((item) => item.id !== product.id));
    } else {
      setCart([...cart, { ...product, qty: 1 }]);
    }
  };

  /* ---------------- QUANTITY ---------------- */
  const onIncreaseQty = (id) => {
    setCart((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, qty: (item.qty || 1) + 1 } : item,
      ),
    );
  };

  const onDecreaseQty = (id) => {
    setCart((prev) =>
      prev
        .map((item) =>
          item.id === id
            ? {
                ...item,
                qty: Math.max(1, (item.qty || 1) - 1),
              }
            : item,
        )
        .filter((item) => item.qty > 0),
    );
  };

  const selectedProducts = cart;

  const totalAmount = selectedProducts.reduce(
    (sum, p) => sum + p.price * (p.qty || 1),
    0,
  );

  /* ---------------- SUBMIT ---------------- */
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
        .map((p) => `${p.name} (x${p.qty || 1})`)
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
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        });
      }

      onSuccess();

      setCart([]);

      setFormData({
        name: "",
        phone: "",
        city: "",
        cityOther: "",
        address: "",
        payment: "",
        note: "",
      });
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
      {/* ambiance */}
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
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-10"
          >
            {/* PRODUCTS */}
            <div>
              <label className="text-[10px] tracking-[5px] uppercase text-gold/70">
                Select Fragrance(s)
              </label>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-4">
                {PRODS.map((p) => (
                  <div
                    key={p.id}
                    onClick={() => onToggleProduct(p)}
                    className={`group cursor-pointer p-4 rounded-xl border transition-all backdrop-blur-md ${
                      pickedIds.has(p.id)
                        ? "bg-white/10 border-gold/40 shadow-[0_0_25px_rgba(201,168,76,0.12)]"
                        : "bg-white/5 border-white/10 hover:border-gold/30"
                    }`}
                  >
                    <div className="flex items-center gap-4">
                      <div
                        className={`w-4 h-4 rounded-full border flex items-center justify-center ${
                          pickedIds.has(p.id)
                            ? "bg-gold border-gold"
                            : "border-gold/40"
                        }`}
                      >
                        {pickedIds.has(p.id) && (
                          <div className="w-1.5 h-1.5 bg-black rounded-full" />
                        )}
                      </div>

                      <div>
                        <div className="font-display text-white text-sm tracking-[1px]">
                          {p.name}
                        </div>

                        <div className="text-[10px] text-white/40 uppercase tracking-[2px]">
                          {p.sub}
                        </div>

                        <div className="text-gold text-xs mt-1">
                          Rs. {p.price.toLocaleString()}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* FORM */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {["name", "phone"].map((field) => (
                <input
                  key={field}
                  type="text"
                  value={formData[field]}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      [field]: e.target.value,
                    })
                  }
                  placeholder={field === "name" ? "Full Name" : "Phone Number"}
                  className="bg-white/5 border border-white/10 text-white p-4 rounded-xl outline-none focus:border-gold/40 focus:bg-white/10 placeholder:text-white/30"
                />
              ))}
            </div>

            {/* CITY */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <select
                value={formData.city}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    city: e.target.value,
                  })
                }
                className="bg-black/60 border border-white/10 text-white p-4 rounded-xl focus:border-gold/40 outline-none"
              >
                <option value="">Select City</option>

                {CITIES.map((c) => (
                  <option key={c} value={c} className="text-black">
                    {c}
                  </option>
                ))}

                <option value="Other" className="text-black">
                  Other
                </option>
              </select>

              {formData.city === "Other" && (
                <input
                  value={formData.cityOther}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      cityOther: e.target.value,
                    })
                  }
                  placeholder="Enter City"
                  className="bg-white/5 border border-white/10 text-white p-4 rounded-xl focus:border-gold/40 outline-none"
                />
              )}
            </div>

            {/* PAYMENT */}
            <div>
              <label className="text-[10px] tracking-[5px] uppercase text-gold/70 block mb-3">
                Payment Method
              </label>

              <div className="grid grid-cols-2 gap-4">
                {["COD", "Bank Transfer"].map((method) => (
                  <button
                    type="button"
                    key={method}
                    onClick={() =>
                      setFormData({
                        ...formData,
                        payment: method,
                      })
                    }
                    className={`p-4 rounded-xl border text-sm uppercase tracking-[2px] transition ${
                      formData.payment === method
                        ? "bg-gold text-black border-gold"
                        : "bg-white/5 text-white border-white/10 hover:border-gold/30"
                    }`}
                  >
                    {method}
                  </button>
                ))}
              </div>
            </div>

            {/* ADDRESS */}
            <textarea
              value={formData.address}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  address: e.target.value,
                })
              }
              placeholder="Delivery Address"
              className="w-full bg-white/5 border border-white/10 text-white p-4 rounded-xl min-h-[110px] focus:border-gold/40 outline-none"
            />

            {/* NOTE */}
            <textarea
              value={formData.note}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  note: e.target.value,
                })
              }
              placeholder="Additional Notes (Optional)"
              className="w-full bg-white/5 border border-white/10 text-white p-4 rounded-xl min-h-[80px] focus:border-gold/40 outline-none"
            />
          </motion.div>

          {/* RIGHT */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="sticky top-[120px] h-fit"
          >
            <div className="p-8 rounded-2xl border border-gold/15 bg-white/5 backdrop-blur-md">
              <h3 className="text-gold text-[11px] tracking-[5px] uppercase mb-8">
                Order Summary
              </h3>

              <div className="space-y-5 mb-8">
                {selectedProducts.length === 0 ? (
                  <p className="text-white/40 italic text-sm">
                    No fragrances selected
                  </p>
                ) : (
                  selectedProducts.map((p) => (
                    <div
                      key={p.id}
                      className="flex items-center justify-between gap-4"
                    >
                      <div>
                        <p className="text-white/80 text-sm">{p.name}</p>

                        <p className="text-gold text-xs mt-1">
                          Rs. {(p.price * (p.qty || 1)).toLocaleString()}
                        </p>
                      </div>

                      <div className="flex items-center gap-3">
                        <button
                          onClick={() => onDecreaseQty(p.id)}
                          className="w-8 h-8 rounded-full bg-white/10 text-white hover:bg-gold hover:text-black transition"
                        >
                          -
                        </button>

                        <span className="text-white min-w-[20px] text-center">
                          {p.qty || 1}
                        </span>

                        <button
                          onClick={() => onIncreaseQty(p.id)}
                          className="w-8 h-8 rounded-full bg-white/10 text-white hover:bg-gold hover:text-black transition"
                        >
                          +
                        </button>
                      </div>
                    </div>
                  ))
                )}
              </div>

              <div className="border-t border-white/10 pt-6 flex justify-between items-center">
                <span className="text-white/60 uppercase text-xs tracking-[3px]">
                  Total
                </span>

                <span className="text-2xl text-gold font-display">
                  Rs. {totalAmount.toLocaleString()}
                </span>
              </div>

              <button
                onClick={handleSubmit}
                disabled={loading || selectedProducts.length === 0}
                className="w-full mt-8 bg-gold text-black py-4 rounded-full uppercase tracking-[3px] text-sm hover:scale-[1.02] transition disabled:opacity-40"
              >
                {loading ? "Processing..." : "Confirm Order"}
              </button>

              <p className="text-center text-[10px] text-white/30 mt-5 tracking-[2px] uppercase">
                Secure checkout · Premium fragrance delivery
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
