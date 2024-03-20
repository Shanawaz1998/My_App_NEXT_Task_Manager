import { NextResponse } from "next/server";
//******Created just for testing setInterval

export const GET = async (request) => {
  try {
    return NextResponse.json(
      {
        message: "GET api request",
      },
      {
        status: 201,
      }
    );
  } catch (error) {
    console.log("Error From BE", error);
    return NextResponse.json(error, {
      message: "Something went wrong!!!",
    });
  }
};
