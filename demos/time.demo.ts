import {dateToDayDateString, dateToDayDateTimeString, localDate, localDateTime} from "../index";


console.log(dateToDayDateString(1234567890123));
console.log(dateToDayDateTimeString(1234567890123));

console.log(dateToDayDateString(1234567890123, false));
console.log(localDate(1234567890123));

console.log(dateToDayDateTimeString(1234567890123, false));
console.log(localDateTime(1234567890123));

console.log("---");
const jan10 = "Sun, 10 Jan 2021 22:22:22 GMT+9";
console.log(dateToDayDateTimeString(jan10,  true));
console.log(dateToDayDateTimeString(jan10, false));
console.log(localDateTime(jan10));
