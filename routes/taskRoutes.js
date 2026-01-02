import express from "express";
const router = express.Router();

import { getDashboard } from "../controllers/taskController.js";
import {getmyTasks} from "../controllers/taskController.js"
import {getCreateTasks} from "../controllers/taskController.js";
import {createTask} from "../controllers/taskController.js";
 import {deleteTasks} from "../controllers/taskController.js"
import {updateTask} from "../controllers/taskController.js";
import {isLoggedIn} from "../middlewares/authMiddleware.js"  //middleware protected routes
import {editTask} from "../controllers/taskController.js";
import uploads from "../middlewares/uploads.js"
//import {isUsername} from "../middlewares/uaernamemiddalware.js"
//pages routes 
router.get("/dashboard", isLoggedIn, uploads.single("pic"), getDashboard);
router.get("/mytasks", isLoggedIn, getmyTasks);
router.get("/createtask",isLoggedIn, getCreateTasks);


//APi's

router.post("/createtask", createTask);
router.delete("/delete/:id", deleteTasks);
router.get("/edit/:id", editTask);
router.put("/update/:id", updateTask);

export default router
