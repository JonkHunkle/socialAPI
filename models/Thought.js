const { Schema, model } = require('mongoose')
const { reactionSchema } = require('./Reaction')

const thoughtSchema = new Schema({
    thoughtText: {
        type: String,
        maxLength: 280,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now()
    },
    username: {
        type: String,
        required: true
    },
    reactions: [reactionSchema]
})
thoughtSchema.virtual('reactionCount').get(function () {
    return this.reactions.length;
})

const Thought = model('Thought', thoughtSchema)

module.exports = Thought;