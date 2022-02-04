const { User, Thought } = require('../models');

module.exports = {
    async getAllUsers(req, res) {
        await User.find().then((dbUserData) => res.json(dbUserData))
            .catch(err => res.status(500).json(err));
    },
    async createNewUser(req, res) {
        await User.create(req.body).then((dbUserData) => res.json(dbUserData))
            .catch(err => res.status(500).json(err));
    },
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
        try {
            const findUser = await User.findOne({ _id: req.params.id })
            const deleteUser = await User.findOneAndRemove({ _id: req.params.id })
            const deleteThoughts = await Thought.deleteMany({ username: findUser.username })
            if (!deleteUser && !deleteThoughts) {
                res.status(404).json({ message: 'No such user exists' })
            } else {
                res.json("User and Thoughts Removed")
            }
        }
        catch (err) {
            console.log(err);
            res.status(500).json(err);
        };
    },
    async updateUser(req, res) {
        try {
            const update = await User.findOneAndUpdate(
                { _id: req.params.userId },
                { $set: req.body },
                { runValidators: true, new: true }
            );
            if (!update) {
                res.status(404).json({ message: 'No such user exists' })
            } else { res.json("Updated User") }
        } catch (err) {
            res.status(500).json({ message: err });
        }
    },
    async addFriend(req, res) {

        try {
            const newFriend = await User.findOneAndUpdate({ _id: req.params.userId }, { $addToSet: { friends: req.params.friendId } })
            res.json(newFriend)
        } catch (err) {
            console.log(err)
            res.status(500).json(err)
        }

    },
    async deleteFriend(req, res) {
        try {
            const deleteFriend = await User.findOneAndUpdate(
                { _id: req.params.userId },
                { $pull: { friends: req.params.friendId } },
            )
            if (!deleteFriend) {
                res.status(404).json({ message: 'No such user exists' })
            } else {
                res.json("Friend Deleted")
            }
        } catch (error) {
            console.log(error);
            res.status(500).json(error);
        }
    }
}