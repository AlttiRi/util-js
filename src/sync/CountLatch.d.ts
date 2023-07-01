import {VoidFunc} from "./VoidFunc";

export class CountLatch {
    private count: number;
    private promise: Promise<void>;
    private resolve: VoidFunc;

    constructor(count?);
    countDown(): void;
    countUp(): void;
    then(resolve: VoidFunc, reject: VoidFunc): Promise<void>
}
