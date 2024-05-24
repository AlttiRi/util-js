/**
 * "Sun, 10 Jan 2021 22:22:22 GMT" -> "2021.01.10"
 * @param {(Date | string | number)?} dateValue
 * @param {boolean} utc = true
 * @return {string}
 */
export function dateToDayDateString(dateValue, utc = true) {
    return formatDate(dateValue, "YYYY.MM.DD", utc);
}

/**
 * "Sun, 10 Jan 2021 22:22:22 GMT" -> "2021.01.10 22:22:22Z"
 * @param {(Date | string | number)?} dateValue
 * @param {boolean?} utc = true
 * @return {string}
 */
export function dateToDayDateTimeString(dateValue, utc = true) {
    return formatDate(dateValue, "YYYY.MM.DD HH:mm:SS", utc) + (utc ? "Z" : "");
}

/**
 * "Sun, 10 Jan 2021 22:22:22 GMT" -> "2021.01.10 22:22:22"
 * @param {(Date | string | number)?} dateValue
 * @return {string}
 */
export function localDate(dateValue) {
    return dateToDayDateString(dateValue, false);
}
/**
 * "Sun, 10 Jan 2021 22:22:22 GMT" -> "2021.01.10"
 * @param {(Date | string | number)?} dateValue
 * @return {string}
 */
export function localDateTime(dateValue){
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
export function formatDate(dateValue = new Date(), pattern = "YYYY.MM.DD", utc = true) {
    dateValue = firefoxDateFix(dateValue);
    const date = new Date(dateValue);
    if (date.toString() === "Invalid Date") {
        console.warn("Invalid Date value: ", dateValue);
    }
    const formatter = new DateFormatter(date, utc);
    return pattern.replaceAll(/YYYY|YY|MM|DD|HH|mm|SS/g, (...args) => formatter[args[0]]);
}

/** @return {boolean} */
function isString(input) {
    return typeof input === "string" || input instanceof String;
}
function firefoxDateFix(dateValue) {
    return isString(dateValue) ? dateValue.replace(/(?<y>\d{4})\.(?<m>\d{2})\.(?<d>\d{2})/, "$<y>-$<m>-$<d>") : dateValue;
}
/** @return {string} */
function pad0(value, count = 2) {
    return value.toString().padStart(count, "0");
}
class DateFormatter {
    constructor(date = new Date(), utc = true) {
        this.date = date;
        this.utc = utc ? "UTC" : "";
    }
    get SS()   {return pad0(this.date[`get${this.utc}Seconds`]())}
    get mm()   {return pad0(this.date[`get${this.utc}Minutes`]())}
    get HH()   {return pad0(this.date[`get${this.utc}Hours`]())}

    get MM()   {return pad0(this.date[`get${this.utc}Month`]() + 1)}
    get DD()   {return pad0(this.date[`get${this.utc}Date`]())}
    get YYYY() {return pad0(this.date[`get${this.utc}FullYear`](), 4)}
    get YY()   {return this.YYYY.slice(2);}
}
