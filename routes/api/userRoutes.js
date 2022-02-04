// ~~~/api/users~~~
const router = require('express').Router();
const {
        createNewUser,
        getAllUsers,
        findUserId,
        deleteUser
} = require('../../controllers/userController');


router.route('/').get(getAllUsers).post(createNewUser)

//get one by _id      
//delete and update
//include cascade to delete associated thoughts
router.route('/:id').get(findUserId)
// .delete(deleteUser)


//add friend to users friend list
//delete friend from friend list

//router.route('/:userId/friends/:friendId').post().delete()

module.exports = router