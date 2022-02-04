const router = require('express').Router();

const {
        createNewThought,
        getAllThoughts
} = require('../../controllers/thoughtController');



// ~~~/api/thoughts~~
router.route('/').get(getAllThoughts)

router.route('/:userId').post(createNewThought)
// get all thoughts

//get thought by _id

//create a new thought
//push the created thought's `_id` to the associated user's `thoughts`

// edit a thought by _id

//delete thought by _id


// ~~~/api/thoughts/:thoughtId/reactions~~~

// add a reaction to a single thought's `reactions` array field

//delete to remove a reaction by id
module.exports = router