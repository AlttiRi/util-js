import {sleep} from "@/index.ts";


sleep(0).then(() => console.log(4));
sleep(0).then(() => console.log(5));

// with using setImmediate
sleep().then(() => console.log(1));
sleep().then(() => console.log(2));
sleep().then(() => console.log(3));

console.log(0);
