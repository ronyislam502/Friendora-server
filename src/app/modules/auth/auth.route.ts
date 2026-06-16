import express from "express";
import { UserControllers } from "../member/member.controller";
import { AuthControllers } from "./auth.controller";

const router = express.Router();

router.post("/signup", UserControllers.createUser);

router.post("/login", AuthControllers.loginUser);

export const AuthRoutes = router;
