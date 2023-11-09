import express, {Request, Response} from "express"
import jwt from "jsonwebtoken"
import {body} from "express-validator";

import { BadRequestError } from "../errors/bad-request-error";
import { validateRequest } from "../middlewares/validate-request";
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
], validateRequest, async (req: Request, res: Response) => {   
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
    }, process.env.JWT_KEY!);

    req.session = {
        jwt: user_jwt
    }
    
    res.status(201).send(user);
});


export { router as signupRouter }