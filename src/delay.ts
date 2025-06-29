/**
 * A classic `debounce` wrap function.
 *
 * `ms` param is `250` ms by default.
 *
 * @example
 * const logAny = (i: any) => console.log(i);
 * const logAnyDebounced = debounce(logAny, 50);
 *
 * // prints `99`, after ~ 1+ second
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
 * Executes the wrapped function no more than once per `ms`.
 * The first and last calls will always be performed.
 *
 * `ms` param is `250` ms by default.
 *
 * @example
 * const logAny = (i: any) => console.log(i);
 * const logAnyThrottled = throttle(logAny, 500);
 *
 * // prints "0 31 63 96 99" // "31 63 96" may differ
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
 * Allows to run a function as a `throttled` one, run it without a delay (`runNow`), or `clear` the deferred callback.
 *
 * `ms` param is `250` ms by default.
 *
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

// todo: in `getThrottle`
// function throttledCall(this: any, callback: Function, ...params: any[]) {
//     cb = callback.bind(this, ...params);
//     ...
// }
