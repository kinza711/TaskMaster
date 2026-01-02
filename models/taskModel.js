import mongoose from "mongoose";

const taskSchema = new mongoose.Schema({
    Title: { type: String, required: true },
    description: { type: String },
    Priority: {
        type: String,
        required: true,
        default: "low",
        enum: ["low", "medium", "hard"]
    },
    status: {
        type: String,
        required: true,
        default: "pending",
        enum: ["pending", "progress", "completed"]
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,

    },
    date: { type: Date, required: true, default: Date.now }

},{ timestamps: true });

export default mongoose.model("allTasks", taskSchema);