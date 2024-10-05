import {VoidFunc} from "./VoidFunc.js";

/** The most simple semaphore implementation. */
export class Semaphore {
    private readonly max: number;
    private        count: number;
    private readonly resolveQueue: VoidFunc[];

    /** @param {number} [max = 1] - by default, it works as a mutex. */
    constructor(max: number = 1) {
        if (max < 1) {
            max = 1;
        }
        this.max = max;
        this.count = 0;
        this.resolveQueue = [];
    }

    /** @return {Promise<unknown>} */
    acquire(): Promise<unknown> {
        let promise;
        if (this.count < this.max) {
            promise = Promise.resolve();
        } else {
            promise = new Promise(resolve => {
                this.resolveQueue.push(resolve);
            });
        }
        this.count++;
        return promise;
    }
    /** @return {void} */
    release(): void {
        if (this.resolveQueue.length > 0) {
            const resolve = this.resolveQueue.shift();
            resolve!();
        }
        this.count--;
    }
}
