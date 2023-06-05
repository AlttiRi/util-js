type VoidFunc = (value: void) => void;

export declare class Semaphore {
    private readonly max: number;
    private        count: number;
    private readonly resolveQueue: VoidFunc[];

    constructor(max: number);
    acquire(): Promise<void>;
    release(): void;
}
