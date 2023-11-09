import { CustomError } from "./custom-err";


export class NotAuthorisedError extends CustomError {
    code = 401;

    constructor() {
        super ("Not authorised");

        Object.setPrototypeOf(this, NotAuthorisedError.prototype);
    }

    serializeErrors(): { message: string; field?: string | undefined; }[] {
        return [{message: "Not authorised"}]
    }
}