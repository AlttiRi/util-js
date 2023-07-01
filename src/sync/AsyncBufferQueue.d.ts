import {Semaphore} from "./Semaphore";
import {VoidFunc} from "./VoidFunc";

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
    private resolve: VoidFunc;
    private semaphore: Semaphore;
    constructor(size: number = 128);
    close(): void;
    async enqueue(value: T): Promise<void>;
    async *[Symbol.asyncIterator](): AsyncGenerator<T>;
}
