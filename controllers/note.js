// models files
const userSchema = require(`../models/user`);
const noteSchema = require(`../models/note`);

const validRequest = require(`../utils/valid-request`);

// @desc: Add new note
// @route: POST /add-note
// @access: privite
exports.postNote = async (req, res, next) => {
    try { 
        // check if there are no data
        if (req.body.title.length === 0 && req.body.description.length === 0) 
            return res.status(400).json({
                saccuss: false,
                error: `no data`
            });

        // validation data 
        validRequest.body(`title`, req).maxLength(999);
        validRequest.body(`description`, req).maxLength(999);

        // check if there invalid data
        const errorMessage = validRequest.result()
        
        if (Object.keys(errorMessage[0]) != 0) {
            throw errorMessage
        }
        
        // create new note
        const noteInfo = await noteSchema.create(req.body);

        // Add note's id to user docuomention
        const result = await userSchema.findByIdAndUpdate(req.session._id, { 
            $push: {
                notesId: noteInfo._id 
            }
        });


        return res.status(201).json({
            saccuss: true,
            message: `create new note`
        })
        
    } catch (e) {
        console.log(e)
        next(e)
    }
}