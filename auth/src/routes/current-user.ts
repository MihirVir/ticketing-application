import express, {Request, Response} from "express"
import jwt from "jsonwebtoken";
import { requireAuth } from "../middlewares/require-auth";
import { currentUser } from "../middlewares/current-user";
const router = express.Router();

router.get("/api/users/current-user", currentUser, requireAuth,(req: Request, res: Response) => {
    res.send({ current_user: req.current_user || null });
});


export {router as currentUserRouter}