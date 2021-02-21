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
 
router
    .route('/:id')
    .get(getThoughtById)
    .put(updateThought)
    .delete(deleteThought);
    
router
    .route('/:thoughtId/reactions')
    .post(addReaction)
    // reactionId is passed in the body in this route
    // alternately, this could be handled by another route
    // that accepts reactionId as a parameter
    .delete(removeReaction);


module.exports = router;