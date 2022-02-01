const mongoose = require('mongoose')


const userSchema = new mongoose.Schema({
    username: {
        type: String,
        unique: true,
        required: true,
        trim: true,
    },
    email: {
        type: String,
        trim: true,
        lowercase: true,
        unique: true,
        required: 'Email address is required',
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
    },
    thoughts: [{
        type: Schema.types.Objectid,
        ref: 'Thought'
    }],
    friends: [{
        type: Schema.types.Objectid,
        ref: 'User'
    }]
},
    {
        toJSON: {
            virtuals: true,
            getters: true,
        },
        id: false,
    });

userSchema.virtual('friendCount').get(function () {
    return this.friends.length;
})

const User = model('User', userSchema)

module.exports = User;