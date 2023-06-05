import {CountLatch} from "../src/sync/CountLatch.js";
import {sleep} from "../src/sleep.js";

console.log(1);
const counter = new CountLatch();

await counter;
console.log(2);

await counter;
console.log(3);

counter.countUp();
counter.countUp();

sleep(500).then(async () => {
    counter.countDown();
    console.log("down");

    await sleep(500);

    counter.countDown();
    console.log("down");
});

await counter;
console.log(4);

await counter;
console.log(5);

counter.countUp();
sleep(800).then(async () => {
    counter.countDown();
    console.log("down");
});

await counter;
console.log(6);
