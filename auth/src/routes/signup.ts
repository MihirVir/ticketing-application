import express, {Request, Response} from "express"
import jwt from "jsonwebtoken"
import {body, validationResult} from "express-validator";
import { RequestValidationError} from "../errors/request-validation-error";
import { BadRequestError } from "../errors/bad-request-error";
import { User } from "../models/user";

const router = express.Router();

router.get("/api/users/signup", (req: Request, res: Response) => {
    res.send("hello")
})

router.post("/api/users/signup", [
    body('email')
        .isEmail()
        .withMessage("Email must be valid"),
    body("password")
        .trim()
        .isLength({ min: 4, max: 20})
        .withMessage("Password must be between 4 to 20 characters")
], async (req: Request, res: Response) => {   
    const errors = validationResult(req);
    
    if (!errors.isEmpty()) {
        throw new RequestValidationError(errors.array());
    }

    const { email, password } = req.body;
    
    const existing_user = await User.findOne({ email });

    if (existing_user) {
        throw new BadRequestError("email already in use");
    }

    const user = User.build({email, password});

    await user.save();

    // Generate jsonwbetoken store it in the session object
    const user_jwt = jwt.sign({
        id: user.id,
        email: user.email
    }, "asdf");

    req.session = {
        jwt: user_jwt
    }
    
    res.status(201).send(user);
});


export {router as signupRouter}