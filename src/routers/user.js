const express = require('express');
const User = require('../models/user');
const router = new express.Router();

router.post('/users', async (req, res) => {
    const user = new User(req.body);

    try{
        await user.save();
        const token = await user.generateAuthToken();
        res.status(201).send({user, token});
    } catch(e) {
        res.status(400).send(e);
    }
       
    // normal promise without async and await
    // user.save().then(() => {
    //     res.status(201).send(user);
    // }).catch((e) => {
    //     res.status(400).send(e);
    // });
});

router.post('/users/login', async (req, res) => {
    try {
        const user = await User.findByCredentials(req.body.email, req.body.password);
        const token = await user.generateAuthToken();
        res.send({ user , token });
    } catch(e) {
        res.status(400).send();
    }
});

router.get('/users', async (req, res) => {
    try {
        const users = await User.find();
        res.send(users);
    } catch(e) {
        res.status(500).send(e)
    }

    // normal promise without async and await
    // User.find().then((users) => {
    //     res.send(users);
    // }).catch((e) => {
    //     res.status(500).send(e);
    // });
});

router.get('/users/:id', async (req, res) => {
    try {
        const user = await User.findById(req.params.id);

        if(!user) return res.status(404).send();

        res.send(user);
    } catch(e) {
        res.status(500).send(e);
    }
});

router.patch('/users/:id', async (req, res) => {
    const fields = Object.keys(req.body);
    const allowedFieldUpdates = [ 'name', 'email', 'age', 'password'];
    const isValidOperation = fields.every((field) => allowedFieldUpdates.includes(field));

    if(!isValidOperation) return res.status(400).send({ erro: 'invalid updates'});

    try {
        // modifying to code right below so bcrypt middleware works for patch
        // const user = await User.findByIdAndUpdate(req.params.id, req.body, 
        //                                     { new: true, runValidators: true });
        const user = await User.findById(req.params.id);
        fields.forEach((field) => user[field] = req.body[field]);
        await user.save();

        if(!user) return res.status(404).send();

        res.send(user);
    } catch(e) {
        res.status(400).send(e);
    }   
});

router.delete('/users/:id', async (req, res) => {
    try{
        const user = await User.findByIdAndDelete(req.params.id);

        if(!user) return res.status(404).send();

        res.send(user);
    } catch(e) {
        res.status(500).send(e);
    }
})

module.exports = router;