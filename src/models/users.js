import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      unique: true,
      required: true,
    },
    password: {
      type: String,
      required: false,
    },
    provider: {
      type: String,
      required: false,
    },
    mobileno: {
      type: Number,
      required: false,
    },
  },
  { timestamps: true }
);

export const User =
  mongoose.models?.users || mongoose.model("users", userSchema);
