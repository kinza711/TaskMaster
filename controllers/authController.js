import session from "express-session";
import users from "../models/userModel.js";

export const registerUser = async (req, res) => {
  try {
    const { name, email, password, pic } = req.body;
    let picPath = "/default-avatar.png"; // fallback

    if (req.file) {
      picPath = "/uploads/" + req.file.filename;
    }
    const createUser = await users.create({
      name,
      email,
      password,
      pic: picPath,
    });
    console.log(createUser, "user craeted successfully");

    res.redirect("/login");
  } catch (err) {
    console.log("user not careted:", err);
    res.status(500).json({
      message: "server error user not registed",
      error: err.message,
    });
  }
};

// export const loginUser = async(req, res)=>{
//     const {email, password} = req.body;
//     const user = await users.findOne({email})
//     if(!user){
//        return res.redirect("/login")
//     }else{
//         if(user.password === password){
//             req.session.UserId = user._id;
//          return res.redirect("/dashboard") ;
//         }
//         // If password is wrong
//     return res.redirect("/login");
//     }

// }

// another methord for login

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await users.findOne({ email });
    if (!user) {
      return res.redirect("/register");
    }
    if (email === user.email && password === user.password) {
      req.session.userId = user._id;
      req.session.isAuth = true; // it memorise the id
      req.session.name = user.name;
      req.session.email = user.email;
      req.session.pic = user.pic;
      return res.redirect("/dashboard");
    }
    return res.redirect("/login?msg=email or password is incorrect");
  } catch (err) {
    console.log("user not logedin", err);
    res.status(500).json({
      message: "server error user not login",
      error: err.message,
    });
  }
};
export const logout = (req, res) => {
  // req.session.destroy();
  // res.redirect("/login");
  req.session.destroy((err) => {
    if (err) {
      console.log(err);
      return res.redirect("/dashboard");
    }

    res.clearCookie("connect.sid"); // 🔥 VERY IMPORTANT
    res.redirect("/login");
  });
};
