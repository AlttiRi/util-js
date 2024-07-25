import {Semaphore, CountLatch, sleep}  from "@/index.ts";


const mutex     = new Semaphore();
const semaphore = new Semaphore(4);

let currentNum = 1;
async function getDataAsync(): Promise<number> {
    const num = currentNum++;
    await sleep(Math.random() * 1000);
    return num;
}
function handleData(data: number) {
    console.log(data);
}


await demoSync("Do async tasks one by one", handleDataSequentially);            // [sync][ordered]
await demoAsync("Run all async tasks in parallel",   handleDataSequentially);   // [async][unordered][unlimited]
await demoAsync("Do up to 4 async tasks concurrently", handleDataConcurrently); // [async][unordered]
await demoAsync("Do up to 4 async tasks concurrently ordered", handleDataConcurrentlyOrdered); // [async][ordered]
await demoSemaphoreAndCountLatch("Semaphore and CountLatch example");           // [async][ordered][optimal]


async function handleDataSequentially() {
    const data = await getDataAsync();
    handleData(data);
}

async function handleDataConcurrently() {
    await semaphore.acquire();
    const data = await getDataAsync();
    semaphore.release();
    handleData(data);
}

async function handleDataConcurrentlyOrdered() {
    const takeMutex = mutex.acquire();
    await semaphore.acquire();
    const data = await getDataAsync();
    semaphore.release();
    await takeMutex;
    handleData(data);
    mutex.release();
}


// ---

async function demoSync(name: string, func: Function) {
    console.log("\n---");
    currentNum = 1;

    console.time(name);
    for (let j = 0; j < 10; j++) {
        await func();
        console.log(".");
    }
    console.timeEnd(name);
}

// ---
// If you need to wait all tasks done.
async function demoAsync(name: string, func: Function) {
    console.log("\n---");
    currentNum = 1;

    console.time(name);
    const allJobs = [];
    for (let j = 0; j < 10; j++) {
        allJobs.push(func());
        console.log(".");
    }
    await Promise.all(allJobs);
    console.timeEnd(name);
}
// If you do not need to wait all tasks done.
function demoAsyncAlternativeExample(name: string, func: Function) {
    console.log("\n---");
    currentNum = 1;

    for (let j = 0; j < 10; j++) {
        void func();
    }
}
// ---


// ---

// The best — the optimal and safe approach //
async function demoSemaphoreAndCountLatch(name: string) {
    console.log("\n---");
    currentNum = 1;

    console.time(name);
    const countLatch = new CountLatch();
    for (let j = 0; j < 10; j++) {
        await taskStarted(countLatch);
        console.log(".");
    }
    await countLatch; // All tasks are done
    console.timeEnd(name);
}

// The better approach, do not run all data handlers at one moment.
async function taskStarted(countLatch: CountLatch) {
    countLatch.countUp();
    await semaphore.acquire();
    void startAsyncTask(semaphore, countLatch);
}
async function startAsyncTask(semaphore: Semaphore, countLatch: CountLatch) {
    const takeMutex = mutex.acquire();
    let data;
    try {
        data = await getDataAsync();
    } finally {
        semaphore.release();
    }
    await takeMutex;
    try {
        handleData(data);
    } finally {
        mutex.release();
        countLatch.countDown();
    }
}
