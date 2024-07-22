const express = require('express')
const multer = require('multer')
const User = require('../models/user')
const auth = require('../middleware/auth')
const moment = require('moment')
const router = new express.Router()

router.get('/api/projects', auth, async (req,res) => {
    let match = {}
    let totalTasks = 0;
    let completedTask = 0;
    let overDueTask = 0;
    let toDo = 0;
    let today = new Date();
    const weeklyStats = []

    match.completed = 'true'

    try {
        /*
            Objective:  Populate all the tasks associated with the user
        */
        await req.user.populate({
            path: 'tasks',
        })
        totalTasks = req.user.tasks.length;

        /*
            Objective:  Populate all the completed tasks associated with the user
        */
        await req.user.populate({
            path: 'tasks',
            match
        })
        completedTask = req.user.tasks.length;

        /*
            Objective:  Populate all the incompleted tasks associated with the user
        */
        match.completed = false;
        await req.user.populate({
            path: 'tasks',
            match
        })
        toDo = req.user.tasks.length;
        
        /*
            Objective:  Populate all the incompleted tasks associated with the user
        */
        for(task in req.user.tasks) {
            const dueDate = req.user.tasks[task].dueDate
            if(dueDate !== null && dueDate < today) {
                overDueTask++;
            }
        }

        /*
            Objective:  Populate all the tasks associated with the user for the current week and return as a dataset of the amount of task completed/incompleted for the weekday
        */
        delete match.completed;
        match.createdAt = {
            $gte: moment().startOf('week').add(1, 'day').toDate(),
            $lt: moment().endOf('day').toDate()
            // $gte: moment().subtract(7, 'days').toDate(),
            // $lt: moment().toDate()
        }
        await req.user.populate({
            path: 'tasks',
            match
        })
        const weeklyTasks = {};
        req.user.tasks.forEach(task => {
            const weekday = moment(task.createdAt).format('dddd');
            const completed = task.completed? 'completed' : 'incomplete'

            if(!weeklyTasks[weekday]) {
                weeklyTasks[weekday] = {
                    label: weekday,
                    completed: 0,
                    incomplete: 0
                };
            }

            weeklyTasks[weekday][completed] += 1;
        })
        weeklyStats[0] = weeklyTasks['Monday']? weeklyTasks['Monday'] :  { label: 'Monday', completed: 0, incomplete: 0 }
        weeklyStats[1] = weeklyTasks['Tuesday']? weeklyTasks['Tuesday'] :  { label: 'Tuesday', completed: 0, incomplete: 0 }
        weeklyStats[2] = weeklyTasks['Wednesday']? weeklyTasks['Wednesday'] :  { label: 'Wednesday', completed: 0, incomplete: 0 }
        weeklyStats[3] = weeklyTasks['Thursday']? weeklyTasks['Thursday'] :  { label: 'Thursday', completed: 0, incomplete: 0 }
        weeklyStats[4] = weeklyTasks['Friday']? weeklyTasks['Friday'] :  { label: 'Friday', completed: 0, incomplete: 0 }
        weeklyStats[5] = weeklyTasks['Saturday']? weeklyTasks['Saturday'] :  { label: 'Saturday', completed: 0, incomplete: 0 }
        weeklyStats[6] = weeklyTasks['Sunday']? weeklyTasks['Sunday'] :  { label: 'Sunday', completed: 0, incomplete: 0 }

        res.send({"totalTasks": totalTasks, "completed": completedTask, "overDueTask": overDueTask ,"toDo": toDo, 'weeklyStats': weeklyStats})
    } catch (e) {
        res.status(500).send()
    }  
})

module.exports = router