const express = require('express')
const cors = require('cors')
require('./db/mongoose')
const userRouter = require('./routers/user')
const taskRouter = require('./routers/task')

const ORIGIN = process.env.ORIGIN

const app = express()

app.use(cors({
    origin: `${ORIGIN}`
}))
app.use(express.json())
app.use(userRouter)
app.use(taskRouter)

module.exports = app