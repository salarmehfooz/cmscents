import { useParams, useNavigate } from "react-router-dom";
import { PRODUCTS } from "../types";
import { useState, useMemo, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { useDispatch } from "react-redux";
import { addToCart, toggleCart } from "../store/cartSlice";
import {
  Star,
  Truck,
  ShieldCheck,
  Zap,
  ArrowLeft,
  ChevronRight,
  ChevronLeft,
} from "lucide-react";

export default function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const product = PRODUCTS.find((p) => p.id === Number(id));
  const [activeImage, setActiveImage] = useState(0);

  // Review Form State
  const [dynamicReviews, setDynamicReviews] = useState([]);
  const [isLoadingReviews, setIsLoadingReviews] = useState(true);
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [isSubmittingReview, setIsSubmittingReview] = useState(false);
  const [reviewForm, setReviewForm] = useState({
    name: "",
    rating: 5,
    comment: "",
    location: "",
  });

  const SCRIPT_URL =
    "https://script.google.com/macros/s/AKfycbzJ-e6FbB2zm2FMgSjBQ3lUu19z0hn1MmtlilHSrzUP2kuuKLVN1_s0B2g5n6fO1EEVrA/exec";

  // Fetch reviews from Google Sheets on load
  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await fetch(
          `${SCRIPT_URL}?type=getReviews&productId=${id}`,
        );
        const contentType = response.headers.get("content-type");

        if (contentType && contentType.indexOf("application/json") !== -1) {
          const data = await response.json();
          if (Array.isArray(data)) {
            setDynamicReviews(data);
          } else if (data.error) {
            console.error("Apps Script Error:", data.error);
          }
        } else {
          // If not JSON, it might be the "Apps Script is working" message or an error
          const text = await response.text();
          console.warn("Received non-JSON response:", text);
        }
      } catch (err) {
        console.error("Network or Parsing Error:", err);
      } finally {
        setIsLoadingReviews(false);
      }
    };
    fetchReviews();
  }, [id, SCRIPT_URL]);

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center font-display text-gold">
        Product not found.
      </div>
    );
  }

  // Combine static reviews from types.js with dynamic ones from the sheet
  const allReviews = useMemo(() => {
    return [...product.reviews, ...dynamicReviews];
  }, [product.reviews, dynamicReviews]);

  const averageRating = useMemo(() => {
    if (allReviews.length === 0) return 5;
    return (
      allReviews.reduce((acc, rev) => acc + Number(rev.rating), 0) /
      allReviews.length
    );
  }, [allReviews]);

  const handleAddToCart = () => {
    dispatch(addToCart(product));
    dispatch(toggleCart());
  };

  const handleReviewSubmit = async (e) => {
    e.preventDefault();
    setIsSubmittingReview(true);

    const reviewData = {
      type: "addReview",
      productId: id,
      productName: product.name,
      ...reviewForm,
      date: new Date().toLocaleDateString(),
    };

    try {
      await fetch(SCRIPT_URL, {
        method: "POST",
        mode: "no-cors",
        headers: { "Content-Type": "text/plain" },
        body: JSON.stringify(reviewData),
      });

      // Since it's no-cors, we manually add it to UI for immediate feedback
      setDynamicReviews((prev) => [
        ...prev,
        { ...reviewForm, id: Date.now().toString(), date: "Just now" },
      ]);

      setShowReviewForm(false);
      setReviewForm({ name: "", rating: 5, comment: "", location: "" });
      alert("Thank you! Your review has been submitted for verification.");
    } catch (err) {
      alert("Error submitting review. Please try again.");
    } finally {
      setIsSubmittingReview(false);
    }
  };

  return (
    <div className="bg-white">
      <div className="max-w-7xl mx-auto px-6 md:px-12 py-12 md:py-20">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-luxury-muted hover:text-gold transition-colors text-[10px] tracking-[0.4em] uppercase mb-12 group"
        >
          <ArrowLeft
            size={16}
            className="group-hover:-translate-x-1 transition-transform"
          />
          Back to Collection
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
          {/* Images Section */}
          <div className="space-y-6">
            <div className="aspect-[4/5] relative bg-luxury-bg2 overflow-hidden flex items-center justify-center group">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeImage}
                  initial={{ opacity: 0, scale: 1.1 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.6 }}
                  className="w-full h-full"
                >
                  {product.images[activeImage] ? (
                    <img
                      src={product.images[activeImage]}
                      alt={product.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div
                      className={`w-full h-full ${product.lbl} flex flex-col items-center justify-center p-20`}
                    >
                      <div className="font-display text-4xl font-bold text-[#D4A93A] tracking-[0.2em]">
                        {product.name}
                      </div>
                      <div className="text-6xl mt-8">{product.icon}</div>
                    </div>
                  )}
                </motion.div>
              </AnimatePresence>

              <div className="absolute top-1/2 -translate-y-1/2 left-4 right-4 flex justify-between pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity">
                <button
                  onClick={() =>
                    setActiveImage((prev) =>
                      prev > 0 ? prev - 1 : product.images.length - 1,
                    )
                  }
                  className="p-3 bg-white/20 backdrop-blur-md rounded-full pointer-events-auto hover:bg-white transition-all text-luxury-dark shadow-xl"
                >
                  <ChevronLeft size={20} />
                </button>
                <button
                  onClick={() =>
                    setActiveImage((prev) =>
                      prev < product.images.length - 1 ? prev + 1 : 0,
                    )
                  }
                  className="p-3 bg-white/20 backdrop-blur-md rounded-full pointer-events-auto hover:bg-white transition-all text-luxury-dark shadow-xl"
                >
                  <ChevronRight size={20} />
                </button>
              </div>
            </div>

            <div className="grid grid-cols-4 gap-4">
              {product.images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveImage(idx)}
                  className={`aspect-square border-2 transition-all overflow-hidden ${activeImage === idx ? "border-gold scale-95 shadow-lg" : "border-transparent opacity-50 hover:opacity-100"}`}
                >
                  <img src={img} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </div>

          {/* Info Section */}
          <div className="space-y-10">
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <p className="text-gold text-[10px] tracking-[0.6em] uppercase">
                  {product.category}
                </p>
                <span className="w-8 h-[1px] bg-gold/30"></span>
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      size={12}
                      className={
                        i < Math.floor(averageRating)
                          ? "fill-gold text-gold"
                          : "text-luxury-bg3"
                      }
                    />
                  ))}
                  <span className="text-[10px] text-luxury-muted ml-2">
                    ({allReviews.length} Impressions)
                  </span>
                </div>
              </div>
              <h1 className="text-5xl text-luxury-dark">{product.name}</h1>
              <p className="text-gold text-3xl font-display tracking-tight">
                Rs. {product.price.toLocaleString()}
              </p>
            </div>

            <div className="space-y-4">
              <h3 className="font-display text-[10px] tracking-[0.4em] uppercase text-luxury-muted border-b border-gold/10 pb-4">
                Profile
              </h3>
              <p className="font-serif italic text-xl text-luxury-dark leading-relaxed">
                "{product.desc}"
              </p>
              <p className="text-luxury-muted leading-relaxed text-sm">
                {product.longDesc}
              </p>
            </div>

            <div className="space-y-6">
              <h3 className="font-display text-[10px] tracking-[0.4em] uppercase text-luxury-muted border-b border-gold/10 pb-4">
                Fragrance Notes
              </h3>
              <div className="grid grid-cols-3 gap-8">
                {["Top", "Heart", "Base"].map((type, idx) => (
                  <div key={type} className="space-y-2">
                    <p className="text-[10px] tracking-widest uppercase text-gold">
                      {type} Notes
                    </p>
                    <p className="text-sm font-medium">
                      {product.notes[idx] || "Aromatic"}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 pt-6">
              <button
                onClick={handleAddToCart}
                className="flex-1 bg-luxury-dark text-white hover:bg-gold py-5 font-display text-xs tracking-[0.5em] uppercase transition-all hover:-translate-y-1 shadow-lg hover:shadow-gold/20"
              >
                Buy Now ♛
              </button>
              <button
                className="w-14 border border-gold/20 flex items-center justify-center text-luxury-muted hover:text-gold hover:border-gold transition-colors"
                title="Add to Wishlist"
              >
                ♥
              </button>
            </div>

            <div className="grid grid-cols-3 gap-4 pt-10 border-t border-gold/10">
              <div className="flex flex-col items-center text-center gap-2">
                <Truck size={18} className="text-gold" />
                <span className="text-[8px] tracking-[0.3em] uppercase text-luxury-muted">
                  Free Shipping
                </span>
              </div>
              <div className="flex flex-col items-center text-center gap-2 border-x border-gold/10">
                <ShieldCheck size={18} className="text-gold" />
                <span className="text-[8px] tracking-[0.3em] uppercase text-luxury-muted">
                  Authentic
                </span>
              </div>
              <div className="flex flex-col items-center text-center gap-2">
                <Zap size={18} className="text-gold" />
                <span className="text-[8px] tracking-[0.3em] uppercase text-luxury-muted">
                  Long Lasting
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Reviews Section */}
        <div className="mt-40 space-y-20">
          <div className="flex flex-col items-center text-center space-y-4">
            <p className="text-gold text-[10px] tracking-[0.8em] uppercase">
              ◆ Impressions ◆
            </p>
            <h2 className="text-4xl text-luxury-dark">Customer Reviews</h2>
            <div className="w-12 h-[1px] bg-gold mt-6" />

            {!showReviewForm && (
              <button
                onClick={() => setShowReviewForm(true)}
                className="mt-8 text-gold text-[10px] tracking-[0.4em] uppercase border-b border-gold/30 pb-2 hover:text-gold-dark transition-colors"
              >
                Verify Your Impression
              </button>
            )}
          </div>

          {/* Review Form Area */}
          <AnimatePresence>
            {showReviewForm && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="max-w-2xl mx-auto overflow-hidden bg-luxury-bg2/50 p-8 md:p-12 border border-gold/10"
              >
                <form onSubmit={handleReviewSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-[9px] tracking-widest uppercase text-luxury-muted">
                        Your Name
                      </label>
                      <input
                        required
                        type="text"
                        value={reviewForm.name}
                        onChange={(e) =>
                          setReviewForm({ ...reviewForm, name: e.target.value })
                        }
                        className="w-full border-b border-gold/20 focus:border-gold outline-none py-2 bg-transparent text-sm"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[9px] tracking-widest uppercase text-luxury-muted">
                        Location (City)
                      </label>
                      <input
                        required
                        type="text"
                        value={reviewForm.location}
                        onChange={(e) =>
                          setReviewForm({
                            ...reviewForm,
                            location: e.target.value,
                          })
                        }
                        className="w-full border-b border-gold/20 focus:border-gold outline-none py-2 bg-transparent text-sm"
                      />
                    </div>
                  </div>

                  <div className="space-y-4">
                    <label className="text-[9px] tracking-widest uppercase text-luxury-muted block">
                      Rating
                    </label>
                    <div className="flex gap-4">
                      {[1, 2, 3, 4, 5].map((num) => (
                        <button
                          key={num}
                          type="button"
                          onClick={() =>
                            setReviewForm({ ...reviewForm, rating: num })
                          }
                          className={`w-10 h-10 border flex items-center justify-center transition-all ${reviewForm.rating >= num ? "bg-gold text-white border-gold" : "border-gold/20 text-gold hover:border-gold"}`}
                        >
                          {num}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-[9px] tracking-widest uppercase text-luxury-muted">
                      Your Impression
                    </label>
                    <textarea
                      required
                      value={reviewForm.comment}
                      onChange={(e) =>
                        setReviewForm({
                          ...reviewForm,
                          comment: e.target.value,
                        })
                      }
                      className="w-full border-b border-gold/20 focus:border-gold outline-none py-2 bg-transparent text-sm min-h-[100px] resize-none"
                      placeholder="How does this scent make you feel?"
                    />
                  </div>

                  <div className="flex gap-4 pt-4">
                    <button
                      type="submit"
                      disabled={isSubmittingReview}
                      className="flex-1 bg-gold text-white py-4 font-display text-[10px] tracking-[0.4em] uppercase hover:bg-gold-dark transition-all disabled:opacity-50"
                    >
                      {isSubmittingReview
                        ? "Submitting..."
                        : "Submit Impression"}
                    </button>
                    <button
                      type="button"
                      onClick={() => setShowReviewForm(false)}
                      className="px-8 border border-gold/20 text-luxury-muted text-[10px] tracking-[0.4em] uppercase hover:border-gold"
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              </motion.div>
            )}
          </AnimatePresence>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {allReviews.map((rev, idx) => (
              <motion.div
                key={rev.id || idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="bg-luxury-bg border border-gold/5 p-10 relative overflow-hidden group"
              >
                <div className="absolute top-0 left-0 w-1 h-0 bg-gold group-hover:h-full transition-all duration-500" />
                <div className="text-[8px] tracking-widest uppercase text-luxury-muted mb-6 flex justify-between items-center">
                  <span>{rev.date}</span>
                  <span className="text-gold">{rev.location}</span>
                </div>
                <div className="flex gap-1 mb-6">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      size={10}
                      className={
                        i < rev.rating
                          ? "fill-gold text-gold"
                          : "text-luxury-bg3"
                      }
                    />
                  ))}
                </div>
                <p className="font-serif italic text-lg text-luxury-dark leading-relaxed mb-8">
                  "{rev.comment}"
                </p>
                <p className="font-display text-[10px] tracking-[0.4em] uppercase text-gold">
                  {rev.author || rev.name}
                </p>
              </motion.div>
            ))}

            {allReviews.length === 0 && !isLoadingReviews && (
              <div className="col-span-full text-center py-20 border border-dashed border-gold/20">
                <p className="font-serif italic text-luxury-muted text-xl">
                  No impressions yet. Be the first to share yours.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
