class AxiosHandlerError extends Error {
    constructor (args) {
        const { name, response, message } = args
        super(message)
        console.log('args', args);
        Object.setPrototypeOf(this, new.target.prototype)
        this.name = name
        this.message = message
        this.data = response?.data
        this.response = response
        this.status = response?.status
        this.statusText = response?.statusText
        Error.captureStackTrace(this)
    }
}

module.exports = AxiosHandlerError
