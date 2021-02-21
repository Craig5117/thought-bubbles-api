const { Thought, User } = require('../models');

const thoughtController = {
    // get all thoughts
    getAllThoughts (req, res) {
        Thought.find({})
        .select('-__v')
        .then(dbThoughtData => res.json(dbThoughtData))
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        })
    },
    // get one thought by id
    getThoughtById ({ params }, res) {
        Thought.findOne({ _id: params.id })
        .select('-__v')
        .then(dbThoughtData => {
            if (!dbThoughtData) {
                res.status(404).json({ message: 'No thought found with this id.' });
                return;
            }
            res.json(dbThoughtData);
        })
        .catch(err => {
            console.log(err);
            res.status(400).json(err);
        })
    },
    // add new thought
    addThought ({ body }, res) {
        Thought.create(body)
            .then(({ _id }) => {
                return User.findOneAndUpdate(
                    { _id: body.userId },
                    { $push: { thoughts: _id } },
                    { new: true }
                );
            })
            .then(dbUserData => {
                if (!dbUserData) {
                    res.status(404).json({ message: 'No user found with this id.' });
                    return;
                }
                res.json(dbUserData)
            })
            .catch(err => res.json(err));
    },
    // update thought by id
    updateThought (req, res) {
        // user may update thoughtText only
        // updating username would cause problems
        Thought.findOneAndUpdate({ _id: req.params.id }, {thoughtText: req.body.thoughtText}, { new: true, runValidators: true })
        .then(dbThoughtData => {
            if (!dbThoughtData) {
                res.status(404).json({ message: 'No thought found with this id.' });
                return;
            }
            res.json(dbThoughtData);
        })
        .catch(err => res.status(400).json(err));
    },
    // delete thought by id
    deleteThought ({ params }, res) {
        Thought.findOneAndDelete({ _id: params.id })
        .then(dbThoughtData => {
            return User.findOneAndUpdate(
                { username: dbThoughtData.username },
                { $pull: { thoughts: params.id } },
                { new: true }
            );
        })
        .then(dbUserData => {
            if (!dbUserData) {
                res.status(404).json({ message: 'No user found with this username.' });
                return;
            }
            res.json(dbUserData)
        })
        .catch(err => res.status(400).json(err));
    },
    // add reaction to thought
    addReaction () {

    },
    // remove a reaction
    removeReaction () {

    }
}

module.exports = thoughtController;