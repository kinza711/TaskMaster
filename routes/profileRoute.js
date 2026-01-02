import express from "express";
const router = express.Router();

import {getProfile} from "../controllers/profileController.js"
import {isLoggedIn} from "../middlewares/authMiddleware.js"
import {editProfile} from "../controllers/profileController.js"
import {updateProfile} from "../controllers/profileController.js"
import uploads from "../middlewares/uploads.js";
import {updateimg} from "../controllers/profileController.js"


router.get("/profile",   isLoggedIn, uploads.single("pic"), getProfile);
 router.get("/editprofile", isLoggedIn,uploads.single("pic"), editProfile )
router.put("/updateprofile/:id",  updateProfile);
router.put("/updateimg/:id", uploads.single("pic"), updateimg)

export default router