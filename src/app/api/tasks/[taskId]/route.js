import { connectdb } from "@/helper/db";
import { Task } from "@/models/task";
import { NextResponse } from "next/server";

await connectdb();

export const DELETE = async (request, { params }) => {
  try {
    const taskId = params.taskId;
    const deletedTask = await Task.findByIdAndDelete(taskId);
    return NextResponse.json({
      message: "Task Deleted",
    });
  } catch (error) {
    console.log("Error From Delete Api", error);
    return NextResponse.json(error, {
      message: "Something went wrong!!!",
    });
  }
};
