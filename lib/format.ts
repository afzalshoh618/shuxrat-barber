/**
 * Format price in UZS deterministically on both server and client.
 * Example: 150000 -> "150,000"
 */
export function formatPrice(price: number): string {
  if (!price && price !== 0) return '0';
  return Math.round(price)
    .toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}
