const router = require('express').Router();

const {
    getAllUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser,
    addFriend,
    deleteFriend
} = require('../../controllers/user-controller');

// To get all and POST at /api/users
router
    .route('/')
    .get()
    .post();

// /api/users/:id to use user id for fetching, update and delete
router
    .route('/:id')
    .get(getUserById)
    .put(updateUser)
    .delete(deleteUser)

// /api/users : for creating user and get user 
router
    .route('/')
    .get(getAllUsers)
    .post(createUser);

// /api/users/:userId/friends/:friendId, for adding and removing firend
router
    .route('/:id/friends/:friendId')
    .post(addFriend)
    .delete(deleteFriend);

module.exports = router;