"use client";
import { addUser } from "@/services/userServices";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

function page() {
  const router = useRouter();
  const [data, setData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log("Submitted", data);

    if (data.password.length < 8) {
      setError("password length error");
      console.log("password length error");
      return;
    }
    try {
      const result = await addUser(data);
      if (result) {
        setError("");
        router.push("/login");
      }
    } catch (error) {
      setError(error.response.data.message);
      console.log(
        "Error from registration page--",
        error.response.data.message
      );
    }
  };

  return (
    <div className="grid grid-cols-12 mt-24">
      <div className="col-span-6 col-start-4 border-2 rounded-lg border-gray-600 p-20">
        <h1 className="flex justify-center text-4xl mb-5 font-bold">
          Registration Form
        </h1>
        <form onSubmit={handleSubmit}>
          <div className="flex flex-col">
            <input
              type="email"
              name="email"
              placeholder="Enter your Email"
              className="my-3 p-2"
              onChange={(event) => {
                setData({
                  ...data,
                  email: event.target.value,
                });
              }}
            />
            <input
              type="password"
              name="password"
              placeholder="Enter Password"
              className="my-3 p-2"
              onChange={(event) => {
                setData({
                  ...data,
                  password: event.target.value,
                });
              }}
            />
            <h1 className="text-red-700">{error}</h1>
            <button
              type="submit"
              className="border-2 border-indigo-100 bg-indigo-200 rounded p-1"
            >
              Register
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default page;
