import { connectdb } from "@/helper/db";
import { User } from "@/models/users";
import { NextResponse } from "next/server";

//Get user by id
export const GET = async (request, { params }) => {
  await connectdb();
  const userId = params.userId;
  try {
    const user = await User.findById(userId);
    return NextResponse.json(user, {
      status: 201,
    });
  } catch (error) {
    console.log("Error From registration", error);
    return NextResponse.json(error, {
      message: "Something went wrong!!!",
    });
  }
};
