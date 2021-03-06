const express = require('express');
const Task = require('../models/task');
const router = new express.Router();

router.post('/tasks', async (req, res) => {
    const task = new Task(req.body);

    try {
        await task.save();
        res.status(201).send(task);
    } catch(e) {
        res.status(400).send(e);
    }
});

router.get('/tasks', async (req, res) => {
    try{
        const tasks = await Task.find();
        res.send(tasks);
    } catch(e) {
        res.status(500).send(e);
    }
});

router.get('/tasks/:id', async (req, res) => {
    try {
        const task = await Task.findById(req.params.id);

        if(!task) return res.status(404).send();

        res.send(task);
    } catch(e) {
        res.status(500).send(e);
    }
});

router.patch('/tasks/:id', async (req, res) => {
    const fields = Object.keys(req.body);
    const allowedFieldUpdates = ['description', 'completed'];
    const isValidOperation = fields.every((field) => allowedFieldUpdates.includes(field));

    if(!isValidOperation) return res.status(400).send({error: 'invalid updates'});
    
    try {
        // modifying to code right below so bcrypt middleware works for patch
        // const task = await Task.findByIdAndUpdate(req.params.id, req.body, 
        //                                          { new: true, runValidators: true});
        const task = await Task.findById(req.params.id);
        fields.forEach((field) => task[field] = req.body[field]);
        await task.save();
        
        if(!task) return res.status(404).send();

        res.send(task);
    } catch(e) {
        res.status(400).send(e);
    }
});

router.delete('/tasks/:id', async (req, res) => {
    try{
        const task = await Task.findByIdAndDelete(req.params.id);
        
        if(!task) return res.status(404).send();

        res.send(task);
    } catch(e) {
        res.status(500).send(e);
    }
});

module.exports = router;