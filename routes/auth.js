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
router.post('/api/v1/sign-up', postSignUp)

router.post('/api/v1/login', postLogin)

router.get('/api/v1/logout', logoutUser)

module.exports = router;