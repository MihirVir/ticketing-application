import { CustomError } from "./custom-err";

export class BadRequestError extends CustomError {
    code = 400;
    
    constructor(public message: string) {
        super(message);

        Object.setPrototypeOf(this, BadRequestError.prototype);
    }

    serializeErrors(): { message: string; field?: string | undefined; }[] {
        return [{message: this.message}]
    }
}