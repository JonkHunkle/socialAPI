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

    },
}