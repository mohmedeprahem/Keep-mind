// models files
const userSchema = require(`../models/user`);
const bcrypt = require('bcrypt');

const validRequest = require(`../utils/valid-request`)

// @desc: create new user
// @route: POST /sign-Up
// @access: Public
exports.postSignUp = async (req, res, next) => {
    try {

        // check if the email is aready used
        let result = await userSchema.findOne({email: req.body.email});
        if (result) {
            
        }
        
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
        const errorMessage = validRequest.result()


        if (Object.keys(errorMessage[0]) != 0) {
            throw errorMessage
        }
        
        // incrypt password
        const incryptPassword = await bcrypt.hash(req.body.password, 12)

        //  save data of new user in database
        result = await userSchema.create({
            name: req.body.name,
            email: req.body.email,
            password: incryptPassword 
        })
        req.session._id = result._id
        // send respone
        return res.status(201).json({
            success: true, 
            message: `created new account`
        })
        
    } catch (e) {
        next(e)

    }

}