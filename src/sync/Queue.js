export class Queue {
    constructor() {
        this.length = 0;
        this._last = null;
        this._first = null;
    }
    push(value) {
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
    shift() {
        const firstValue = this._first?.value;
        this._first = this._first?.next || null;
        this.length--;
        return firstValue;
    }
}
