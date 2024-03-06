import { NextResponse } from "next/server";

export const POST = async (request) => {
  const { title, shortDesc, mobileno } = await request.json();
  console.log("Data", title, shortDesc, mobileno);

  try {
    // const client = require("twilio")(
    //   process.env.TWILIO_ACCOUNT_SID,
    //   process.env.TWILIO_TOKEB
    // );
    // client.messages
    //   .create({
    //     body: data.title,
    //     from: process.env.TWILIO_PHONE_NO,
    //     to: "+918356817047",
    //   })
    //   .then((message) => console.log(message.sid))
    //   .done();
    return NextResponse.json(
      {
        message: "msg sent",
      },
      {
        status: 201,
      }
    );
  } catch (error) {
    console.log("Error From msg send api", error);
    return NextResponse.json(error, {
      message: "Something went wrong!!!",
    });
  }
};
