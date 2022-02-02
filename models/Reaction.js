const { Schema, model } = require('mongoose')

const reactionSchema = new Schema({
    reactionId: {
        type: Schema.Types.ObjectId,
        default: () => new Types.ObjectId(),
    },
    reactionBody: {
        type: String,
        maxLength: 280,
        required: true

    },
    createdAt: {
        type: Date,
        default: Date.now()
    },
    username: {
        type: String,
        required: true
    }
},
    {
        toJSON: {
            getters: true,
        },
        id: false,
    }
);

module.exports = {
    reactionSchema: reactionSchema,
}