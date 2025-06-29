import {isString} from "./util.js";

/**
 * "Sun, 10 Jan 2021 22:22:22 GMT" -> "2021.01.10"
 * @param {Date | string | number?} [dateValue]
 * @param {boolean} [utc = true]
 * @return {string}
 */
export function dateToDayDateString(dateValue?: Date | string | number, utc: boolean = true): string {
    return formatDate(dateValue, "YYYY.MM.DD", utc);
}

/**
 * "Sun, 10 Jan 2021 22:22:22 GMT" -> "2021.01.10 22:22:22Z"
 * @param {Date | string | number} [dateValue]
 * @param {boolean?} [utc = true]
 * @return {string}
 */
export function dateToDayDateTimeString(dateValue?: Date | string | number, utc: boolean = true): string {
    return formatDate(dateValue, "YYYY.MM.DD HH:mm:SS", utc) + (utc ? "Z" : "");
}

/**
 * "Sun, 10 Jan 2021 22:22:22 GMT" -> "2021.01.10"
 * @param {Date | string | number} [dateValue]
 * @return {string}
 */
export function localDate(dateValue?: number | string | Date): string {
    return dateToDayDateString(dateValue, false);
}
/**
 * "Sun, 10 Jan 2021 22:22:22 GMT" -> "2021.01.10 22:22:22"
 * @param {Date | string | number} [dateValue]
 * @return {string}
 */
export function localDateTime(dateValue?: number | string | Date): string {
    return dateToDayDateTimeString(dateValue, false);
}

/**
 * Formats date. Supports: YY.YYYY.MM.DD HH:mm:SS.
 * Default format: "YYYY.MM.DD".
 * formatDate() -> "2022.01.07"
 * @param {Date | string | number} [dateValue]
 * @param {string}  [pattern = "YYYY.MM.DD"]
 * @param {boolean} [utc = true]
 * @return {string}
 */
export function formatDate(dateValue: Date | string | number = new Date(), pattern: string = "YYYY.MM.DD", utc: boolean = true): string {
    dateValue = firefoxDateFix(dateValue);
    const date = new Date(dateValue);
    if (date.toString() === "Invalid Date") {
        console.warn("Invalid Date value: ", dateValue);
    }
    const formatter = new DateFormatter(date, utc);
    return pattern.replaceAll(/YYYY|YY|MM|DD|HH|hh|mm|SS|ss/g, (...args) => {
        const property = args[0] as "YYYY" | "YY" | "MM" | "DD" | "HH" | "hh" | "mm" | "SS" | "ss";
        return formatter[property];
    });
}

function firefoxDateFix<T extends Date | string | number>(dateValue: T): T {
    if (isString(dateValue)) {
        return dateValue.replace(/(?<y>\d{4})\.(?<m>\d{2})\.(?<d>\d{2})/, "$<y>-$<m>-$<d>") as T;
    }
    return dateValue;
}
/** @return {string} */
function pad0(value: number, count = 2): string {
    return value.toString().padStart(count, "0");
}
class DateFormatter {
    private readonly date: Date;
    private readonly utc: "UTC" | "";
    constructor(date = new Date(), utc = true) {
        this.date = date;
        this.utc = utc ? "UTC" : "";
    }

    // todo: remove SS, HH and bump major version, + change note
    get SS()   {
        console.log("SS is deprecated. Use ss.");
        return pad0(this.date[`get${this.utc}Seconds`]())
    }
    get ss()   {return pad0(this.date[`get${this.utc}Seconds`]())}
    get mm()   {return pad0(this.date[`get${this.utc}Minutes`]())}
    get HH()   {
        console.log("HH is deprecated. Use hh.");
        return pad0(this.date[`get${this.utc}Hours`]())
    }
    get hh()   {return pad0(this.date[`get${this.utc}Hours`]())}

    get MM()   {return pad0(this.date[`get${this.utc}Month`]() + 1)}
    get DD()   {return pad0(this.date[`get${this.utc}Date`]())}
    get YYYY() {return pad0(this.date[`get${this.utc}FullYear`](), 4)}
    get YY()   {return this.YYYY.slice(2);}
}
