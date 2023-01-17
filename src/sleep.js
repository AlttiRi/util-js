const __setImmediate = typeof setImmediate === "function" ? setImmediate : null;
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

export function sleep(ms) {
    if (ms === undefined) {
        return new Promise(resolve => setImmediate(resolve));
    }
    return new Promise(resolve => setTimeout(resolve, ms));
}
