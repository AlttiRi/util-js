import {VoidFunc} from "./VoidFunc";

export class CountLatch {
    private count: number;
    private promise: Promise<void>;
    private resolve!: VoidFunc;

    /** @param {number} count = 0 */
    constructor(count: number = 0) {
        /** @type {number} */
        this.count = count;
        if (count === 0) {
            /** @type {Promise<void>} */
            this.promise = Promise.resolve();
            /** @type {VoidFunc} */
            this.resolve = () => {};
            return;
        }
        this.promise = new Promise(resolve => {
            this.resolve = resolve;
        });
    }

    countDown(): void {
        if (this.count > 0) {
            this.count--;
            if (this.count === 0) {
                this.resolve();
            }
        }
    }

    countUp(): void {
        if (this.count === 0) {
            this.promise = new Promise(resolve => {
                this.resolve = resolve;
            });
        }
        this.count++;
    }

    /** Makes this object "Thenable" */
    then(resolve: VoidFunc, reject: VoidFunc): Promise<void> {
        return this.promise.then(resolve, reject);
    }
}
