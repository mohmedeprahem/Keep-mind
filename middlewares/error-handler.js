// utils files
const errorHandler = require(`../utils/error`)

const errorRespone = (err, req, res, next) => {
    let error = {...err}
    console.log(error)

    if (err.code === 11000) {
        const message = `duplicate field value entered`
        error = new errorHandler(message, 409)
    }

    if (err.kind === `ObjectId`) {
        const message = `invalid id`
        error = new errorHandler(message, 400)
    }

    
    res.status(error.statusCode || 500).json({
        succus: false,
        error: error.message || 'server error'  
    })
}

module.exports = errorRespone