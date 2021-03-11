class ErrorHandler {
    constructor () {
        this.r = [{}]
    }

    // read data in req.body
    body (bodyName, req) {
        this.name   = bodyName
        this.type   = `body`;
        this.value  = req[this.type][bodyName]
        return this
    }

    // read data in req.query
    query (queryName, req) {
        this.name   = queryName
        this.type   = `query`
        this.value  = req[this.type][bodyName]
        return this
    }

    // validation min length
    minLength (number = 0) {

        // check the data found
        if(!this.value) return this;
        
        const inputName = this.name

        if (this.value.length < number) {
            this.r[0][inputName] = `required at least of character ${number}`
        }
        return this
    }

    // validation max length
    maxLength (number = 2^53 - 1) {

        // check the data found
        if(!this.value) return this;

        const inputName = this.name
        
        if (this.value.length > number) {
            this.r[0][inputName] = `required max of character ${number}`
        }
        return this
    }

    // validation email
    isEmail () {
        
        // check the data found
        if(!this.value) return this;

        const re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        const inputName = this.name;

        if (!re.test(this.value)) {
            this.r[0][inputName] = `invalid input`
        }
        return this
    }

    // validation trim
    trim () {
        
        // check the data found
        if(!this.value) return this;

        const inputName = this.name;

        // validation input
        if (this.value.replace(/^\s+|\s+$/g, '')) {
            return this;
        }

        this.r[0][inputName] = `invalid input`
        return this
    }

    // validation lowercase
    lowercase () {
        // check the data found
        if(!this.value) return this;

        const re = /^[a-zA-Z]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/
        const inputName = this.name;

        if (!re.test(this.value)) {
            this.r[0][inputName] = `invalid input`
        }
        return this
    }

    // return errors
    result () {
        const errorMessage = this.r
        this.r = [{}]
        return errorMessage
    }

    // validation required 
    required () {
        if (!this.value) {
            const inputName = this.name;
            
            this.r[0][inputName] = `${inputName} is required`
        }
        return this
    }

}



module.exports = new ErrorHandler();