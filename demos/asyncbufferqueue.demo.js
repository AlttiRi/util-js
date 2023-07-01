import {AsyncBufferQueue} from "../src/sync/AsyncBufferQueue.js";
import {sleep} from "../src/sleep.js";

const queue = new AsyncBufferQueue(4);

!async function dataGenerator() {
    for (let i = 0; i < 10; i++) {
        const value = await (async function getAsyncData() {
            await sleep(100);
            return i + 1;
        })();
        await queue.enqueue(value);
        console.log("enqueued", value);
    }
    queue.close();
}();

for await (const queueElement of queue) {
    console.log(queueElement);
    await sleep(Math.random() * 400);
}
