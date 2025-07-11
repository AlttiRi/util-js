# [util-js](https://github.com/AlttiRi/util-js)

Some JavaScript util functions.

Mostly it's a draft version for personal use.

## *.d.ts

```ts
/**
 * Formats bytes EXACTLY like Windows File Explorer does.
 * Check the file with tests.
 * @see bsc--format-size-win-like.t.ts
 * @alias bytesToSizeWinLike
 * @alias formatSizeWinLike
 * @param {number} bytes
 * @return {string}
 */
export declare function formatFileSizeWinLike(bytes: number): string;
/**
 * Formats bytes mostly like Windows File Explorer does,
 * but in some rare cases the result is different.
 * The old implementation of `formatFileSizeWinLike`.
 * It produces the more accurate result, but not like Windows does.
 * See "inaccurate" tests.
 * @see bsc--format-size-win-like.t.ts
 * @param {number} bytes
 * @return {string}
 */
export declare function formatFileSize(bytes: number): string;
/**
 * @example
 * 10.1005859375 -> "10.1"
 * 9.99902343750 -> "9.99"
 * 836.966796875 -> "836"
 * 0.08   -> "0.08"
 * 0.099  -> "0.09"
 * 0.0099 -> "0"
 * @param {number} number
 * @return {string}
 */
export declare function toTruncPrecision3(number: number): string;
/**
 * Useful for file byte size formatting:
 * 34456909 -> 34 456 909
 * @alias tripleSizeGroups
 * @param {number} num
 * @return {string}
 * */
export declare function formatNumber(num: number): string;
/** @deprecated Use `formatFileSizeWinLike` */
export declare const bytesToSizeWinLike: typeof formatFileSizeWinLike;
/** @deprecated Use `formatFileSizeWinLike` */
export declare const formatSizeWinLike: typeof formatFileSizeWinLike;
/** @deprecated Use `formatNumber` */
export declare const tripleSizeGroups: typeof formatNumber;
/**
 * "Sun, 10 Jan 2021 22:22:22 GMT" -> "2021.01.10"
 * @param {Date | string | number?} [dateValue]
 * @param {boolean} [utc = true]
 * @return {string}
 */
export declare function dateToDayDateString(dateValue?: Date | string | number, utc?: boolean): string;
/**
 * "Sun, 10 Jan 2021 22:22:22 GMT" -> "2021.01.10 22:22:22Z"
 * @param {Date | string | number} [dateValue]
 * @param {boolean?} [utc = true]
 * @return {string}
 */
export declare function dateToDayDateTimeString(dateValue?: Date | string | number, utc?: boolean): string;
/**
 * "Sun, 10 Jan 2021 22:22:22 GMT" -> "2021.01.10"
 * @param {Date | string | number} [dateValue]
 * @return {string}
 */
export declare function localDate(dateValue?: number | string | Date): string;
/**
 * "Sun, 10 Jan 2021 22:22:22 GMT" -> "2021.01.10 22:22:22"
 * @param {Date | string | number} [dateValue]
 * @return {string}
 */
export declare function localDateTime(dateValue?: number | string | Date): string;
/**
 * Formats date. Supports: YY.YYYY.MM.DD HH:mm:SS.
 * Default format: "YYYY.MM.DD".
 * formatDate() -> "2022.01.07"
 * @param {Date | string | number} [dateValue]
 * @param {string}  [pattern = "YYYY.MM.DD"]
 * @param {boolean} [utc = true]
 * @return {string}
 */
export declare function formatDate(dateValue?: Date | string | number, pattern?: string, utc?: boolean): string;
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
export declare function debounce<A extends any[]>(runnable: (...args: A) => unknown, ms?: number, scope?: any): (...args: A) => void;
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
export declare function getSelfDebounced(ms?: number): () => Promise<boolean>;
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
export declare function getSelfDebouncedReject(ms?: number): () => Promise<void>;
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
export declare function throttle<A extends any[]>(runnable: (...args: A) => any, ms?: number, scope?: any): (...args: A) => void;
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
export declare function getThrottle(ms?: number, runFirstImmediately?: boolean): {
  throttled: (callback: Function, runNow?: boolean) => void;
  runNow: (clearDelayed?: boolean) => any;
  clear: () => void;
};
/**
 * Sleeps `ms` milliseconds.
 * If param is `undefined` it sleeps until the next macro-task.
 * Note: With `0` real ms will be `4`+ ms.
 * @param {number?} ms
 * */
export declare function sleep(ms?: number): Promise<void>;
/**
 * Interruptible `sleep`.
 * If was interrupted resolves with the interrupt reason (`signal.reason`).
 * @param {number} ms
 * @param {AbortSignal} signal
 */
export declare function sleepEx(ms: number, signal: AbortSignal): Promise<void | any>;
export declare function isString(value: unknown): value is string;
export declare function isAnyString(value: unknown): value is (string | String);
/**
 * Java's `hashCode` like. 32-bits hash.
 * Note: `Math.imul(..., 1)` does the same as  `| 0`, with the same speed.
 * @example
 * hashString("Lorem Ipsum") === -488052133
 * hashString("Qwerty") === -1862984904
 * hashString("A") === 65
 * hashString("👾👽💀") === -2019372252
 * @param {string} str
 * @return {number}
 */
export declare function hashString(str: string): number;
/**
 * Similar to `hashString`, but it always returns a positive number. 31-bits hash.
 * @param {string} str
 */
export declare function hashStringPos(str: string): number;
export type DownloadBlobOpt = {
  /** The URL to be added as a hash in the downloaded blob URL. Useful to keep the original file URL. */
  url?: string;
  /** The delay before `revokeObjectURL`. 5000 by default. */
  timeout?: number;
};
export declare function downloadBlob(blob: Blob, name: string, url?: string): void;
export declare function downloadBlob(blob: Blob, name: string, opt: DownloadBlobOpt): void;
```

## *.d.ts (sync)

```ts
/**
 * Use it when in one place you need to `enqueue()` some `value`, until `close()`.
 * In other place you can iterate over this queue in for-await loop.
 *
 * `enqueue` does not add a value until there is a free space in the queue, you should `await` it.
 * (`size` parameter of `constructor`).
 *
 * Use `close()` after you finished to `enqueue()` data.
 */
export declare class AsyncBufferQueue<T> {
    private values;
    private done;
    private promise;
    private resolve;
    private semaphore;
    constructor(size?: number);
    close(): void;
    enqueue(value: T): Promise<void>;
    [Symbol.asyncIterator](): AsyncGenerator<T>;
}
export declare class CountLatch {
    private count;
    private promise;
    private resolve;
    /** @param {number} count = 0 */
    constructor(count?: number);
    countDown(): void;
    countUp(): void;
    /** Makes this object "Thenable" */
    then(resolve: VoidFunc, reject: VoidFunc): Promise<void>;
}
export type Node<T> = {
    value: T;
    next: Node<T> | null;
};
/** "LinkedList" with `Array` interface */
export declare class Queue<T> {
    length: number;
    private _last;
    private _first;
    constructor();
    push(value: T): void;
    shift(): T | undefined;
}
/** The most simple semaphore implementation. */
export declare class Semaphore {
    private readonly max;
    private count;
    private readonly resolveQueue;
    /** @param {number} [max = 1] - by default, it works as a mutex. */
    constructor(max?: number);
    /** @return {Promise<unknown>} */
    acquire(): Promise<unknown>;
    /** @return {void} */
    release(): void;
}
/** `resolve`/`reject` of `Promise` with no result. */
export type VoidFunc = (value: void) => void;
```

## Installation

### From NPM

```bash
npm install @alttiri/util-js
```

### From GitHub repository

```bash
npm install git+https://github.com/alttiri/util-js.git
```

<details>

<summary>More ways</summary>

### From GitHub repository (a specific version):

- **Based on SemVer:**
    ```bash
    npm install git+https://github.com/alttiri/util-js.git#semver:1.3.0
    ```
  Or add
    ```
    "@alttiri/util-js": "github:alttiri/util-js#semver:1.3.0"
    ```
  as `dependencies` in `package.json` file.

  See available [tags](https://github.com/AlttiRi/util-js/tags).

- **Based on a commit hash:**
    ```bash
    npm install git+https://github.com/alttiri/util-js.git#eea3068f8c70c6a500a44b69aeb0cb65ac8b80a6
    ```
  Or add
    ```
    "@alttiri/util-js": "github:alttiri/util-js#eea3068f8c70c6a500a44b69aeb0cb65ac8b80a6"
    ```
  as `dependencies` in `package.json` file.

  See available [commits hashes](https://github.com/AlttiRi/util-js/commits/master).


### From GitHub Packages:
To install you need first to create `.npmrc` file with `@alttiri:registry=https://npm.pkg.github.com` content:
```bash
echo @alttiri:registry=https://npm.pkg.github.com >> .npmrc
```

only then run

```bash
npm install @alttiri/util-node-js
```
Note, that GitHub Packages requires to have also `~/.npmrc` file (`.npmrc` in your home dir) with `//npm.pkg.github.com/:_authToken=TOKEN` content, where `TOKEN` is a token with the `read:packages` permission, take it here https://github.com/settings/tokens/new.


</details>
