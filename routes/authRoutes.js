import express from "express";
const router = express.Router()
import {registerUser} from "../controllers/authController.js"
import {loginUser} from "../controllers/authController.js";
import { logout } from "../controllers/authController.js";
import upload from "../middlewares/uploads.js"


router.get("/login", (req, res) => {
    res.render("auth/login", {
    message: req.query.msg // it show pass or email is inccorect 
  });
    
})
router.get("/register", (req, res) => {
    res.render("auth/register");
})


router.post("/register", upload.single("pic"), registerUser )

// router.get("/login", registerUser )

router.post("/login",  loginUser)
router.get("/logout", logout)


export default router