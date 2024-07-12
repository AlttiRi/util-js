import {getThrottle, sleep} from "@/index";


const {throttled, runNow, clear} = getThrottle(300, true);

for (let i = 0; i < 100; i++) {
    throttled(() => {
        console.log(i);
    });
    await sleep(10);
}
console.log("---");
runNow();
console.log("---");

// 0
// 20
// 40
// 60
// 80
// ---
// 99
// ---