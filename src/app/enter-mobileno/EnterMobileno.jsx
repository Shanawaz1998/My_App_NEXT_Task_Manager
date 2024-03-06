"use client";

import { addMobileNo } from "@/services/userServices";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

function EnterMobileno() {
  const session = useSession();
  const router = useRouter();
  const id = session && session?.data?.user?.id;

  const [mobileno, setMobileno] = useState();

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log("Mobile no.", mobileno);

    try {
      const result = await addMobileNo({ id, mobileno });
      if (result) {
        router.replace("/add-task");
        console.log("Inside result");
      }
    } catch (error) {
      console.log("Error from Enter mobile no. page", error);
    }
  };

  return (
    <div className="grid grid-cols-12 mt-24">
      <div className="col-span-6 col-start-4 border-2 rounded-lg border-gray-600 p-20">
        <h1 className="flex justify-center text-4xl mb-5 font-bold">
          Enter Your Mobile Number for Reminder
        </h1>
        <form onSubmit={handleSubmit}>
          <div className="flex flex-col">
            <input
              type="number"
              name="mobileno"
              placeholder="Enter your Mobie no."
              className="my-3 p-2"
              onChange={(event) => {
                setMobileno(event.target.value);
              }}
            />
            <button
              type="submit"
              className="border-2 border-indigo-100 bg-indigo-200 rounded p-1"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EnterMobileno;
