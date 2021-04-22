// models files
const userSchema = require(`../models/user`);
const noteSchema = require(`../models/note`);

// utils files
const validRequest = require(`../utils/valid-request`);
const ErrorHandler = require(`../utils/valid-request`)

// @desc: Add new note
// @route: POST /api/v1/note
// @access: privite
exports.postNote = async (req, res, next) => {
    try { 
        // check if there are no data
        if (req.body.title.length === 0 && req.body.description.length === 0) 
            return next(new ErrorHandler(`not data`, 400))
        // validation data 
        validRequest
            .body(`title`, req)
            .maxLength(999);
        validRequest
            .body(`description`, req)  
            .maxLength(999);

        // check if there invalid data
        const errorMessage = validRequest.result();
        console.log(errorMessage)
        
        
        // create new note
        const noteInfo = await noteSchema.create(req.body);

        // Add note's id to user docuomention
        await userSchema
            .findByIdAndUpdate(req.session._id, { 
                $push: {
                    notesId: noteInfo._id
                }
            });


        return res.status(201).json({
            saccuss: true,
            message: `create new note`
        });
        
    } catch (e) {
        console.log(e);
        next(e);
    };
};

// @desc: get notes
// @route: get /api/v1/notes
// @access: privite
exports.getNotes = async (req, res, next) => {
    try {
        // get notes from db
        const notes = await userSchema
            .findById(req.session._id)
            .select(`notesId -_id`)
            .populate('notesId');

        // send respone to claint
        res.status(200).json({
            success: true,
            message: `notes of user`,
            data: {
                kind: 'notes',
                items: notes
            }
        });

    } catch (e) {
        console.log(e);
        next(e);
    };
};

// @desc: get note
// @route: get /api/v1/note/:noteId
// @access: privite
exports.getNote = async (req, res, next) => {
    try  {
        // find note
        const note = await noteSchema
            .findById(req.params.noteId)
        
        // check if node found
        if (!note) {
            return next()
        }

    } catch (e) {

    }
}