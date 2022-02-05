const { Thought, User } = require('../models');

module.exports = {
    async getAllThoughts(req, res) {
        await Thought.find().then((ThoughtDb) => res.json(ThoughtDb))
            .catch(err => res.status(500).json(err));
    },
    async createNewThought(req, res) {
        try {
            const user = await User.findById({ _id: req.params.userId })
            console.log(user)
            const newThought = await Thought.create({
                thoughtText: req.body.thoughtText,
                username: user.username
            })
            const resetUser = await User.findOneAndUpdate({ _id: req.params.userId }, { $push: { thoughts: newThought._id } }
            )
            if (!resetUser) {
                res.status(404).json({ message: 'nice try!' })
            } else {
                res.json('added a new thought')
            }
        } catch (err) {
            console.log(err)
            res.status(500).json(err)
        }
    },
    async singleThought(req, res) {
        try {
            const singleThought = await Thought.findOne({ _id: req.params.id }).populate('reactions')

            if (!singleThought) {
                res.status(404).json({ message: 'try another thought id!' })
            } else { res.json(singleThought) }

        } catch (err) {
            console.log(err)
            return res.status(500).json(err)
        }
    },
    async updateThought(req, res) {
        try {
            const singleThought = await Thought.findOneAndUpdate({ _id: req.params.id }, req.body)
            if (!singleThought) {
                res.status(404).json({ message: 'try another thought id!' })
            } else {
                res.json('updated thought!')
            }

        } catch (err) {
            console.log(err)
            return res.status(500).json(err)
        }
    },
    async deleteThought(req, res) {
        try {
            const singleThought = await Thought.findOneAndRemove({ _id: req.params.id })
            if (!singleThought) {
                res.status(404).json({ message: 'try another thought id!' })
            } else {
                res.json('thought deleted!')
            }

        } catch (err) {
            console.log(err)
            return res.status(500).json(err)
        }
    },
    async addReaction(req, res) {
        try {
            const singleThought = await Thought.findOneAndUpdate({ _id: req.params.id }, { $addToSet: { reactionBody: req.body } })

            if (!singleThought) {
                res.status(404).json({ message: 'try another thought id!' })
            } else { res.json(singleThought) }

        } catch (err) {
            console.log(err)
            return res.status(500).json(err)
        }
    },
    async deleteReaction(req, res) {
        try {
            const deleteReaction = await Thought.findOneAndUpdate(
                { _id: req.params.thoughtId },
                { $pull: { reactions: { reactionId: req.params.reactionId } } },
            )
            if (!deleteReaction) {
                res.status(404).json({ message: 'No such reaction exists' })
            } else { res.json("Reaction Deleted") }
        } catch (error) {
            console.log(error);
            res.status(500).json(error);
        }
    }
}