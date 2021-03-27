// utils files
const errorHandler = require(`../utils/error`)

const errorRespone = (err, req, res, next) => {
    let error = {...err}
    console.log(error)
    if (error['0']) {
        const message = error['0'];
        error = new errorHandler(message, 400)
    }

    if (err.statusCode === 400) {
        const message = `bad request`
        error = new errorHandler(message, 400)
    }

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