// module requirement
const express = require('express');

// use express
const router = express.Router();

// controllers files
const { 
    getUserInfo
} = require('../controllers/user');


router.get('/user', getUserInfo)


module.exports = router;