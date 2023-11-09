import express, {Request, Response} from "express"
import { body } from "express-validator";
import jwt from "jsonwebtoken";
import { Password } from "../services/password";
import { validateRequest } from "../middlewares/validate-request";
import { User } from "../models/user";
import { BadRequestError } from "../errors/bad-request-error";
const router = express.Router();

router.post("/api/users/signin", [
    body("email")
        .isEmail()
        .withMessage("Email must be valid"),
    body("password")
        .trim()
        .notEmpty()
        .withMessage("You must supply a password")
], validateRequest, async (req: Request, res: Response) => {
    const {email, password} = req.body;

    const existing_user = await User.findOne({email});
    if(!existing_user) {
        throw new BadRequestError("Invalid Credentials");
    }

    const passwords_match = await Password.compare(existing_user.password, password);

    if (!passwords_match) {
        throw new BadRequestError("Invalid Credentials");
    }

    const user_jwt = jwt.sign({id: existing_user.id, email: existing_user.email}, process.env.JWT_KEY!);

    req.session = {
        jwt: user_jwt
    }

    return res
            .status(200)
            .send({existing_user});
});


export {router as signinRouter}