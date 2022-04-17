const Koa = require('koa')
const router = require('koa-router')()
const { Worker } = require('worker_threads')
const app = new Koa()

router.get('/', async (ctx) => {
    const { text = "some text" } = ctx.query
    ctx.body = await asyncFunc(text, ctx.query)
})

const asyncFunc = (text, query) => {
    return new Promise((resolve, reject) => {
        const worker = new Worker('./worker.js', { workerData: { text, query } });
        worker.on('message', resolve)
        worker.on('error', reject)
        worker.on('exit', (code) => {
            if (code !== 0) reject(new Error(`Worker stopped with exit code ${code}`))
        })
    })
}

app.use(router.routes())
app.listen(9000, () => {
    console.log('Server is running on 9000')
})
