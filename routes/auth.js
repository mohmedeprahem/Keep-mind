// module requirement
const express = require('express');

// use express
const router = express.Router();

// controllers files
const { postSignUp } = require('../controllers/auth');

// Run middlewares
router.post('/sign-up', postSignUp)

module.exports = router;