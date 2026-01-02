import session from "express-session";
import users from "../models/userModel.js";

export const registerUser = async (req, res) => {
    try {
        const { name, email, password, pic, } = req.body;
        let picPath = "/default-avatar.png"; // fallback

        if (req.file) {
            picPath = "/uploads/" + req.file.filename;
        }
        const createUser = await users.create({
            name, email, password, pic: picPath
        })
        console.log(createUser, "user craeted successfully");

        res.redirect("/login");
    } catch (err) {
        console.log("user not careted:", err);

    }

}

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
            return res.redirect("/register")
        }
        if (email === user.email && password === user.password) {
            req.session.userId = user._id;
            req.session.isAuth = true;// it memorise the id
            req.session.name = user.name;
            req.session.email = user.email;
            req.session.pic = user.pic;
            return res.redirect("/dashboard");
        }
        return res.redirect("/login?msg=email or password is incorrect")
    } catch (err) {
        console.log("user not logedin", err);

    }
}


// export const loginUser = async (req, res) => {
//     try {
//         // 1️⃣ Trim input & convert email to lowercase
//         const email = req.body.email.trim().toLowerCase();
//         const password = req.body.password.trim();

//         // 2️⃣ Find user (case-insensitive)
//         const user = await users.findOne({ email: { $regex: `^${email}$`, $options: "i" } });

//         // 3️⃣ If user not found → redirect to register
//         if (!user) {
//             return res.redirect("/register");
//         }

//         // 4️⃣ Check password (plain text)
//         if (password === user.password) {
//             // 5️⃣ Setup session
//             req.session.userId = user._id;
//             req.session.isAuth = true;
//             req.session.name = user.name;
//             req.session.email = user.email;
//             req.session.pic = user.pic || ""; // fallback

//             // 6️⃣ Redirect to dashboard
//             return res.redirect("/dashboard");
//         }

//         // 7️⃣ Wrong password → redirect login with message
//         return res.redirect("/login?msg=email or password is incorrect");
//     } catch (err) {
//         console.log("user not logged in:", err);
//         return res.redirect("/login?msg=internal server error");
//     }
// };


export const logout = (req, res) => {
    req.session.destroy();
    res.redirect("/login");
};

