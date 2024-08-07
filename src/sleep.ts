// @ts-ignore
const __setImmediate = typeof globalThis.setImmediate === "function" ? globalThis.setImmediate : null;

const setImmediate = __setImmediate || /*#__PURE__*/ (function() {
    const {port1, port2} = new MessageChannel();
    const queue: Function[] = [];
    port1.onmessage = function() {
        const callback = queue.shift()!;
        callback();
    };
    return function setImmediateLike(callback: Function) { // Simplified implementation: only callback argument.
        port2.postMessage(null);
        queue.push(callback);
    };
})();

/**
 * Sleeps `ms` milliseconds.
 * If param is `undefined` it sleeps until the next macro-task.
 * Note: With `0` real ms will be `4`+ ms.
 * @param {number?} ms
 * */
export function sleep(ms?: number): Promise<void> {
    if (ms === undefined) {
        return new Promise(resolve => setImmediate(resolve));
    }
    return new Promise(resolve => setTimeout(resolve, ms));
}

/**
 * Interruptible `sleep`.
 * If was interrupted resolves with the interrupt reason (`signal.reason`).
 * @param {number} ms
 * @param {AbortSignal} signal
 */
export function sleepEx(ms: number, signal: AbortSignal): Promise<void | any> {
    if (signal.aborted) {
        return Promise.resolve(signal.reason);
    }
    let timerId: number;
    return new Promise(resolve => {
        timerId = setTimeout(resolve, ms);
        signal.onabort = () => {
            clearTimeout(timerId);
            resolve(signal.reason);
        };
    });
}
