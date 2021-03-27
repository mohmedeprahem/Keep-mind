// models files
const userSchema = require(`../models/user`);

// @desc: get user info
// @route: GET /user
// @access: privite
exports.getUserInfo = async (req, res, next) => {
    try {
        // get user data
        let userData = await userSchema.findById(req.session._id).select('name -_id');

        // send correct respone
        return res.status(200).json({
            success: true,
            message: `user info`,
            data: {
                kind: `user`,
                items: userData
            }
        })

    } catch (e) {
        next(e)
    }
}
