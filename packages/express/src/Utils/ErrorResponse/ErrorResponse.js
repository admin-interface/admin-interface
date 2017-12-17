// @flow

/**
 * @param message
 * @param status
 * @param json
 * @constructor
 */
class ErrorResponse extends Error {
    status: number = 500;
    json: boolean  = false;


    constructor(message: any, status: number = 500, json: boolean = false) {
        super(message);

        // Capturing stack trace, excluding constructor call from it.
        Error.captureStackTrace(this, this.constructor);

        this.name = this.constructor.name;

        if (typeof status === 'number') {
            this.status = status;
        }

        if (typeof json === 'boolean') {
            this.json = json;
        }
    }
}

export default ErrorResponse;
