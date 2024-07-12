/** A classic `debounce` wrap function. */
export function debounce<A extends any[]>(runnable: (...args: A) => unknown, ms = 50, scope?: any): (...args: A) => void {
    let timerId: number | undefined;
    return function debounced(this: any): void {
        if (timerId !== undefined) {
            clearTimeout(timerId);
        }
        const delayed = () => {
            runnable.apply(scope || this, arguments as unknown as A);
            timerId = undefined;
        };
        timerId = setTimeout(delayed, ms);
    }
}

/** A classic `throttle` wrap function. */
export function throttle<A extends any[]>(runnable: (...args: A) => any, time = 50, scope?: any): (...args: A) => void {
    let waiting = false;
    let queued  = false;
    let context: any;
    let args: A;

    function delayed() {
        if (queued) {
            setTimeout(delayed, time);
            runnable.apply(scope || context, args);
        } else {
            waiting = false;
        }
        queued = false;
    }

    return function(this: any, ...current_args: A) {
        if (!waiting) {
            waiting = true;
            setTimeout(delayed, time);
            runnable.apply(scope || this, current_args);
        } else {
            context = this;
            args = current_args;
            queued = true;
        }
    }
}

/**
 * Allows to run a function as a `throttled` one, run it without a delay (`runNow`), or `clear` the deferred callback.
 *
 * @example
 * const {throttled, runNow, clear} = getThrottle(300, true);
 *
 * for (let i = 0; i < 100; i++) {
 *     throttled(() => {
 *         console.log(i);
 *     });
 *     await sleep(10);
 * }
 * runNow(); // run the last callback without delay
 */
export function getThrottle(ms = 1000, runFirstImmediately = true) {
    let cb: Function;
    let timer: number | undefined;
    function throttled(callback: Function, runNow = false) {
        cb = callback;
        if (runFirstImmediately || runNow) {
            runFirstImmediately = false;
            execNow();
            return;
        }
        if (timer) {
            return;
        }
        timer = setTimeout(() => {
            execNow(false);
        }, ms);
    }
    function execNow(clearDelayed = true) {
        if (clearDelayed) {
            clearTimeout(timer);
        }
        timer = undefined;
        return cb();
    }
    function clear() {
        clearTimeout(timer);
        timer = undefined;
    }
    return {throttled, runNow: execNow, clear};
}
