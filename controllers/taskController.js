import Task from "../models/taskModel.js";
// find dashboard and recent task inside dashboard
export const getDashboard = async (req, res) => {
    try {
        const userId = req.session.userId;
        const recentTasks = await Task.find({ user: userId })
            .sort({ createdAt: -1 })
            .limit(4);
        const totalTasks = await Task.countDocuments({ user: userId });
        const completedTasks = await Task.countDocuments({ user: userId, status: "completed" });
        const pendingTasks = await Task.countDocuments({ user: userId, status: "pending" });
        const priorityTasks = await Task.countDocuments({ user: userId, Priority: "hard" });
        const username = req.session.name ? req.session.name : "Guest";
        const pic = req.session.pic || "/default-avatar.png";

        const today = new Date();
        res.render("tasks/dashboard", {
            recentTasks,
            totalTasks,
            completedTasks,
            pendingTasks,
            priorityTasks,
            username,
            pic
        });
    } catch (err) {
        console.log("dashbord task gettimng issue", err);
    }
};


export const getCreateTasks = (req, res) => {
    res.render("tasks/createtask");
}

// craete tasks
export const createTask = async (req, res) => {
    try {
        const { Title, description, Priority, status, date } = req.body;

        const username = req.session.name ? req.session.name : "Guest";
        await Task.create({
            Title, description, Priority, status, date, username,
            user: req.session.userId   // 🔐 REAL LINK

        })
        res.redirect("/mytasks",);
        // console.log(tasks, "task craeted successfully");

    } catch (err) {
        console.log("task not careted", err);
    }
}
//find tasks 
export const getmyTasks = async (req, res) => {
    try {
        const AllTasks = await Task.find({ user: req.session.userId });
        const username = req.session.name ? req.session.name : "Guest";
        // res.send(AllTasks);
        res.render("tasks/mytasks", { AllTasks, username });
    } catch (err) {
        console.log("task not find issue", err);
    }
}

//find  recent tasks tasks 
// export const getrecentTasks = async (req, res) => {
//     const recentTasks = await Task.find()
//     .sort({ createdAt: -1 }) // latest first
//       .limit(4); // sirf 4 recent tasks
//     // res.send(AllTasks);
//     res.render("tasks/dashboard", { recentTasks });
//     console.log(recentTasks);

// }

//delete tasks
export const deleteTasks = async (req, res) => {
    try {
        const { id } = req.params;
        await Task.findByIdAndDelete({ _id: id, user: req.session.userId });
        res.redirect("/mytasks");
    } catch (err) {
        console.log("task not deleted", err);
    }
}
//edit task

export const editTask = async (req, res) => {
    const { id } = req.params;
    const task = await Task.findById({ _id: id, user: req.session.userId });
    res.render("./tasks/edittask", { Task: task });
}


//update task 

export const updateTask = async (req, res) => {
    const { id } = req.params;
    await Task.findByIdAndUpdate({ _id: id, user: req.session.userId }, req.body,);

    res.redirect("/mytasks")
}
