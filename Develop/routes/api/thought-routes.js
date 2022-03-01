const router = require('express').Router();
const {
    getAllThoughts,
    addThought,
    getThoughtById,
    updateThought,
    deleteThought,
    addReaction,
    deleteReaction
} = require('../../controllers/thought-controller');
const { route } = require('./user-routes');

// /api/thoughts, to get all thoughts
router.route('/').get(getAllThoughts);

// /api/thoughts/userId, to post thought based on user id 
router.route('/:userId').post(addThought);

// /api/thoughts/thoughtId, find thoughts based on user id and for updting them
router
    .route('/:thoughtId')
    .get(getThoughtById)
    .put(updateThought)

// /api/thoughts/userId/thoughtId, to delete thought based on id
router
    .route('/:userId/:thoughtId')
    .delete(deleteThought);

// /api/thoughts/thoughtId/reactions,to delete reaction (bonus)
router
    .route('/:thoughtId/reactions')
    .post(addReaction);

// /api/thoughtId/reactions/reactionId
router
    .route('/:thoughtId/reactions/:reactionId')
    .delete(deleteReaction);

module.exports = router;