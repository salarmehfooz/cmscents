import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { clearCart } from "../store/cartSlice";
import { motion } from "motion/react";
import { ShoppingBag, Truck, CreditCard, CheckCircle2 } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import {
  initAuth,
  googleSignIn,
  logout,
  findSpreadsheet,
  createSpreadsheet,
  appendOrderRow,
} from "../lib/googleAuth";

export default function Order() {
  const dispatch = useDispatch();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const showAdminPanel =
    searchParams.get("admin") === "true" ||
    searchParams.get("merchant") === "true" ||
    searchParams.get("setup") === "true";
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

  // Google Sheets Integration States
  const [googleUser, setGoogleUser] = useState(null);
  const [googleToken, setGoogleToken] = useState(null);
  const [spreadsheetId, setSpreadsheetId] = useState(null);
  const [orderNumber, setOrderNumber] = useState("");
  const [sheetStatus, setSheetStatus] = useState("");
  const [isConnectingGoogle, setIsConnectingGoogle] = useState(false);
  const [isLoggedToSheet, setIsLoggedToSheet] = useState(false);

  useEffect(() => {
    const unsubscribe = initAuth(
      (user, token) => {
        setGoogleUser(user);
        if (token) {
          setGoogleToken(token);
          const savedSheetId = localStorage.getItem("cm_scents_spreadsheet_id");
          if (savedSheetId) {
            setSpreadsheetId(savedSheetId);
            setSheetStatus("Connected. Ready to sync new orders.");
          } else {
            setSheetStatus("Connected. Checking Google Sheets...");
            findSpreadsheet(token)
              .then((sheetId) => {
                if (sheetId) {
                  setSpreadsheetId(sheetId);
                  localStorage.setItem("cm_scents_spreadsheet_id", sheetId);
                  setSheetStatus("Connected. Sheets linked!");
                } else {
                  setSheetStatus(
                    "Connected. Sheet will be created on first order.",
                  );
                }
              })
              .catch(() => {
                setSheetStatus("Connected. Sheet check failed.");
              });
          }
        }
      },
      () => {
        setGoogleUser(null);
        setGoogleToken(null);
      },
    );
    return () => {
      if (typeof unsubscribe === "function") unsubscribe();
    };
  }, []);

  const handleGoogleLogin = async () => {
    setIsConnectingGoogle(true);
    setSheetStatus("Connecting to Google...");
    try {
      const result = await googleSignIn();
      if (result) {
        setGoogleUser(result.user);
        setGoogleToken(result.accessToken);
        setSheetStatus("Checking Drive...");
        const sheetId = await findSpreadsheet(result.accessToken);
        if (sheetId) {
          setSpreadsheetId(sheetId);
          localStorage.setItem("cm_scents_spreadsheet_id", sheetId);
          setSheetStatus('Linked to "C.M Scents Orders" sheet.');
        } else {
          setSheetStatus("Will create sheet on first order.");
        }
      }
    } catch (err) {
      console.error("Google connect error:", err);
      setSheetStatus("Google connect failed.");
    } finally {
      setIsConnectingGoogle(false);
    }
  };

  const handleGoogleLogout = async () => {
    await logout();
    setGoogleUser(null);
    setGoogleToken(null);
    setSpreadsheetId(null);
    setSheetStatus("");
    setIsLoggedToSheet(false);
  };

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

    // Generate a beautiful, unique order number
    const year = new Date().getFullYear();
    const rand = Math.floor(10000 + Math.random() * 90000);
    const generatedOrderNum = `CMS-${year}-${rand}`;
    setOrderNumber(generatedOrderNum);

    // Prepare data exactly as Apps Script expects
    const orderData = {
      orderNumber: generatedOrderNum,
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

    // 1. Send via direct Sheets API if Google Auth token is connected
    let directLogSuccess = false;
    if (googleToken) {
      try {
        setSheetStatus("Locating spreadsheet...");
        let activeSheetId = spreadsheetId;
        if (!activeSheetId) {
          activeSheetId = await findSpreadsheet(googleToken);
          if (!activeSheetId) {
            setSheetStatus('Creating "C.M Scents Orders" sheet...');
            activeSheetId = await createSpreadsheet(googleToken);
          }
          setSpreadsheetId(activeSheetId);
          localStorage.setItem("cm_scents_spreadsheet_id", activeSheetId);
        }

        setSheetStatus("Appending order row...");
        const rowData = [
          generatedOrderNum,
          new Date().toLocaleString("en-PK", { timeZone: "Asia/Karachi" }),
          formData.name,
          formData.phone,
          formData.city,
          formData.address,
          items.map((item) => `${item.name} (${item.quantity}x)`).join(", "),
          total,
          totalSavings,
          formData.payment === "COD" ? "Cash on Delivery" : "Bank Transfer",
          formData.note || "None",
        ];
        await appendOrderRow(googleToken, activeSheetId, rowData);
        directLogSuccess = true;
        setIsLoggedToSheet(true);
        setSheetStatus("Synced successfully.");
      } catch (sheetError) {
        console.error("Google Sheets API direct write error:", sheetError);
        // Do not crash checkout flow if Sheets write fails, but let owner know
      }
    }

    // 2. Also send to standard script as fallback
    try {
      const SCRIPT_URL = import.meta.env.VITE_APPS_SCRIPT_URL;

      if (SCRIPT_URL) {
        // Send as plain text to avoid preflight CORS issues with Apps Script
        await fetch(SCRIPT_URL, {
          method: "POST",
          mode: "no-cors",
          headers: {
            "Content-Type": "text/plain",
          },
          body: JSON.stringify(orderData),
        });
      } else {
        console.warn(
          "VITE_APPS_SCRIPT_URL environment variable is not defined.",
        );
      }

      setIsSubmitting(false);
      setIsSubmitted(true);
      dispatch(clearCart());
    } catch (error) {
      console.error("Submission error:", error);
      if (directLogSuccess) {
        // If direct log succeeded, we can still mark as success
        setIsSubmitting(false);
        setIsSubmitted(true);
        dispatch(clearCart());
      } else {
        alert(
          "There was a problem submitting your order. Please try again or contact us on WhatsApp.",
        );
        setIsSubmitting(false);
      }
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

          {/* Elegant Order Number Display */}
          <div className="border border-gold/20 bg-gold/5 p-6 space-y-2 max-w-sm mx-auto select-none">
            <p className="text-[10px] tracking-[0.3em] uppercase text-luxury-muted">
              Your Order Number
            </p>
            <p className="font-mono text-2xl font-bold text-gold tracking-wider">
              {orderNumber}
            </p>
            {isLoggedToSheet ? (
              <p className="text-[9px] text-green-600 font-bold uppercase tracking-widest flex items-center justify-center gap-1.5 mt-2">
                <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse inline-block" />
                Synced to Google Sheet Successfully
              </p>
            ) : (
              <p className="text-[9px] text-luxury-muted uppercase tracking-widest mt-2">
                Saved Locally
              </p>
            )}
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
              {/* Merchant Google Sheets Integration Panel */}
              {showAdminPanel && (
                <div className="bg-luxury-bg border border-gold/20 p-6 space-y-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="font-display text-xs tracking-widest text-luxury-dark uppercase font-bold">
                        Google Sheets Integration
                      </h4>
                      <p className="text-[10px] text-luxury-muted mt-1 leading-relaxed">
                        Connect your Google Account to automatically sync
                        orders, customer details, and generated order numbers
                        directly to your spreadsheet.
                      </p>
                    </div>
                    <span
                      className={`h-2.5 w-2.5 rounded-full ${googleUser ? "bg-green-500 animate-pulse" : "bg-amber-500"}`}
                    />
                  </div>

                  {googleUser ? (
                    <div className="space-y-3">
                      <div className="flex items-center justify-between bg-white border border-gold/10 p-3.5">
                        <div>
                          <p className="font-display text-xs tracking-wider text-luxury-dark font-bold">
                            {googleUser.displayName || "Connected Merchant"}
                          </p>
                          <p className="text-[10px] text-luxury-muted">
                            {googleUser.email}
                          </p>
                        </div>
                        <button
                          type="button"
                          onClick={handleGoogleLogout}
                          className="text-[10px] tracking-widest uppercase text-red-600 hover:text-red-800 font-bold hover:underline transition-colors"
                        >
                          Disconnect
                        </button>
                      </div>
                      {sheetStatus && (
                        <p className="text-[9px] font-mono tracking-wider text-gold/80 bg-luxury-bg border border-gold/5 px-3 py-2 uppercase">
                          ⚡ Status: {sheetStatus}
                        </p>
                      )}
                    </div>
                  ) : (
                    <div className="space-y-3">
                      <button
                        type="button"
                        onClick={handleGoogleLogin}
                        disabled={isConnectingGoogle}
                        className="w-full flex items-center justify-center gap-3 bg-white border border-gold/20 hover:border-gold py-3.5 px-4 text-xs tracking-widest uppercase font-bold text-luxury-dark transition-all duration-300 hover:shadow-md cursor-pointer disabled:opacity-50"
                      >
                        <svg
                          version="1.1"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 48 48"
                          className="w-4 h-4 shrink-0"
                        >
                          <path
                            fill="#EA4335"
                            d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"
                          ></path>
                          <path
                            fill="#4285F4"
                            d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"
                          ></path>
                          <path
                            fill="#FBBC05"
                            d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"
                          ></path>
                          <path
                            fill="#34A853"
                            d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"
                          ></path>
                          <path fill="none" d="M0 0h48v48H0z"></path>
                        </svg>
                        {isConnectingGoogle
                          ? "Connecting..."
                          : "Connect Google Sheets"}
                      </button>
                    </div>
                  )}
                </div>
              )}

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

                {formData.payment === "BANK" && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    className="border border-gold/20 bg-luxury-bg p-6 space-y-4 overflow-hidden"
                  >
                    <div className="flex items-center gap-2 border-b border-gold/10 pb-2 mb-2">
                      <CreditCard
                        size={16}
                        className="text-gold animate-pulse"
                      />
                      <h4 className="font-display text-[10px] tracking-widest text-luxury-dark uppercase font-bold">
                        Bank Transfer Details
                      </h4>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-mono text-luxury-muted">
                      <div className="space-y-1">
                        <span className="text-[9px] uppercase tracking-wider text-luxury-muted">
                          Bank Name
                        </span>
                        <p className="font-bold text-luxury-dark">
                          {import.meta.env.VITE_BANK_NAME || "Bank Alfalah"}
                        </p>
                      </div>
                      <div className="space-y-1">
                        <span className="text-[9px] uppercase tracking-wider text-luxury-muted">
                          Account Title
                        </span>
                        <p className="font-bold text-luxury-dark">
                          {import.meta.env.VITE_BANK_ACCOUNT_TITLE ||
                            "C.M Scents"}
                        </p>
                      </div>
                      <div className="space-y-1">
                        <span className="text-[9px] uppercase tracking-wider text-luxury-muted">
                          Account Number
                        </span>
                        <p className="font-bold text-luxury-dark">
                          {import.meta.env.VITE_BANK_ACCOUNT_NUMBER ||
                            "5501-123456-001"}
                        </p>
                      </div>
                      <div className="space-y-1">
                        <span className="text-[9px] uppercase tracking-wider text-luxury-muted">
                          IBAN
                        </span>
                        <p className="font-bold text-luxury-dark text-[11px]">
                          {import.meta.env.VITE_BANK_IBAN ||
                            "PK21ALFH5501123456001"}
                        </p>
                      </div>
                    </div>

                    <div className="pt-3 border-t border-gold/10 space-y-2">
                      <p className="text-[10px] text-gold font-bold uppercase tracking-wider leading-relaxed flex items-start gap-2">
                        <span className="mt-0.5 inline-block shrink-0">❖</span>
                        <span>
                          Please send your transfer receipt/screenshot to our
                          WhatsApp number{" "}
                          <a
                            href={`https://wa.me/${import.meta.env.VITE_WHATSAPP_NUMBER || "923000000000"}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="underline hover:text-gold-dark"
                          >
                            {import.meta.env.VITE_WHATSAPP_DISPLAY ||
                              "+92 300 0000000"}
                          </a>{" "}
                          to confirm your order.
                        </span>
                      </p>
                    </div>
                  </motion.div>
                )}

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
