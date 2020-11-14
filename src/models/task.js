const mongoose = require('mongoose');

const Task = mongoose.model('Task', {
    description: {
        type: String,
        required: true,
        trim: true
    },
    completed: {
        type: Boolean,
        default: false
    }
});

module.exports = Task;

// const chore = new Task({
//     description: '     pick up leaves',
// });

// chore.save().then(() => {
//     console.log(chore)
// }).catch((error) => {
//     console.log('error, ', error)
// });