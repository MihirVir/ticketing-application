import express, {Request, Response} from "express"
import jwt from "jsonwebtoken";
import { currentUser } from "../middlewares/current-user";
const router = express.Router();

router.get("/api/users/current-user", currentUser,(req: Request, res: Response) => {
    res.send(req.current_user);
});


export {router as currentUserRouter}