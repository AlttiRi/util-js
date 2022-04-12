export const setImmediate = globalThis.setImmediate || /*#__PURE__*/ (function() {
    const {port1, port2} = new MessageChannel();
    const queue = [];

    port1.onmessage = function() {
        const callback = queue.shift();
        callback();
    };

    return function(callback) {
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
