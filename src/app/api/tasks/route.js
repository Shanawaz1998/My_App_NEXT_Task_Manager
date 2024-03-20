import { connectdb } from "@/helper/db";
import { Task } from "@/models/task";
import { NextResponse } from "next/server";

await connectdb();

const intervalId = setTimeout(async () => {
  try {
    const allTask = await Task.find();
    // allTask &&
    allTask.forEach((task) => {
      const nowDate = new Date();
      const nowTime = new Date().toLocaleString("en-US", {
        hour: "numeric",
        minute: "numeric",
        hour12: true,
      });
      console.log(
        "Checking SetInterval add task",
        nowDate > task.dueDate,
        nowTime,
        task.dueTime
      );
    });
  } catch (error) {
    console.log("Error From SetInterval", error);
    return NextResponse.json(error, {
      message: "Something went wrong!!!",
    });
  }
}, 500);

// clearInterval(intervalId);

//Add Task
export const POST = async (request) => {
  const { title, shortDesc, dueDate, dueTime, isCompleted, userId } =
    await request.json();
  const newTask = new Task({
    title,
    shortDesc,
    dueDate,
    dueTime,
    isCompleted,
    userId,
  });
  console.log("From add task api", {
    title,
    shortDesc,
    dueDate,
    dueTime,
    isCompleted,
    userId,
  });

  // const newDate = dueDate.getHours();
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
