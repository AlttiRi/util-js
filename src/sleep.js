const __setImmediate = typeof globalThis.setImmediate === "function" ? globalThis.setImmediate : null;
const setImmediate = __setImmediate || /*#__PURE__*/ (function() {
    const {port1, port2} = new MessageChannel();
    const queue = [];
    port1.onmessage = function() {
        const callback = queue.shift();
        callback();
    };
    return function setImmediateLike(callback) { // Simplified implementation: only callback argument.
        port2.postMessage(null);
        queue.push(callback);
    };
})();

/**
 * Sleeps `ms` milliseconds.
 * If param is `undefined` it sleeps until the next macro-task.
 * Note: with `0` real ms will be `4` ms.
 * @param {number?} ms
 * */
export function sleep(ms) {
    if (ms === undefined) {
        return new Promise(resolve => setImmediate(resolve));
    }
    return new Promise(resolve => setTimeout(resolve, ms));
}

console.time("1");
for (let i = 0; i < 1000; i++) {
    await sleep();
}
console.timeEnd("1");
