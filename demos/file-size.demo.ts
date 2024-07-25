import {formatNumber, formatSizeWinLike} from "@/index.ts";


console.log(formatNumber(123456789), "—", formatSizeWinLike(123456789));
console.log(formatNumber(12345678),  "—", formatSizeWinLike(12345678));
console.log(formatNumber(1234567),   "—", formatSizeWinLike(1234567));

// 123 456 789 — 117 MB
// 12 345 678 — 11.7 MB
// 1 234 567 — 1.17 MB
