/** @deprecated */
export {formatSizeWinLike as bytesToSizeWinLike}; // The old name

/**
 * Formats bytes mostly like Windows does,
 * but in some rare cases the result is different.
 * Check the file with tests.
 * @see format-size-win-like.test.js
 * @param {number} bytes
 * @return {string}
 */
export function formatSizeWinLike(bytes: number): string {
    if (bytes < 1024) { return bytes + " B"; }
    const sizes = ["B", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];
    let i = Math.floor(Math.log(bytes) / Math.log(1024));
    let result = bytes / Math.pow(1024, i);
    if (result >= 1000) {
        i++;
        result /= 1024;
    }
    return toTruncPrecision3(result) + " " + sizes[i];
}

/**
 * @example
 * 10.1005859375 -> "10.1"
 * 9.99902343750 -> "9.99"
 * 836.966796875 -> "836"
 * 0.08   -> "0.08"
 * 0.099  -> "0.09"
 * 0.0099 -> "0"
 * @param {number} number
 * @return {string}
 */
export function toTruncPrecision3(number: number): string {
    let result;
    if (number < 10) {
        result = Math.trunc(number * 100) / 100;
    } else if (number < 100) {
        result = Math.trunc(number * 10) / 10;
    } else if (number < 1000) {
        result = Math.trunc(number);
    } else {
        return Math.trunc(number).toString();
    }
    if (number < 0.1) {
        return result.toPrecision(1);
    } else if (number < 1) {
        return result.toPrecision(2);
    }
    return result.toPrecision(3);
}

/** @deprecated */
export {formatNumber as tripleSizeGroups}; // The old name

/**
 * Useful for file byte size formatting:
 * 34456909 -> 34 456 909
 * @param {number} num
 * @return {string}
 * */
export function formatNumber(num: number): string {
    const str = num.toString();
    const maxLength = str.length + (3 - str.length % 3);
    const result = str.padStart(maxLength, " ")
        .match(/(.{3})/g)!
        .join(" ")
        .trimStart();
    if (num < 0) {
        return result.replace(/^- /, "-");
    }
    return result;
}
