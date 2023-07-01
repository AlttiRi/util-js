import {Semaphore} from "./Semaphore.js";

export class AsyncBufferQueue {
    constructor(size = 128) {
        this.values = [];
        this.done = false;
        this.promise = new Promise(resolve => {
            this.resolve = resolve;
        });
        this.semaphore = new Semaphore(size);
    }
    close() {
        this.done = true;
        this.resolve();
    }
    async enqueue(value) {
        await this.semaphore.acquire();
        this.values.push(value);
        this.resolve();
        this.promise = new Promise(resolve => {
            this.resolve = resolve;
        });
    }
    async *[Symbol.asyncIterator]() {
        while (true) {
            await this.promise;
            if (this.done && !this.values.length) {
                break;
            }
            yield this.values.shift();
            this.semaphore.release();
        }
    }
}
