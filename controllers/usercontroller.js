const { reactionSchema } = require('../models/Reaction');
const User = require('../models/User');

module.exports = {
    async getAllUsers(req, res) {
        await User.find().then((dbUserData) => res.json(dbUserData))
            .catch(err => res.status(500).json(err));
    },
    async createNewUser(req, res) {
        await User.create(req.body).then((dbUserData) => res.json(dbUserData))
            .catch(err => res.status(500).json(err));
    },
    // finish find by id
    async findUserId(req, res) {
        try {
            const singleUser = await User.findOne({ _id: req.params.id }).populate('thoughts').populate('friends')

            if (!singleUser) {
                res.status(404).json({ message: 'try another user id!' })
            } else { res.json(singleUser) }

        } catch (err) {
            console.log(err)
            return res.status(500).json(err)
        }
    },
    async deleteUser(req, res) {
        await User.findOneAndDelete({ _id: req.params.id },
            (err, user) => {
                console.log('user?', user)
                if (err) { console.log(err) } else {
                    res.json(user, ' deleted');
                }
            }
        )
    },
    async updateUser(req, res) {
        const updateUser = await User.findByIdAndUpdate({ _id: req.params.id }, { $set: req.body }, { runValidators: true, })
        console.log('the user', updateUser)
        if (!updateUser) {
            res.status(404).json({ message: 'try another user id!' })
        } else {
            res.json('you updated it!')
        }
    }
}