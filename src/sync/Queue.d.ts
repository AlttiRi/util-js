export type Node<T> = {
    value: T,
    next: Node<T> | null,
};

/** "LinkedList" with `Array` interface */
export class Queue<T> {
    public length = 0;
    private _last: Node<T> | null = null;
    private _first: Node<T> | null = null;
    push(value: T);
    shift(): T | undefined;
}
