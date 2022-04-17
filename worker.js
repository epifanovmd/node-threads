const { workerData, parentPort } = require('worker_threads')
const { text } = workerData

const start = Date.now()
const startDate = new Date()

setTimeout(() => {
  parentPort.postMessage({
    pid: process.pid,
    start: startDate.toLocaleString(),
    end: (new Date()).toLocaleString(),
    duration: Date.now() - start,
    text
  })
}, 5000);

