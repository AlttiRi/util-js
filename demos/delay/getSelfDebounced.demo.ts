import {getSelfDebounced, getSelfDebouncedReject,} from "@/src/delay.ts";
import {sleep} from "@/src/sleep.ts";


const selfDebounced = getSelfDebounced(300);

// prints "99" after ~1300 ms
for (let i = 0; i < 100; i++) {
    selfDebounced().then((debounced) => {
        if (debounced) {
            return;
        }
        console.log(i);
    });
    await sleep(10);
}



const selfDebouncedReject = getSelfDebouncedReject(300);

// prints "99" after ~1300 ms
for (let i = 0; i < 100; i++) {
    selfDebouncedReject().then(() => {
        console.log(i);
    }).catch(() => {});
    await sleep(10);
}

