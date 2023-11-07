import { CustomError } from "./custom-err";

export class NotFoundError extends CustomError {
    code = 404;

    constructor() {
        super("page not found");

        Object.setPrototypeOf(this, NotFoundError.prototype);
    }

    serializeErrors() {
        return [{message: "Not found"}];
    }
}