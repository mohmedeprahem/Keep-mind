// module requirement
const express = require('express');

// use express
const router = express.Router();

// controllers files
const { 
    getUserInfo
} = require('../controllers/user');

// @desc: get user info
// @route: GET /user
// @access: privite
router.get('/api/v1/user', getUserInfo);


module.exports = router;