// module requirement
const express = require('express');

// use express
const router = express.Router();

// controllers files
const { 
    postSignUp,
    postLogin,
    logoutUser, 
} = require('../controllers/auth');

// Run middlewares
router.post('/sign-up', postSignUp)

router.post('/auth/login', postLogin)

router.get('/logout', logoutUser)

module.exports = router;