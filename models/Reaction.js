const { Schema, model } = require('mongoose')

const reactionSchema = new Schema({
    reactionId: {
        type: Schema.type.ObjectId,
        default: () => new Types.ObjectId(),
    },
    reactionBody: {
        type: { String, min: 1, max: 280 },
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