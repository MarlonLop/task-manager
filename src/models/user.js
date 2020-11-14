const mongoose = require('mongoose');
const validator = require('validator');

const User = mongoose.model('User', {
    name: {
        type: String,
        required: true,
        trim: true
    },
    age: {
        type: Number,
        default: 0,
        validate(value) {
            if(value < 0) {
                throw new Error('Age cannot be  negative number');
            }
        }
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
        validate(value) {
            if(!validator.isEmail(value)){
                throw new Error('email is  invalid');
            }
        }
    },
    password: {
        type: String,
        require: true,
        minlength: 7,
        trim: true,
        validate(value) {
            if(value.toLowerCase().includes('password')){
                throw new Error('password cannot containd the word "paswword"')
            }
        }
    }
});

module.exports = User;
// const me = new User({
//     name: '  user1   ',
//     email: 'MaIL@AOl.coM',
//     password: '      word'
// });

// me.save().then(() => {
//     console.log(me)
// }).catch((error) => {
//     console.log('Error, ', error)
// });

