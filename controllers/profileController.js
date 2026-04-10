import Task from "../models/taskModel.js";
import users from "../models/userModel.js";

export const getProfile = async (req, res) => {
  try {
    const userId = req.session.userId;
    const completedTasks = await Task.countDocuments({
      user: userId,
      status: "completed",
    });
    const pendingTasks = await Task.countDocuments({
      user: userId,
      status: "pending",
    });
    const priorityTasks = await Task.countDocuments({
      user: userId,
      Priority: "hard",
    });

    const username = req.session.name || "Guest";
    const email = req.session.email || "Guest";

    // Use session pic if exists, else fallback
    const pic = req.session.pic || "/default-avatar.png";

    res.render("profile", {
      completedTasks,
      pendingTasks,
      priorityTasks,
      username,
      email,
      pic,
    });
  } catch (err) {
    console.log("user prfile getting issue", err);
    res.status(500).json({
      message: "server error getting profile issue",
      error: err.message,
    });
  }
};

//edit profile
export const editProfile = async (req, res) => {
  try {
    const userId = req.session.userId; // logged-in user id
    const user = await users.findById(userId);

    if (!user) return res.redirect("/login");

    res.render("editprofile", { user }); // pass variable as 'user'
  } catch (err) {
    console.error(err);
    res.send("Error loading edit profile page");
    res.status(500).json({
      message: "server error ",
      error: err.message,
    });
  }
};

export const updateProfile = async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = { ...req.body };

    if (req.file) {
      updateData.pic = "/uploads/" + req.file.filename;
      req.session.pic = updateData.pic;
    }

    const updatedUser = await users.findByIdAndUpdate({ _id: id }, req.body, {
      new: true,
    });

    // Update session
    req.session.name = updatedUser.name;
    req.session.email = updatedUser.email;

    res.redirect("/profile");
  } catch (err) {
    console.error(err);
    //res.send("Error updating profile");
    res.status(500).json({
      message: "server error user not updated",
      error: err.message,
    });
  }
};
export const updateimg = async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = {};

    if (req.file) {
      // Set the new pic path
      updateData.pic = "/uploads/" + req.file.filename;
    }

    // Update user in DB
    const updatedUser = await users.findByIdAndUpdate({ _id: id }, updateData, {
      new: true,
    });

    // Update session with new pic
    if (updatedUser && updatedUser.pic) {
      req.session.pic = updatedUser.pic;
    }

    res.redirect("/profile");
  } catch (err) {
    console.error(err);
    res.send("Error updating profile image");
    res.status(500).json({
      message: "server error user not registed",
      error: err.message,
    });
  }
};
