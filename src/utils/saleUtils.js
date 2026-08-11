/**
 * Utility to check if the 14th August Azadi Grand Sale is currently active.
 * Automatically ends when the calendar reaches August 17th (17 August 00:00:00).
 */
export function isAzadiSaleActive() {
  const now = new Date();
  const currentYear = now.getFullYear();
  
  // Expiry date: August 17th at 00:00:00 local time
  // Note: Month index 7 represents August in JavaScript Date objects.
  const expiryDate = new Date(currentYear, 7, 17, 0, 0, 0);
  
  return now < expiryDate;
}

export function getEffectiveProduct(product) {
  if (isAzadiSaleActive()) {
    return {
      ...product,
      price: Math.round(product.originalPrice * 0.6), // Flat 40% OFF
      originalPrice: product.originalPrice,
    };
  }
  return {
    ...product,
    price: product.originalPrice, // Full regular price
    originalPrice: null, // No strikethrough discount when sale ends
  };
}
