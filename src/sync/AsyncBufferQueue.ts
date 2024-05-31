import {VoidFunc} from "./VoidFunc";
import {Semaphore} from "./Semaphore.js";

/**
 * Use it when in one place you need to `enqueue()` some `value`, until `close()`.
 * In other place you can iterate over this queue in for-await loop.
 *
 * `enqueue` does not add a value until there is a free space in the queue, you should `await` it.
 * (`size` parameter of `constructor`).
 *
 * Use `close()` after you finished to `enqueue()` data.
 */
export class AsyncBufferQueue<T> {
    private values: T[];
    private done: boolean;
    private promise: Promise<void>;
    private resolve!: VoidFunc;
    private semaphore: Semaphore;

    constructor(size: number = 128) {
        this.values = [];
        this.done = false;
        this.promise = new Promise(resolve => {
            this.resolve = resolve;
        });
        this.semaphore = new Semaphore(size);
    }
    close(): void {
        this.done = true;
        this.resolve();
    }
    async enqueue(value: T): Promise<void> {
        await this.semaphore.acquire();
        this.values.push(value);
        this.resolve();
        this.promise = new Promise(resolve => {
            this.resolve = resolve;
        });
    }
    async *[Symbol.asyncIterator](): AsyncGenerator<T> {
        while (true) {
            await this.promise;
            if (this.done && !this.values.length) {
                break;
            }
            yield this.values.shift()!;
            this.semaphore.release();
        }
    }
}
