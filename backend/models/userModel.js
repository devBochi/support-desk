const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please add a name']
    },
    email: {
        type: String,
        required: [true, 'Please add a name'],
        unique: true
    },
    password: {
        type: String,
        required: [true, 'Please add a name']
    },
    isAdmin: {
        type: Boolean,
        required: true,
        default: false
    }
},
{
    timestamp: true
})

module.exports = mongoose.model('User', userSchema)