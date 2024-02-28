import { connectdb } from "@/helper/db";
import { Task } from "@/models/task";
import { NextResponse } from "next/server";

await connectdb();

//Add Task
export const POST = async (request) => {
  const { title, shortDesc, dueDate, userId } = await request.json();
  const newTask = new Task({ title, shortDesc, dueDate, userId });
  console.log("From add task api", { title, shortDesc, dueDate, userId });
  try {
    await newTask.save();
    return NextResponse.json(newTask, {
      status: 201,
    });
  } catch (error) {
    console.log("Error From Adding task", error);
    return NextResponse.json(error, {
      message: "Something went wrong!!!",
    });
  }
};

//Get all the task
export const GET = async () => {
  try {
    const allTask = await Task.find();
    return NextResponse.json(allTask, {
      status: 201,
    });
  } catch (error) {
    console.log("Error From Getting task", error);
    return NextResponse.json(error, {
      message: "Something went wrong!!!",
    });
  }
};
