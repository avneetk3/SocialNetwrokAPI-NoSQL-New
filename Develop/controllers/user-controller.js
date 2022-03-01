const { user, thought } = require('../models');


//Get all users 
const userController = {
    // get all users
    getAllUsers(req, res) {
        user.find({})
            .then(dbUserData => res.json(dbUserData))
            .catch(err => {
                console.log(err);
                res.status(400).json(err);
            });
    },

    // find one user by id
    /**
     * 
     * @param _id
     * Exmple: http://localhost:3001/api/users/621baf2dbb2d2dd4f4ac41de where  621baf2dbb2d2dd4f4ac41de is id
     */
    getUserById({ params }, res) {
        console.log(params+ params.id)
        user.findOne({ _id: params.id })
            .populate('thoughts')
            .populate('friends')
            .select('-__v')
            .then(dbUserData => {
                if (!dbUserData) {
                    res.status(404).json({ message: 'No user found with this id!' });
                    return;
                }
                res.json(dbUserData);
            })
            .catch(err => {
                console.log(err);
                res.status(400).json(err);
            });
    },

    // createUser
    /**
     * 
     * {
    "username": "Avneet",
    "email": "avneet1@gmail.com"
}
     */
    createUser({ body }, res) {
        user.create(body)
            .then(dbUserData => res.json(dbUserData))
            .catch(err => res.status(400).json(err));
    },


    // Update user based on id
    /**
     * 
     * Function: Put 
     * Example : http://localhost:3001/api/users/621baf2dbb2d2dd4f4ac41de and data is : 
     * {
            "username": "Avneet",
            "email": "avneet1@gmail.com"
        }
     */
    updateUser({ params, body }, res) {
        user.findOneAndUpdate({ _id: params.id }, body, { new: true, runValidators: true })
            .then(dbUserData => {
                if (!dbUserData) {
                    res.status(404).json({ message: 'No user found with this id!' });
                    return;
                }
                res.json(dbUserData);
            })
            .catch(err => res.status(400).json(err));
    },

    // To delete user
    /**
     * 
     * @param : id 
     * Example : http://localhost:3001/api/users/621baf2dbb2d2dd4f4ac41de
     * 
     */
    deleteUser({ params }, res) {
        user.findOneAndDelete({ _id: params.id })
            .then(dbUserData => {
                if (!dbUserData) {
                    return res.status(404).json({ message: 'No user found with this id!' });
                }

                // working on  bonus: to delete thoughts when deleting the user 
                 /*return thought.deleteMany({ _id: { $in: dbUserData.thoughts } })*/
            })
            .then(() => {
                res.json({ message: 'user has been deleted.' });
            })
            .catch(err => res.status(400).json(err));
    },

    // API to add friend
    /**
     * 
     * Format: /api/users/:userId/friends/:friendId 
     * function : Post
     * Example : http://localhost:3001/api/users/621cd0d2a77b48498e6fa7de/friends/621cd0b7a77b48498e6fa7da
     */
    addFriend({ params }, res) {
        user.findOneAndUpdate({ _id: params.id }, { $addToSet: { friends: params.friendId } }, { runValidators: true })
            .then(dbUserData => {
                if (!dbUserData) {
                    res.status(404).json({ message: 'No user found with this id!' });
                    return;
                }
                res.json(dbUserData);
            })
            .catch(err => res.status(400).json(err));
    },

    //to delete friend 
    /**
     * 
     * API: /api/users/:userId/friends/:friendId
     * Example: http://localhost:3001/api/users/621cd0d2a77b48498e6fa7de/friends/621cd0b7a77b48498e6fa7da 
     */
    deleteFriend({ params }, res) {
        user.findOneAndUpdate({ _id: params.id }, { $pull: { friends: params.friendId } }, { runValidators: true })
            .then(dbUserData => {
                if (!dbUserData) {
                    res.status(404).json({ message: 'No user found with this id!' });
                    return;
                }
                res.json(dbUserData);
            })
            .catch(err => res.status(400).json(err));
    },

}

module.exports = userController;