"use client";
import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { getTaskByUserId } from "@/services/taskServices";
import Tasks from "./tasks";

function ShowTask() {
  const [tasks, setTasks] = useState([]);
  const session = useSession();

  useEffect(() => {
    const userId = session?.data?.user?.id;
    console.log("Session from show task", session);
    session.data && load(userId);
  }, [session.data]);
  const load = async (userId) => {
    const result = await getTaskByUserId(userId);
    setTasks(result);
    console.log("Result from show task", result);
  };

  return (
    <>
      <h1 className="text-center font-bold text-3xl mt-4">All Task for you</h1>
      {tasks?.map((item) => {
        return <Tasks key={item._id} item={item} />;
      })}
    </>
  );
}

export default ShowTask;
