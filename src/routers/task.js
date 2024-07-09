const express = require('express')
const Task = require('../models/task')
const auth = require('../middleware/auth')
const router = new express.Router()
const moment = require('moment')

router.post('/api/tasks', auth, async (req,res) => {
    const task = new Task({
        ...req.body,
        owner: req.user._id
    })

    try {
        await task.save()
        res.status(201).send(task)
    } catch (e) {
        res.status(400).send(e)
    }
})

router.get('/api/tasks', auth, async (req,res) => {
    const match = {}
    const sort = {}

    if (req.query.completed) {
        match.completed = req.query.completed === 'true'
    }
    
    if(req.query.weeklyTasks) {
        match.createdAt = {
            $gte: moment().subtract(7, 'days').toDate(),
            $lt: moment().toDate()
        }
        console.log(match)
    }

    if(req.query.sortBy) {
        const parts = req.query.sortBy.split(':')
        sort[parts[0]] = parts[1] === 'desc' ? -1 : 1
    }

    try {
        await req.user.populate({
            path: 'tasks',
            match,
            options: {
                limit: parseInt(req.query.limit) || null,
                skip: parseInt(req.query.skip) || null,
                sort
            }
        })
        res.send(req.user.tasks)
    } catch (e) {
        res.status(500).send()
    }  
})

router.get('/api/tasks/:id', auth, async (req,res) => {
    const _id = req.params.id

    try {
        const task = await Task.findOne({ _id, owner: req.user._id })

        if(!task) {
            return res.status(404).send()
        }

        res.send(task)
    } catch (e) {
        res.status(500).send(e)
    }
})

router.patch('/api/tasks/:id', auth, async (req, res) => {
    const updates = Object.keys(req.body)
    const allowedUpdates = ['description', 'completed']
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update))

    if(!isValidOperation) {
        return res.status(400).send({ error: 'Invalid updates!' })
    }

    try {
        const task = await Task.findOne({ _id: req.params.id, owner: req.user._id })

        if(!task) {
            return res.status(404).send()
        }

        updates.forEach((update) => task[update] = req.body[update])
        await task.save()

        res.send(task)
    } catch (e) {
        res.status(400).send(e)
    }
})

router.delete('/api/tasks/:id', auth, async (req, res) => {
    try {
        const task = await Task.findOneAndDelete({ _id: req.params.id, owner: req.user._id })

        if(!task) {
            return res.status(404).send()
        }

        res.send(task)
    } catch (e) {
        res.status(500).send(e)
    }
})

module.exports = router