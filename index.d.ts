export { sleep } from "./src/sleep";

export {
    formatDate,
    dateToDayDateString,
    dateToDayDateTimeString,
} from "./src/date-formatter";

export {
    formatSizeWinLike, /* aka */ bytesToSizeWinLike,
} from "./src/byte-size-converter";

export { Semaphore }  from "./src/sync/Semaphore";
export { CountLatch } from "./src/sync/CountLatch";

export function isString(value: unknown): value is string;
