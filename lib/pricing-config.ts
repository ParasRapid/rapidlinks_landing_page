// ─────────────────────────────────────────────────────────────
//  RapidLinks Pricing Configuration
//  Edit these values to update pricing across the entire site.
// ─────────────────────────────────────────────────────────────

export type ProductId = 'domestic' | 'international' | 'accounting';
export type DurationMonths = 3 | 6 | 12;

// License fees per product per duration (INR, one-time)
export const LICENSE_FEES: Record<ProductId, Record<DurationMonths, number>> = {
  domestic: {
    3: 8999,
    6: 15999,
    12: 27999,
  },
  international: {
    3: 11999,
    6: 20999,
    12: 35999,
  },
  accounting: {
    3: 6999,
    6: 11999,
    12: 19999,
  },
};

// Per-order usage fee per product (INR per order/transaction)
export const PER_ORDER_RATES: Record<ProductId, number> = {
  domestic: 1.0,
  international: 2.5,
  accounting: 0.5,
};

// Volume discount slabs — if monthly orders exceed threshold, apply reduced rate
export const VOLUME_DISCOUNTS: Array<{ threshold: number; discountPercent: number; label: string }> = [
  { threshold: 0,     discountPercent: 0,  label: 'Standard rate' },
  { threshold: 5000,  discountPercent: 10, label: '10% volume discount' },
  { threshold: 15000, discountPercent: 20, label: '20% volume discount' },
  { threshold: 30000, discountPercent: 30, label: '30% volume discount' },
];

// Duration savings — percentage saved vs. buying 3-month license repeatedly
export const DURATION_SAVINGS: Record<DurationMonths, number> = {
  3: 0,
  6: 11,   // ~11% cheaper vs. 2× 3-month
  12: 22,  // ~22% cheaper vs. 4× 3-month
};

// Product metadata for display
export const PRODUCT_INFO: Record<ProductId, {
  name: string;
  tagline: string;
  description: string;
  features: string[];
  startingPrice: { months: DurationMonths; price: number };
  perOrderRate: number;
}> = {
  domestic: {
    name: 'Domestic',
    tagline: 'End-to-end domestic courier management',
    description: 'Full-featured platform for managing domestic shipments across India — from booking to delivery.',
    features: [
      'Order booking & pickup scheduling',
      'Real-time shipment tracking',
      'COD collection & reconciliation',
      'Multi-courier partner integration',
      'Bulk order upload via CSV/API',
      'Automated label & AWB generation',
      'Delivery exception management',
      'Customer notification automation',
    ],
    startingPrice: { months: 6, price: 15999 },
    perOrderRate: 1.0,
  },
  international: {
    name: 'International',
    tagline: 'Cross-border shipment management',
    description: 'Manage international shipments with compliance, documentation, and multi-currency support built in.',
    features: [
      'Customs documentation & e-filing',
      'HS code classification & validation',
      'Multi-currency invoicing & FX tracking',
      'International carrier integrations',
      'Shipment compliance checks',
      'Duties & taxes calculation',
      'Export/import regulation guidance',
      'Global real-time tracking',
    ],
    startingPrice: { months: 6, price: 20999 },
    perOrderRate: 2.5,
  },
  accounting: {
    name: 'Accounting',
    tagline: 'Financial management for logistics businesses',
    description: 'Automate your logistics billing, GST reconciliation, and financial reporting in one unified dashboard.',
    features: [
      'Automated billing & ledger management',
      'GST / tax reconciliation & filing',
      'Courier partner billing reconciliation',
      'COD settlement tracking & reports',
      'P&L dashboards & financial analytics',
      'Client-wise profitability reports',
      'Accounts payable & receivable',
      'Audit-ready financial exports',
    ],
    startingPrice: { months: 6, price: 11999 },
    perOrderRate: 0.5,
  },
};

// Utility: calculate total estimated cost for selected products + duration + monthly orders
export function calculateEstimate(
  selectedProducts: ProductId[],
  duration: DurationMonths,
  monthlyOrders: number
): {
  licenseFee: number;
  usageCostPerMonth: number;
  totalUsageCost: number;
  totalCost: number;
  effectiveMonthlyLicenseCost: number;
  volumeDiscount: { threshold: number; discountPercent: number; label: string };
  breakdown: Array<{ productId: ProductId; licenseFee: number; perOrderRate: number; monthlyUsage: number }>;
} {
  const volumeDiscount = [...VOLUME_DISCOUNTS]
    .reverse()
    .find(slab => monthlyOrders >= slab.threshold) ?? VOLUME_DISCOUNTS[0];

  const breakdown = selectedProducts.map(productId => {
    const licenseFee = LICENSE_FEES[productId][duration];
    const baseRate = PER_ORDER_RATES[productId];
    const discountedRate = baseRate * (1 - volumeDiscount.discountPercent / 100);
    const monthlyUsage = monthlyOrders * discountedRate;
    return { productId, licenseFee, perOrderRate: discountedRate, monthlyUsage };
  });

  const licenseFee = breakdown.reduce((sum, b) => sum + b.licenseFee, 0);
  const usageCostPerMonth = breakdown.reduce((sum, b) => sum + b.monthlyUsage, 0);
  const totalUsageCost = usageCostPerMonth * duration;
  const totalCost = licenseFee + totalUsageCost;
  const effectiveMonthlyLicenseCost = duration > 0 ? licenseFee / duration : 0;

  return {
    licenseFee,
    usageCostPerMonth,
    totalUsageCost,
    totalCost,
    effectiveMonthlyLicenseCost,
    volumeDiscount,
    breakdown,
  };
}

export function formatINR(amount: number): string {
  if (amount >= 100000) {
    return `₹${(amount / 100000).toFixed(1)}L`;
  }
  if (amount >= 1000) {
    return `₹${amount.toLocaleString('en-IN')}`;
  }
  return `₹${amount.toFixed(0)}`;
}
