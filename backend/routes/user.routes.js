import { Router } from "express";
import { getUsers } from "../controllers/users.controller.js";
import protectRoute from "../middleware/protectRoute.js";

const router = Router();

router.get("/",protectRoute,getUsers);


export default router;