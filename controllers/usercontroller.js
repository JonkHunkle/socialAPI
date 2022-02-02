const User = require('../models/User');

module.exports = {
    async getAllUsers(req, res) {
        await User.find().then(res.send('dbUserData'))
            .catch(err => res.status(500).json(err));
    },
    async createNewUser(req, res) {
        await User.create(req.body).then((dbUserData) => res.json(dbUserData))
            .catch(err => res.status(500).json(err));
    },
    // finish find by id
    async findUserId(req, res)=>{
    await User.findOne
}
}
