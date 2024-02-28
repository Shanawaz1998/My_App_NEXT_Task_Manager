import mongoose from "mongoose";

const taskSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    shortDesc: {
      type: String,
      required: false,
    },
    dueDate: {
      type: Date,
      required: true,
    },
    userId: {
      type: mongoose.ObjectId,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export const Task =
  mongoose.models.tasks || mongoose.model("tasks", taskSchema);
