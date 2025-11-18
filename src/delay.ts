/**
 * A classic `debounce` wrap function.
 *
 * Wraps a function to create a debounced version that delays execution until after a specified time has elapsed since the last call.
 * Only the last call within the specified time window is executed.
 *
 * @param runnable - The function to debounce.
 * @param ms - The debounce delay in milliseconds (default: 250).
 * @param scope - Optional context to bind the function to (defaults to the caller's context).
 * @returns A debounced function that delays execution of the provided function.
 * @example
 * const logAny = (i: any) => console.log(i);
 * const logAnyDebounced = debounce(logAny, 50);
 *
 * // prints `99` after ~1+ second
 * for (let i = 0; i < 100; i++) {
 *     logAnyDebounced(i);
 *     await sleep(10);
 * }
 */
export function debounce<A extends any[]>(runnable: (...args: A) => unknown, ms = 250, scope?: any): (...args: A) => void {
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

/**
 * Creates a debounced function that resolves to `false` after a specified delay,
 * or `true` if called again before the delay expires.
 *
 * The function ensures that only the last call within the specified time window resolves to `false`,
 * while earlier calls resolve to `true`.
 *
 * @param ms - The debounce delay in milliseconds (default: 250).
 * @returns An async function that returns a Promise resolving to a boolean indicating
 * whether the call was debounced (`true`) or not (`false`).
 * @example
 * const selfDebounced = getSelfDebounced(300);
 *
 * // prints "99" after ~1300 ms
 * for (let i = 0; i < 100; i++) {
 *     selfDebounced().then((debounced) => {
 *         if (debounced) {
 *             return;
 *         }
 *         console.log(i);
 *     });
 *     await sleep(10);
 * }
 */
export function getSelfDebounced(ms: number = 250) {
    let timerId: number | undefined;
    let resolve: ((value: boolean) => void) | undefined;
    return async function selfDebounced() {
        if (resolve) {
            if (timerId !== undefined) {
                clearTimeout(timerId);
            }
            resolve(true);
        }
        timerId = setTimeout(() => {
            resolve!(false);
        }, ms);
        return new Promise<boolean>(_resolve => {
            resolve = _resolve;
        });
    }
}

/**
 * Creates a debounced function that resolves after a specified delay, or rejects if called again before the delay expires.
 * The function ensures that only the last call within the specified time window resolves, while earlier calls reject.
 *
 * @param ms - The debounce delay in milliseconds (default: 250).
 * @returns An async function that returns a Promise that either resolves (for the last call) or rejects (for earlier calls).
 * @example
 * const selfDebouncedReject = getSelfDebouncedReject(300);
 *
 * // prints "99" after ~1300 ms
 * for (let i = 0; i < 100; i++) {
 *     selfDebouncedReject().then(() => {
 *         console.log(i);
 *     }).catch(() => {});
 *     await sleep(10);
 * }
 */
export function getSelfDebouncedReject(ms: number = 250) {
    let timerId: number | undefined;
    let resolve: (() => void) | undefined;
    let reject:  (() => void) | undefined;
    return async function selfDebounced() {
        if (resolve) {
            if (timerId !== undefined) {
                clearTimeout(timerId);
            }
            reject!();
        }
        timerId = setTimeout(() => {
            resolve!();
        }, ms);
        return new Promise<void>((_resolve, _reject) => {
            resolve = _resolve;
            reject  = _reject;
        });
    }
}


/**
 * A classic `throttle` wrap function.
 *
 * Wraps a function to create a throttled version that executes no more than once per specified time interval.
 * The first call is executed immediately, and if additional calls occur within the interval,
 * the last one is executed after the interval expires.
 *
 * @param runnable - The function to throttle.
 * @param ms - The throttle interval in milliseconds (default: 250).
 * @param scope - Optional context to bind the function to (defaults to the caller's context).
 * @returns A throttled function that limits execution frequency.
 * @example
 * const logAny = (i: any) => console.log(i);
 * const logAnyThrottled = throttle(logAny, 500);
 *
 * // prints "0 31 63 96 99" (intermediate values like "31 63 96" may vary)
 * for (let i = 0; i < 100; i++) {
 *     logAnyThrottled(i);
 *     await sleep(10);
 * }
 */
export function throttle<A extends any[]>(runnable: (...args: A) => any, ms = 250, scope?: any): (...args: A) => void {
    let waiting = false;
    let queued  = false;
    let context: any;
    let args: A;

    function delayed() {
        if (queued) {
            setTimeout(delayed, ms);
            runnable.apply(scope || context, args);
        } else {
            waiting = false;
        }
        queued = false;
    }

    return function(this: any, ...current_args: A) {
        if (!waiting) {
            waiting = true;
            setTimeout(delayed, ms);
            runnable.apply(scope || this, current_args);
        } else {
            context = this;
            args = current_args;
            queued = true;
        }
    }
}

/**
 * Creates a throttled function with control methods to execute immediately (`runNow`) or `clear` pending callbacks.
 * The throttled function limits execution to once per specified time interval, with an option to run the first call immediately.
 *
 * @param ms - The throttle interval in milliseconds (default: 250).
 * @param runFirstImmediately - Whether to execute the first call immediately (default: true).
 * @returns An object containing:
 *   - `throttled`: The throttled function that accepts a callback to execute.
 *   - `runNow`: A method to execute the last queued callback immediately.
 *   - `clear`: A method to cancel any pending callback.
 * @example
 * const {throttled, runNow, clear} = getThrottle(300, true);
 *
 * // prints "0 20 40 60 80 99"
 * for (let i = 0; i < 100; i++) {
 *     throttled(() => {
 *         console.log(i);
 *     });
 *     await sleep(10);
 * }
 * runNow(); // run the last callback without delay
 */
export function getThrottle(ms = 250, runFirstImmediately = true) {
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
