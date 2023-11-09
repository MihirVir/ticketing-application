import express, {Request, Response} from "express"
import { currentUser } from "../middlewares/current-user";
const router = express.Router();

router.get("/api/users/current-user", currentUser,(req: Request, res: Response) => {
    res.send({ current_user: req.current_user || null });
});


export {router as currentUserRouter}