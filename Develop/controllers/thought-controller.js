const { thought } = require('../models/thought');
const user = require('../models/user');

const thoughtController = {
    // to get all thoughts
    /**
     * 
     * API: http://localhost:3001/api/thoughts/
     */
    getAllThoughts(req, res) {
        thought.find({})
            .then(dbThoughtData => res.json(dbThoughtData))
            .catch(err => {
                console.log(err);
                res.status(400).json(err);
            });
    },

    // get one thought by id
     /**
     * 
     * API: http://localhost:3001/api/thoughts/thoughtId
     * 
     */
    getThoughtById({ params }, res) {
        thought.findOne({ _id: params.thoughtId })
            .then(dbThoughtData => {
                if (!dbThoughtData) {
                    res.status(404).json({ message: 'Thought not found with this id!' });
                    return;
                }
                res.json(dbThoughtData);
            })
            .catch(err => {
                console.log(err);
                res.status(400).json(err);
            });
    },

    // add thought to user
    /**
     * 
     * API: http://localhost:3001/api/thoughts/621cd0d2a77b48498e6fa7de
     * where: 621cd0d2a77b48498e6fa7de is user id
     * {
         "thoughtText": "Here's a cool thought...",
        "username": "avneet"
        }
        Function used: Post
     */
    addThought({ params, body }, res) {
        console.log(body);
        thought.create(body)
            .then(({ _id }) => {
                return user.findOneAndUpdate(
                    { _id: params.userId },
                    { $push: { thoughts: _id } },
                    { new: true }
                );
            })
            .then(dbUserData => {
                if (!dbUserData) {
                    res.status(404).json({ message: 'User not found with this id!' });
                    return;
                }
                res.json(dbUserData);
            })
            .catch(err => res.json(err));
    },

    // update thought by id
    /**
     * 
     * Function : put 
     * API used : http://localhost:3001/api/thoughts/621ce1007bc3b4ee87ddc514/
     * Exmaple : 
     * {
         "thoughtText": "Here's a cool thought2...",
        "username": "avneet"
        }
    * where: 621ce1007bc3b4ee87ddc514 is thought id 
     */
    updateThought({ params, body }, res) {
        thought.findOneAndUpdate({ _id: params.thoughtId }, body, { new: true, runValidators: true })
            .then(dbThoughtData => {
                if (!dbThoughtData) {
                    res.status(404).json({ message: 'Thought not found with this id!' });
                    return;
                }
                res.json(dbThoughtData);
            })
            .catch(err => res.status(400).json(err));
    },

    // remove thought
    deleteThought({ params }, res) {
        thought.findOneAndDelete({ _id: params.thoughtId })
            .then(deletedThought => {
                if (!deletedThought) {
                    return res.status(404).json({ message: 'Thought not found with this id!' });
                }
                return user.findOneAndUpdate(
                    { _id: params.userId },
                    { $pull: { thoughts: params.thoughtId } },
                    { new: true }
                );
            })
            .then(dbUserData => {
                if (!dbUserData) {
                    res.status(404).json({ message: 'User not found with this id!' });
                    return;
                }
                res.json(dbUserData);
            })
            .catch(err => res.json(err));
    },

    // add reaction
    /***
     * API:http://localhost:3001/api/thoughts/621ce1007bc3b4ee87ddc514/reactions
     * where: 621ce1007bc3b4ee87ddc514 thought id
     * JSON example: {
         "reactionBody": "reaction to thought : 621ce1007bc3b4ee87ddc514 i like it ",
        "username": "gurpreet"
}
    * where username : is the user adding reactions
     * 
     */
    addReaction({ params, body }, res) {
        thought.findOneAndUpdate(
            { _id: params.thoughtId },
            { $addToSet: { reactions: body } },
            { new: true, runValidators: true }
        )
            .then(dbThoughtData => {
                if (!dbThoughtData) {
                    return res.status(404).json({ message: 'Thought not found with this id!' });
                }
                res.json(dbThoughtData);
            })
            .catch(err => res.json(err));
    },

    /***
     * To delete reaction 
     * API: http://localhost:3001/api/thoughts/621ce1007bc3b4ee87ddc514/reactions/621cf40f75f1c6a3d1b744c5
     */
    deleteReaction({ params }, res) {
        console.log(params.thoughtId, params.reactionId);
        thought.findOneAndUpdate(
            { _id: params.thoughtId },
            { $pull: { reactions: { reactionId: params.reactionId } } },
            { runValidators: true, new: true }
        )
            .then(dbUserData => res.json(dbUserData))
            .catch(err => res.json(err));
    }
};

module.exports = thoughtController;