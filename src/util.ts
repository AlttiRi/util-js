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
