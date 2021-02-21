const router = require('express').Router();

const {
    getAllThoughts,
    getThoughtById,
    addThought,
    updateThought,
    deleteThought,
    addReaction,
    removeReaction
} = require('../../controllers/thought-controller');

router
    .route('/')
    .get(getAllThoughts)
    .post(addThought);

// this could probably be combined with the /:id route
// but I thought it would be best to keep them separated
// for better readability since the id passed in here is a userId
router
    .route('/:id/:userId')
    .delete(deleteThought);
    

router
    .route('/:id')
    .get(getThoughtById)
    .put(updateThought)
    



module.exports = router;