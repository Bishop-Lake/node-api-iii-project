const express = require('express');
const db = require('./userDb')
const pdb = require('../posts/postDb')

const router = express.Router();

router.post('/', validateUser, (req, res) => {
    db.insert(req.body)
        .then(user => {
            res.status(201).json(user)
        })
        .catch(() => {
            res.status(500).json({Error: "There was an issue adding the user to the database"})
        })
});

router.post('/:id/posts', validateUserId, validatePost, (req, res) => {
    req.body = {...req.body, user_id: req.user.id}
    pdb.insert(req.body)
        .then(post => {
            res.status(201).json(post)
        })
        .catch(() => {
            res.status(500).json({Error: "There was an issue adding the post to the database"})
        })
});

router.get('/', (req, res) => {
    db.get()
        .then(users => {
            res.status(200).json(users)
        })
        .catch(() => {
            res.status(500).json({Error: "Internal server error while trying to request users"})
        })
});

router.get('/:id', (req, res) => {

});

router.get('/:id/posts', (req, res) => {

});

router.delete('/:id', (req, res) => {

});

router.put('/:id', (req, res) => {

});

//custom middleware

function validateUserId(req, res, next) {
    db.getById(req.params.id)
        .then(userWithId => {
            if (userWithId == undefined) {
                res.status(400).json({ message: "invalid user id" })
            } else {
                req.user = userWithId
                next()
            }
        })
};

function validateUser(req, res, next) {
    if (Object.keys(req.body).length == 0) {
        res.status(400).json({ message: "missing user data" })
    } else if (req.body.name == null) {
        res.status(400).json({ message: "missing required name field" })
    }
    next()
};

function validatePost(req, res, next) {
    if (Object.keys(req.body).length == 0) {
        res.status(400).json({ message: "missing post data" })
    } else if (req.body.text == null) {
        res.status(400).json({ message: "missing required text field" })
    }
    next()
};

module.exports = router;
