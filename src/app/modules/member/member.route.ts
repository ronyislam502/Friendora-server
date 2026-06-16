import express from "express";
import { MemberControllers } from "./member.controller";

const router = express.Router();

router.get("/", MemberControllers.allMembers);

export const MemberRoutes = router;
