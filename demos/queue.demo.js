import {Queue} from "../src/sync/Queue.js";


console.time("Queue");
console.log(pushThenShift(new Queue()));
console.timeEnd("Queue");
// 4999950000
// Queue: 22.272ms

console.time("Array");
console.log(pushThenShift([]));
console.timeEnd("Array");
// 4999950000
// Array: 875.014ms


function pushThenShift(collection, times = 100_000) {
    for (let i = 0; i < times; i++) {
        collection.push(i);
    }
    let total = 0;
    for (let i = 0; i < times; i++) {
        total += collection.shift();
    }
    return total;
}
