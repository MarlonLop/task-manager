const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const userSchema = new mongoose.Schema({
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
    },
    tokens: [{
        token: {
            type: String,
            required: true
        }
    }]
});

userSchema.methods.generateAuthToken = async function () {
    const token = jwt.sign( {_id: this._id.toString() }, 'secret');

    this.tokens = this.tokens.concat({ token });
    await this.save();

    return token;
} 

// login helper function
userSchema.statics.findByCredentials = async (email, password) => {
    const user = await User.findOne({ email }) //  using shorthand notation, this equals User.findOne({ email }) 

    if(!user) { throw new Error('Unable to login'); }

    const isMatch = await bcrypt.compare(password, user.password);

    if(!isMatch) { throw new Error('Unable to login'); }

    return user;
}

// hashing password before saving
userSchema.pre('save', async function (next) {

    // this refers to the user being save or patch
    if (this.isModified('password')) {
        this.password = await bcrypt.hash(this.password, 8);
    }
    next();
});

const User = mongoose.model('User', userSchema);

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

