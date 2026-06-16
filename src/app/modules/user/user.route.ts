import express from "express";
import { UserControllers } from "./user.controller";

const router = express.Router();

router.get("/create-admin", UserControllers.createAdmin);

router.get("/create-member", UserControllers.createMember);

export const UserRoutes = router;