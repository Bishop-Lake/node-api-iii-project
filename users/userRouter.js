const express = require('express');
const db = require('./userDb')

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

router.post('/:id/posts', validatePost, (req, res) => {
    res.send('hello')
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
