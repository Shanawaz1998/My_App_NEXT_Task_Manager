"use client";
// import { getServerSession } from "next-auth";
import { signOut, useSession } from "next-auth/react";

import Link from "next/link";
import React from "react";

function CustomNavbar() {
  const session = useSession();
  console.log("Session from navbar", session);

  return (
    <div className="flex justify-between pt-4 pb-4 bg-slate-500">
      <div className="logo ml-6">
        <h1>
          <Link href={"/"}>
            <b>My-App</b>
          </Link>
        </h1>
      </div>
      <div>
        <ul className="flex space-x-4 mr-6">
          <Link href={"/"}>Home</Link>

          {session?.data ? (
            <>
              <Link href={"/"}>{session?.data.user.email}</Link>
              <Link href={"/dashboard"}>Dashboard</Link>
              <Link href={"/add-task"}>Add Task</Link>
              <Link href={"/show-task"}>Show Task</Link>
              <button
                className="border-2 border-indigo-100 bg-gray-400 rounded p-1"
                onClick={() => signOut()}
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link href={"/dashboard"}>Dashboard</Link>
              <Link href={"/login"}>Login</Link>
              <Link href={"/register"}>Register</Link>
            </>
          )}
        </ul>
      </div>
    </div>
  );
}

export default CustomNavbar;
