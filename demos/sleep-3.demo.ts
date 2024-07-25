import {sleep} from "@/index.ts";


console.time("sleep()");
for (let i = 0; i < 100; i++) {
    await sleep();
}
console.timeEnd("sleep()"); // ~1.5 ms // 0.0015 s


// ~1000 times slower
console.time("sleep(0)");
for (let i = 0; i < 100; i++) {
    await sleep(0);
}
console.timeEnd("sleep(0)"); // ~1.5 s


console.time("sleep(1)");
for (let i = 0; i < 100; i++) {
    await sleep(1);
}
console.timeEnd("sleep(1)"); // ~1.5 s


console.time("sleep(4)");
for (let i = 0; i < 100; i++) {
    await sleep(4);
}
console.timeEnd("sleep(4)"); // ~1.5 s

console.time("sleep(10)");
for (let i = 0; i < 100; i++) {
    await sleep(10);
}
console.timeEnd("sleep(10)"); // ~1.5 s
