import { CustomError } from "./custom-err";
export class DatabaseConnectionError extends CustomError {
    code = 500;
    reason = "Error connecting to database";
    constructor() {
        super('error connecting to db');

        Object.setPrototypeOf(this, DatabaseConnectionError.prototype);
    }

    serializeErrors() {
        return [
            { message: this.reason }
        ]
    }
}