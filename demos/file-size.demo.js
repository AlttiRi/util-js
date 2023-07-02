import {formatNumber, formatSizeWinLike} from "../index.js";

console.log(formatNumber(123456789), "—", formatSizeWinLike(123456789));
console.log(formatNumber(12345678),  "—", formatSizeWinLike(12345678));
console.log(formatNumber(1234567),   "—", formatSizeWinLike(1234567));
