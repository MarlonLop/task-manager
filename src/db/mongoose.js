const mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.01:27017/task-manager-api', {
    useNewUrlParser: true, 
    useUnifiedTopology: true,
    useCreateIndex: true
});

const User = mongoose.model('User', {
    name: {
        type: String
    },
    age: {
        type: Number
    }
})