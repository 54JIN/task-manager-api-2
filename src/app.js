const express = require('express')
const path = require('path')
// const cors = require('cors')
require('./db/mongoose')
const userRouter = require('./routers/user')
const taskRouter = require('./routers/task')

// const ORIGIN = process.env.ORIGIN

const app = express()

const reactBuild = path.join(__dirname, '..', 'task-manager-front', 'build')

app.use(express.static(reactBuild))
app.use(express.json())
app.use(userRouter)
app.use(taskRouter)

app.get('/api', async(req,res) => {
    res.send({message: "Hello"})
})
app.get('*', async(req,res) => {
    res.sendFile(path.join(reactBuild, 'index.html'))
})

module.exports = app