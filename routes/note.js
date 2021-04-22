// module requirement
const express = require('express');

// use express
const router = express.Router();

// controllers files
const { 
    postNote,
    getNotes
} = require('../controllers/note');

// @desc: Add new note
// @route: POST /api/v1/note
// @access: privite
router.post('/api/v1/note', postNote);

// @desc: get notes
// @route: get /api/v1/notes
// @access: privite
router.get('/api/v1/notes', getNotes);

module.exports = router;