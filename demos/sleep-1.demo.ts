import {sleep} from "@/index.ts";


await multipleSleepCall(  100); //   2 ms
await multipleSleepCall( 1000); //   6 ms
await multipleSleepCall(10000); //  30 ms
await multipleSleepCall(50000); //  90 ms

// With using setImmediate
async function multipleSleepCall(count = 1) {
    console.log("Call sleep function", count, "times...");
    const start = Date.now();
    for (let i = 0; i < count; i++) {
        await sleep();
    }
    console.log("Time consumed:", Date.now() - start, "ms");
}

