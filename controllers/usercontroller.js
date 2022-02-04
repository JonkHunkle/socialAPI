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
                res.status(404).json({ message: 'try another userid!' })
            } else { res.json(singleUser) }

        } catch (err) {
            console.log(err)
            return res.status(500).json(err)
        }
    },
    // await deleteUser(req, res) {
    //     try {
    //         await User.findOne()

    //     } catch (err) {
    //         res.status(500).json(err)
    //     }
    // },
}