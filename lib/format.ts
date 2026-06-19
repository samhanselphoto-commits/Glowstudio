/**
 * Format VND theo chuẩn §9.7: 199.000đ (dot thousands, đ suffix, NO space)
 * KHÔNG dùng "199,000 VND" hay "199K"
 */
export function formatVND(amount: number): string {
  return `${amount.toLocaleString("vi-VN").replace(/,/g, ".")}đ`;
}

/** Format credit count with thousand separators: 1247 → "1.247" */
export function formatCredits(n: number): string {
  return n.toLocaleString("vi-VN").replace(/,/g, ".");
}
