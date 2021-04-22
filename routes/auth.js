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

// @desc: create new user
// @route: POST /api/v1/sign-up
// @access: Public
router.post('/api/v1/sign-up', postSignUp);

// @desc: login user account
// @route: POST /api/v1/login
// @access: public
router.post('/api/v1/login', postLogin);

// @desc: logout user account
// @route: GET /api/v1/logout
// @access: privite
router.get('/api/v1/logout', logoutUser);

module.exports = router;