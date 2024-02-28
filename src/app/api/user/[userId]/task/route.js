import { connectdb } from "@/helper/db";
import { Task } from "@/models/task";
import { NextResponse } from "next/server";

await connectdb();

export const GET = async (request, { params }) => {
  const userId = params.userId;
  try {
    const tasks = await Task.find({ userId: userId });

    return NextResponse.json(tasks, {
      status: 201,
    });
  } catch (error) {
    console.log("Error From registration", error);
    return NextResponse.json(error, {
      message: "Something went wrong!!!",
    });
  }
};
