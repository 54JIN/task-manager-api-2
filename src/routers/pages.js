const express = require('express')
const multer = require('multer')
const User = require('../models/user')
const auth = require('../middleware/auth')
const router = new express.Router()

router.get('/api/projects', auth, async (req,res) => {
    const match = {}
    let totalTasks = 0;
    let completedTask = 0;
    let toDo = 0;

    match.completed = 'true'

    try {
        await req.user.populate({
            path: 'tasks',
        })
        totalTasks = req.user.tasks.length;
        await req.user.populate({
            path: 'tasks',
            match
        })
        completedTask = req.user.tasks.length;
        match.completed = false;
        await req.user.populate({
            path: 'tasks',
            match
        })
        toDo = req.user.tasks.length;
        res.send({"totalTasks": totalTasks, "completed": completedTask, "toDo": toDo})
    } catch (e) {
        res.status(500).send()
    }  
})

module.exports = router