"use client";
import { getSession, signOut, useSession } from "next-auth/react";

import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useEffect, useReducer, useState } from "react";

function CustomNavbar() {
  const session = useSession();

  const pathName = usePathname();
  const [mobileno, setMobileno] = useState(
    session && session?.data?.user?.mobileno
  );

  const gets = async () => {
    const session1 = await getSession();
    setMobileno(session1?.user?.mobileno);
    console.log("Session 1 from navbar", session1);
  };

  useEffect(() => {
    gets();
  }, [pathName]);
  console.log("Session from navbar", session);
  // useEffect(() => {
  //   if (session) {
  //     setMobileno(session?.data?.user?.mobileno);
  //   }
  // }, [session]);
  // console.log("Session from navbar", session, mobileno);

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
              {!mobileno ? (
                <Link href={"/enter-mobileno"}>Mobile no.</Link>
              ) : (
                <Link href={"/add-task"}>Add task</Link>
              )}
              {/* <Link href={updatedlink}>Add Task</Link> */}
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
