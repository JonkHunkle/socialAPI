// ~~~/api/users~~~
const router = require('express').Router();
const {
        createNewUser,
        getAllUsers,
        findUserId,
        deleteUser,
        updateUser
} = require('../../controllers/userController');


router.route('/').get(getAllUsers).post(createNewUser)


router.route('/:id').get(findUserId).delete(deleteUser).patch(updateUser)


//add friend to users friend list
//delete friend from friend list

//router.route('/:userId/friends/:friendId').post().delete()

module.exports = router