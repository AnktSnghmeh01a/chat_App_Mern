import { Router } from "express";
import { getUsersforSideBar } from "../controllers/users.controller.js";
import protectRoute from "../middleware/protectRoute.js";

const router = Router();

router.get("/",protectRoute,getUsersforSideBar);


export default router;