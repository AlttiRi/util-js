/**
 * "Sun, 10 Jan 2021 22:22:22 GMT" -> "2021.01.10"
 * @param {(Date | string | number)?} dateValue
 * @param {boolean} utc = true
 * @return {string}
 */
export function     dateToDayDateString(dateValue?: Date | string | number, utc?: boolean): string;
/**
 * "Sun, 10 Jan 2021 22:22:22 GMT" -> "2021.01.10 22:22:22Z"
 * @param {(Date | string | number)?} dateValue
 * @param {boolean?} utc = true
 * @return {string}
 */
export function dateToDayDateTimeString(dateValue?: Date | string | number, utc?: boolean): string;
/**
 * "Sun, 10 Jan 2021 22:22:22 GMT" -> "2021.01.10 22:22:22"
 * @param {(Date | string | number)?} dateValue
 * @return {string}
 */
export function localDate(dateValue: number | string | Date): string  {
    return dateToDayDateString(dateValue, false);
}
/**
 * "Sun, 10 Jan 2021 22:22:22 GMT" -> "2021.01.10"
 * @param {(Date | string | number)?} dateValue
 * @return {string}
 */
export function localDateTime(dateValue: number | string | Date): string {
    return dateToDayDateTimeString(dateValue, false);
}
/**
 * Formats date. Supports: YY.YYYY.MM.DD HH:mm:SS.
 * Default format: "YYYY.MM.DD". formatDate() -> "2022.01.07"
 * @param {(Date | string | number)?} dateValue
 * @param {string?} pattern
 * @param {boolean?} utc
 * @return {string}
 */
export function formatDate(dateValue?: Date | string | number, pattern?: string, utc?: boolean): string;
