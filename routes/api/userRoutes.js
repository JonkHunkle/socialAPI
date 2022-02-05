// ~~~/api/users~~~
const router = require('express').Router();
const {
        createNewUser,
        getAllUsers,
        findUserId,
        deleteUser,
        updateUser,
        addFriend,
        deleteFriend
} = require('../../controllers/userController');


router.route('/').get(getAllUsers).post(createNewUser)


router.route('/:id').get(findUserId).delete(deleteUser).patch(updateUser)



router.route('/:userId/friend/:friendId').patch(addFriend).delete(deleteFriend)

module.exports = router