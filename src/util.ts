export function isString(value: unknown): value is string {
    return typeof value === "string";
}
export function isAnyString(value: unknown): value is (string | String) {
    return typeof value === "string" || value instanceof String;
}
