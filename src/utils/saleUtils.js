/**
 * Utility to check if the storewide sale is currently active.
 * Flat 20% OFF on all products + Buy Any 3 Perfumes for Rs. 5,000 until 1st November.
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

export const BUNDLE_SIZE = 3;
export const BUNDLE_PRICE = 5000;

export const SALE_CONFIG = {
  discountPercent: 20,
  bundleSize: BUNDLE_SIZE,
  bundlePrice: BUNDLE_PRICE,
  saleTitle: 'Grand Autumn Sale',
  headline: 'FLAT 20% OFF',
  bundleHeadline: 'BUY ANY 3 FOR RS. 5,000',
  subheadline: 'ON ALL SIGNATURE FRAGRANCES',
  expiryDateText: '1st November',
  tag: 'Storewide Limited Time Offers',
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

/**
 * Calculates cart totals including the 20% discount AND the "Buy Any 3 for Rs. 5,000" bundle offer.
 * Every set of 3 perfumes is bundled for Rs. 5,000.
 * Any remainder perfume is charged at its individual 20% off price.
 */
export function calculateCartTotals(items = []) {
  if (!items || items.length === 0) {
    return {
      originalTotal: 0,
      standardDiscountedTotal: 0,
      total: 0,
      totalSavings: 0,
      bundleSavings: 0,
      bundleCount: 0,
      totalItemsCount: 0,
      itemsToNextBundle: 3,
      bundleApplied: false,
    };
  }

  const individualUnits = [];
  let originalTotal = 0;
  let standardDiscountedTotal = 0;
  let totalItemsCount = 0;

  items.forEach((item) => {
    const qty = item.quantity || 1;
    const basePrice = item.basePrice || item.originalPrice || item.price;
    const discountedPrice = item.price;

    originalTotal += basePrice * qty;
    standardDiscountedTotal += discountedPrice * qty;
    totalItemsCount += qty;

    for (let i = 0; i < qty; i++) {
      individualUnits.push({
        id: item.id,
        name: item.name,
        basePrice,
        discountedPrice,
      });
    }
  });

  // Sort individual units descending by discountedPrice so the bundle covers the highest value items
  individualUnits.sort((a, b) => b.discountedPrice - a.discountedPrice);

  const bundleCount = Math.floor(totalItemsCount / BUNDLE_SIZE);
  const bundledUnitsCount = bundleCount * BUNDLE_SIZE;
  const remainderUnitsCount = totalItemsCount % BUNDLE_SIZE;
  const itemsToNextBundle = remainderUnitsCount === 0 ? 0 : BUNDLE_SIZE - remainderUnitsCount;

  let finalTotal = standardDiscountedTotal;
  let bundleApplied = false;
  let bundleSavings = 0;

  if (isSaleActive() && bundleCount > 0) {
    const bundlePrice = bundleCount * BUNDLE_PRICE;
    const remainderSum = individualUnits
      .slice(bundledUnitsCount)
      .reduce((sum, u) => sum + u.discountedPrice, 0);

    const bundledCandidate = bundlePrice + remainderSum;

    // Use bundle price if it provides equal or better savings than individual 20% discounts
    if (bundledCandidate <= standardDiscountedTotal) {
      finalTotal = bundledCandidate;
      bundleApplied = true;
      bundleSavings = standardDiscountedTotal - finalTotal;
    }
  }

  const totalSavings = Math.max(0, originalTotal - finalTotal);

  return {
    originalTotal,
    standardDiscountedTotal,
    total: finalTotal,
    totalSavings,
    bundleSavings,
    bundleCount,
    totalItemsCount,
    itemsToNextBundle,
    bundleApplied,
  };
}
