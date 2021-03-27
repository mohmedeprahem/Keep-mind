// module requirement
const express = require('express');

// use express
const router = express.Router();

// controllers files
const { 
    postNote
} = require('../controllers/note');

router.post('/add-note', postNote)

module.exports = router;