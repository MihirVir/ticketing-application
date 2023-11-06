import express, {Request, Response} from "express"
import {body, validationResult} from "express-validator";
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
], (req: Request, res: Response) => {   
    const errors = validationResult(req);
    
    if (!errors.isEmpty()) {
        throw new Error('Invalid email or password');
    }

    const { email, password } = req.body;
    
    console.log('Creating a user....')
    throw new Error("Error creating a user")
    res.send({name: "Mihir"});
});


export {router as signupRouter}