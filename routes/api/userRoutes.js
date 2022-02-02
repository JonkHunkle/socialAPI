// ~~~/api/users~~~
const router = require('express').Router();
const {
        createNewUser,
        getAllUsers
} = require('../../controllers/userController');


router.route('/').get(getAllUsers).post(createNewUser)
//get one by _id
//include thoughts and friends



// update user by _id

//delete user by _id
//include cascade to delete associated thoughts


// ~~~/api/users/:userId/friends/:friendId~~~

//add friend to users friend list
//req userID and friendID

//delete friend from friend list

module.exports = router