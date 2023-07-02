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
export function formatSizeWinLike(bytes) {
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
 * @param {number} number
 * @return {string}
 */
export function toTruncPrecision3(number) {
    let result;
    if (number < 10) {
        result = Math.trunc(number * 100) / 100;
    } else if (number < 100) {
        result = Math.trunc(number * 10) / 10;
    } else if (number < 1000) {
        result = Math.trunc(number);
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
export function formatNumber(num) {
    const str = num.toString();
    return str.padStart(str.length + (3 - str.length % 3)).match(/(.{3})/g).join(" ").trimStart();
}
