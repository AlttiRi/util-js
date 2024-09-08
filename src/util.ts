export function isString(value: unknown): value is string {
    return typeof value === "string";
}
export function isAnyString(value: unknown): value is (string | String) {
    return typeof value === "string" || value instanceof String;
}
/**
 * Java's `hashCode` like.
 * @example
 * hashString("Lorem Ipsum") === -488052133
 * hashString("Qwerty") === -1862984904
 * hashString("A") === 65
 * hashString("👾👽💀") === -2019372252
 * @param {string} str
 * @return {number}
 */
export function hashString(str: string): number {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
        hash = Math.imul(Math.imul(31, hash) + str.charCodeAt(i), 1);
    }
    return hash;
}

export type DownloadBlobOpt = {
    /** The URL to be added as a hash in the downloaded blob URL. Useful to keep the original file URL. */
    url?: string;
    /** The delay before `revokeObjectURL`. 5000 by default. */
    timeout?: number;
}
export function downloadBlob(blob: Blob, name: string, url?: string): void;
export function downloadBlob(blob: Blob, name: string, opt: DownloadBlobOpt): void;
export function downloadBlob(blob: Blob, name: string = "", urlOrOpts?: string | DownloadBlobOpt): void {
    const anchor = document.createElement("a");
    anchor.setAttribute("download", name || "");
    const blobUrl = URL.createObjectURL(blob);
    let url: string | undefined;
    let timeout: number = 5000;
    if (isString(urlOrOpts)) {
        url = urlOrOpts;
    } else {
        url = urlOrOpts?.url;
        timeout = urlOrOpts?.timeout || timeout;
    }
    anchor.href = blobUrl + (url ? ("#" + url) : "");
    anchor.click();
    setTimeout(() => URL.revokeObjectURL(blobUrl), timeout);
}
