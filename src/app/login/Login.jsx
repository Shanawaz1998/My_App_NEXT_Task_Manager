"use client";
import { User } from "@/models/users";
import { getAllUsers } from "@/services/userServices";
import { signIn, useSession } from "next-auth/react";
import { Allura } from "next/font/google";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

function Login() {
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState(false);
  const { status } = useSession();

  const router = useRouter();

  useEffect(() => {
    if (status === "authenticated") {
      router.replace("/dashboard");
    }
  }, [status, router]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    // const allUsers = await getAllUsers();
    // console.log("All users from login page", allUsers);
    // const matchedUser = allUsers.filter(
    //   (item) => item.provider !== "credentials"
    // );
    // console.log("mactedusers", matchedUser);

    if (!loginData.password || loginData.password.length < 8) {
      setError("Password is invalid");
      return;
    }
    const res = await signIn("credentials", {
      redirect: false,
      email: loginData.email,
      password: loginData.password,
    });
    console.log("Result", res?.error);

    if (res?.error) {
      setError(res?.error);
    } else {
      setError("");
      if (res?.url) {
        router.push("/dashboard");
      }
    }
  };
  return (
    status !== "authenticated" && (
      <div className="grid grid-cols-12 mt-24">
        <div className="col-span-6 col-start-4 border-2 rounded-lg border-gray-600 p-20">
          <h1 className="flex justify-center text-4xl mb-5 font-bold">
            Login Form
          </h1>
          <form onSubmit={handleSubmit}>
            <div className="flex flex-col">
              <input
                type="email"
                name="email"
                placeholder="Enter your Email"
                className="my-3 p-2"
                onChange={(event) => {
                  setLoginData({
                    ...loginData,
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
                  setLoginData({
                    ...loginData,
                    password: event.target.value,
                  });
                }}
              />

              <Link
                className="text-blue-500 flex justify-center mb-2"
                href={"/register"}
              >
                Don't have an Account
              </Link>
              <h1 className="text-red-700">{error}</h1>
              <button
                type="submit"
                className="border-2 border-indigo-100 bg-indigo-200 rounded p-1"
              >
                Login
              </button>
            </div>
          </form>
          <button onClick={() => signIn("github")}>Sign in with Github</button>
          <button onClick={() => signIn("google")}>Sign in with Google</button>
        </div>
      </div>
    )
  );
}

export default Login;
