/**
 * Utility to check if the storewide sale is currently active.
 * Flat 20% OFF on all products until 1st November (ends automatically at the end of 1st November).
 */
export function isSaleActive() {
  const now = new Date();
  const currentYear = now.getFullYear();

  // Expiry date: 1st November at 23:59:59 local time
  // Note: Month index 10 represents November in JavaScript Date objects (0 = Jan, 10 = Nov).
  const expiryDate = new Date(currentYear, 10, 1, 23, 59, 59, 999);

  return now <= expiryDate;
}

// Backward-compatible alias for any existing references
export const isAzadiSaleActive = isSaleActive;

export const SALE_CONFIG = {
  discountPercent: 20,
  saleTitle: 'Grand Autumn Sale',
  headline: 'FLAT 20% OFF',
  subheadline: 'ON ALL SIGNATURE FRAGRANCES',
  expiryDateText: '1st November',
  tag: 'Storewide Limited Time Offer',
};

export function getEffectiveProduct(product) {
  const basePrice = product.originalPrice || product.price;

  if (isSaleActive()) {
    return {
      ...product,
      basePrice,
      price: Math.round(basePrice * 0.8), // Flat 20% OFF
      originalPrice: basePrice,
      discountPercent: 20,
    };
  }

  return {
    ...product,
    basePrice,
    price: basePrice, // Full regular price when sale ends
    originalPrice: null, // No strikethrough discount when sale ends
    discountPercent: 0,
  };
}
