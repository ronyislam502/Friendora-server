import express from "express";
import { UserControllers } from "./user.controller";
import { multerUpload } from "../../config/multer.config";
import { parseBody } from "../../middlewares/bodyParser";

const router = express.Router();

router.post("/create-admin",
    multerUpload.single("image"),
    parseBody,
    UserControllers.createAdmin
);



router.get("/create-member", UserControllers.createMember);

export const UserRoutes = router;