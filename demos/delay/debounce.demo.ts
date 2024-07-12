import {debounce, sleep} from "@/index";


function logTimeOrNum(num?: number, _unused = "xxx"): number | undefined {
    console.log(num ?? Date.now());
    return num;
}

const logDebounced = debounce(logTimeOrNum, 100);


console.log("1 row:");
logDebounced(0);


await sleep(200);
console.log("1 row:");
for (let i = 0; i < 10; i++) {
    logDebounced();
}


await sleep(200);
console.log("1 row:");
for (let i = 0; i < 10; i++) {
    await sleep(50);
    logDebounced(i);
}


await sleep(200);
console.log("3 row:");
await sleep(51);
logDebounced(51);
await sleep(105);
logDebounced(105);
await sleep(106);
logDebounced(106);
await sleep(52);
logDebounced(52);
await sleep(53);
logDebounced(53, "...");

