export type Node<T> = {
    value: T,
    next: Node<T> | null,
};

/** "LinkedList" with `Array` interface */
export class Queue<T> {
    public length: number = 0;
    private _last:  Node<T> | null = null;
    private _first: Node<T> | null = null;
    constructor() {
        this.length = 0;
        this._last  = null;
        this._first = null;
    }
    push(value: T) {
        const newLast = {
            value,
            next: null
        };
        if (!this._last) {
            if (!this._first) {
                this._first = newLast;
            }
            else {
                this._first.next = newLast;
                this._last = newLast;
            }
        }
        else {
            this._last.next = newLast;
            this._last = newLast;
        }
        this.length++;
    }
    shift(): T | undefined {
        const firstValue = this._first?.value;
        this._first = this._first?.next || null;
        this.length--;
        return firstValue;
    }
}
