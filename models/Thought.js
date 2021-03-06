const { Schema, model } = require('mongoose')
const { reactionSchema } = require('./Reaction')
const moment = require('moment')

const thoughtSchema = new Schema({
    thoughtText: {
        type: String,
        maxLength: 280,
        required: true,
        minlength: 1
    },
    createdAt: {
        type: Date,
        default: Date.now(),
        get: (time) => moment(time).format('MMM DD, YYYY [at] hh:mm a')
    },
    username: {
        type: String,
        ref: 'User',
        required: true
    },

    reactions: [reactionSchema]
}, {
    toJSON: {
        getters: true,
        virtuals: true,
    },
    id: false,
})
thoughtSchema.virtual('reactionCount').get(function () {
    return this.reactions.length;
})

const Thought = model('Thought', thoughtSchema, 'thoughts')

module.exports = Thought;