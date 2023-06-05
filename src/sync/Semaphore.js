/** The most simple semaphore implementation. */
export class Semaphore {
    /** @param {number} max = 1 - by default, it works as a mutex. */
    constructor(max = 1) {
        if (max < 1) {
            max = 1;
        }
        /** @type {number} */
        this.max = max;
        /** @type {number} */
        this.count = 0;
        /** @type {VoidFunc[]} */
        this.resolveQueue = [];
    }

    /** @return {Promise<void>} */
    acquire() {
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
    release() {
        if (this.resolveQueue.length > 0) {
            const resolve = this.resolveQueue.shift();
            resolve();
        }
        this.count--;
    }
}
