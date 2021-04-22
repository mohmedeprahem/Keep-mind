// models files
const userSchema = require(`../models/user`);
const bcrypt = require('bcrypt');

const validRequest = require(`../utils/valid-request`);

// package requirement
const path = require(`path`);

// @desc: create new user
// @route: POST /api/v1/sign-up
// @access: Public
exports.postSignUp = async (req, res, next) => {
    try {

        // check if the email is aready used
        let result = await userSchema.findOne({email: req.body.email});
        if (result) {
            const err = {
                code: 11000
            }
            throw err;
        };
        
        // validation data
        validRequest.body('email', req)
            .isEmail()
            .lowercase()
            .required();

        validRequest.body('name', req)
            .required()
            .maxLength(30);

        validRequest.body('password', req)
            .minLength(8)
            .required();
        
        // chech if there invalid data
        const errorMessage = validRequest.result();
        
        if (Object.keys(errorMessage[0]) != 0) {
            throw errorMessage;
        };
        
        // incrypt password
        const incryptPassword = await bcrypt.hash(req.body.password, 12);

        //  save data of new user in database
        result = await userSchema.create({
            name: req.body.name,
            email: req.body.email,
            password: incryptPassword 
        });

        // save data in session cookies
        req.session._id = result._id;

        // send correct respone
        return res.status(201).json({
            success: true, 
            message: `created new account`
        });
        
    } catch (e) {
        next(e);
    };
}

// @desc: login user account
// @route: POST /api/v1/login
// @access: public
exports.postLogin = async (req, res, next) => {
    try {
        let err = {};
        // check email
        let userData = await userSchema.findOne({email: req.body.email});

        if (!userData) {
            err.statusCode = 400;
            throw new next(err);
        };

        // check password
        let result = await bcrypt.compare(req.body.password, userData.password);
        if (!result) 
            throw new next(err);

        // save data in session cookies
        req.session._id = userData._id;

        // send correct respone
        return res.status(200).json({
            success: true, 
            message: `user login successfully`
        });


    } catch (e) {
        console.log(e);
        next(e);
    };
}

// @desc: logout user account
// @route: GET /api/v1/logout
// @access: privite
exports.logoutUser = async (req, res, next) => {
    try {
        // destroy session cookies
         req.session.destroy((err) => {
            res.status(204).clearCookie("connect.sid").send('cleared cookie');
         });

    } catch (e) {
        next(e);
    };
}