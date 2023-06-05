export { sleep } from "./src/sleep.js";

export {
    formatDate,
    dateToDayDateString,
    dateToDayDateTimeString,
} from "./src/date-formatter.js";

export {
    formatSizeWinLike, /* aka */ bytesToSizeWinLike,
} from "./src/byte-size-converter.js";

export { Semaphore }  from "./src/sync/Semaphore.js";
export { CountLatch } from "./src/sync/CountLatch.js";

export function isString(value) { return typeof value === "string" || value instanceof String; }
