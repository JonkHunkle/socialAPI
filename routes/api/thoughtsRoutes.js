const router = require('express').Router();

const {
        createNewThought,
        getAllThoughts,
        singleThought,
        updateThought,
        deleteThought,
        addReaction,
        deleteReaction
} = require('../../controllers/thoughtController');



// ~~~/api/thoughts~~
router.route('/').get(getAllThoughts)

router.route('/:userId').post(createNewThought)

//get thought by _id
router.route('/:id').get(singleThought).patch(updateThought).delete(deleteThought)


// ~~~/api/thoughts/:thoughtId/reactions~~~
router.route('/:id/reactions').post(addReaction)

router.route('/:thoughtId/reactions/:reactionId').delete(deleteReaction);

module.exports = router