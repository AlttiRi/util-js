export class CountLatch {
    /** @param {number} count = 0 */
    constructor(count = 0) {
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

    countDown() {
        if (this.count > 0) {
            this.count--;
            if (this.count === 0) {
                this.resolve();
            }
        }
    }

    countUp() {
        if (this.count === 0) {
            this.promise = new Promise(resolve => {
                this.resolve = resolve;
            });
        }
        this.count++;
    }

    /** Makes this object "Thenable" */
    then(resolve, reject) {
        this.promise.then(resolve, reject);
    }
}
