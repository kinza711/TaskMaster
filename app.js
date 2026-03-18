import express from "express";
import path from "path";
import authRoutes from "./routes/authRoutes.js";
import taskRoutes from "./routes/taskRoutes.js";
import profileRoute from "./routes/profileRoute.js";
import { fileURLToPath } from "url";
import dotenv from "dotenv";
dotenv.config(); // <-- dotenv config must be at the top

import methodOverride from "method-override";
import session from "express-session";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

app.use(methodOverride("_method"));
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// to fech and store data
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Static files
app.use(express.static(path.join(__dirname, "public")));

// alowed origein setup

const isProduction = process.env.NODE_ENV === "production";

app.set("trust proxy", 1);

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: isProduction, // 🔥 auto switch
      sameSite: isProduction ? "none" : "lax",
    },
  }),
);

// app.use(
//   session({
//     secret: process.env.SESSION_SECRET,
//     resave: false,
//     saveUninitialized: false,
//     cookie: {
//       secure: false,
//       sameSite: "lax",
//     },
//   }),
// );

// global middalware for session name
app.use((req, res, next) => {
  if (req.session.userId) {
    res.locals.username = req.session.name;
    res.locals.email = req.session.email;
    //res.locals.pic = req.session.pic ? req.session.pic : ""; // fallback
    res.locals.pic = req.session.pic || " ";
  } else {
    res.locals.username = "Guest";
    res.locals.email = "";
    //res.locals.pic = "";
  }
  next();
});

//import routes

app.use("/", authRoutes);
app.use("/", taskRoutes);
app.use("/", profileRoute);

//default route
app.get("/", (req, res) => {
  res.render("home");
});
//404 route
app.use((req, res) => {
  // res.send("page not found please visit another page ");
  res.render("tasks/404page");
});

export default app;
