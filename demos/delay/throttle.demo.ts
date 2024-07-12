import {throttle, sleep} from "@/index";


function logTimeOrNum(num?: number, extra?: any): number | undefined {
    if (arguments.length === 2) {
        console.log(num ?? Date.now(), extra);
    } else {
        console.log(num ?? Date.now());
    }
    return num;
}

const logThrottled = throttle(logTimeOrNum, 100);


console.log("1 row:");
logThrottled(0);


await sleep(200);
console.log("2 rows:");
for (let i = 0; i < 10; i++) {
    logThrottled(undefined, i);
}


await sleep(200);
const now = Date.now();
console.log("4 rows:");
for (let i = 0; i < 10; i++) {
    logThrottled(i, Date.now() - now);
    await sleep(30);
}


