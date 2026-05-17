import React, { useState } from "react";
import { motion } from "motion/react";
import { PRODS, CITIES, SHEET_URL } from "../constants";

export const OrderSection = ({ cart, setCart, onSuccess, showToast }) => {
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

  const pickedIds = new Set(cart.map((item) => item.id));

  /* ---------------- PRODUCT TOGGLE ---------------- */
  const toggleProduct = (product) => {
    const exists = cart.find((item) => item.id === product.id);

    if (exists) {
      setCart(cart.filter((item) => item.id !== product.id));
    } else {
      setCart([...cart, { ...product, qty: 1 }]);
    }
  };

  /* ---------------- QUANTITY ---------------- */
  const increaseQty = (id) => {
    setCart((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, qty: (item.qty || 1) + 1 } : item,
      ),
    );
  };

  const decreaseQty = (id) => {
    setCart((prev) =>
      prev
        .map((item) =>
          item.id === id ? { ...item, qty: (item.qty || 1) - 1 } : item,
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

      setCart([]);

      setFormData({
        name: "",
        phone: "",
        city: "",
        cityOther: "",
        address: "",
        payment: "COD",
        note: "",
      });

      onSuccess();
    } catch (err) {
      console.error(err);
      showToast("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="bg-[#050505] py-[120px] text-white">
      <div className="max-w-[1200px] mx-auto px-6 grid lg:grid-cols-2 gap-10">
        {/* LEFT */}
        <div className="space-y-8">
          {/* PRODUCTS */}
          <div>
            <h3 className="text-gold text-xs tracking-[4px] uppercase mb-4">
              Select Fragrances
            </h3>

            <div className="grid sm:grid-cols-2 gap-3">
              {PRODS.map((p) => (
                <div
                  key={p.id}
                  onClick={() => toggleProduct(p)}
                  className={`p-4 rounded-xl border cursor-pointer transition ${
                    pickedIds.has(p.id)
                      ? "border-gold bg-white/10"
                      : "border-white/10 bg-white/5"
                  }`}
                >
                  <p className="text-sm">{p.name}</p>
                  <p className="text-xs text-white/50">{p.sub}</p>
                  <p className="text-gold text-xs mt-1">Rs {p.price}</p>
                </div>
              ))}
            </div>
          </div>

          {/* FORM */}
          <input
            placeholder="Full Name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="w-full p-3 bg-white/5 border border-white/10 rounded"
          />

          <input
            placeholder="Phone"
            value={formData.phone}
            onChange={(e) =>
              setFormData({ ...formData, phone: e.target.value })
            }
            className="w-full p-3 bg-white/5 border border-white/10 rounded"
          />

          {/* CITY */}
          <select
            value={formData.city}
            onChange={(e) => setFormData({ ...formData, city: e.target.value })}
            className="w-full p-3 bg-black border border-white/10 rounded"
          >
            <option value="">Select City</option>
            {CITIES.map((c) => (
              <option key={c}>{c}</option>
            ))}
            <option value="Other">Other</option>
          </select>

          {formData.city === "Other" && (
            <input
              placeholder="Enter City"
              value={formData.cityOther}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  cityOther: e.target.value,
                })
              }
              className="w-full p-3 bg-white/5 border border-white/10 rounded"
            />
          )}

          {/* PAYMENT */}
          <div className="grid grid-cols-2 gap-3">
            {["COD", "Bank Transfer"].map((m) => (
              <button
                key={m}
                onClick={() => setFormData({ ...formData, payment: m })}
                className={`p-3 border rounded ${
                  formData.payment === m
                    ? "bg-gold text-black"
                    : "border-white/10"
                }`}
              >
                {m}
              </button>
            ))}
          </div>

          <textarea
            placeholder="Address"
            value={formData.address}
            onChange={(e) =>
              setFormData({
                ...formData,
                address: e.target.value,
              })
            }
            className="w-full p-3 bg-white/5 border border-white/10 rounded"
          />
        </div>

        {/* RIGHT */}
        <div className="bg-white/5 border border-white/10 p-6 rounded-xl h-fit sticky top-10">
          <h3 className="text-gold uppercase text-xs tracking-[4px] mb-5">
            Order Summary
          </h3>

          {cart.length === 0 ? (
            <p className="text-white/40">No items selected</p>
          ) : (
            cart.map((p) => (
              <div
                key={p.id}
                className="flex justify-between items-center mb-4"
              >
                <div>
                  <p>{p.name}</p>
                  <p className="text-xs text-white/50">
                    Rs {(p.price * (p.qty || 1)).toLocaleString()}
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => decreaseQty(p.id)}
                    className="w-7 h-7 bg-white/10 rounded"
                  >
                    -
                  </button>

                  <span>{p.qty || 1}</span>

                  <button
                    onClick={() => increaseQty(p.id)}
                    className="w-7 h-7 bg-white/10 rounded"
                  >
                    +
                  </button>
                </div>
              </div>
            ))
          )}

          <div className="border-t border-white/10 mt-4 pt-4 flex justify-between">
            <span>Total</span>
            <span className="text-gold">Rs {totalAmount.toLocaleString()}</span>
          </div>

          <button
            onClick={handleSubmit}
            disabled={loading || cart.length === 0}
            className="w-full mt-6 bg-gold text-black p-3 rounded"
          >
            {loading ? "Processing..." : "Confirm Order"}
          </button>
        </div>
      </div>
    </section>
  );
};
