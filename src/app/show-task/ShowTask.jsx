"use client";
import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { deleteTask, getTaskByUserId } from "@/services/taskServices";
import Tasks from "./Tasks";
import moment from "moment";
import schedule from "node-schedule";

function ShowTask() {
  const [tasks, setTasks] = useState([]);
  const session = useSession();

  useEffect(() => {
    const userId = session?.data?.user?.id;
    session.data && load(userId);
  }, [session.data]);
  const load = async (userId) => {
    const result = await getTaskByUserId(userId);
    setTasks(result);
    // const dateMatchedTask = tasks.filter((item) => {
    //   //*******Pending********************************
    //   const date = new Date(item.dueDate);
    //   const job = schedule.scheduleJob(date, () => {
    //     console.log("@@@The world is going to end today.");
    //   });
    // });
    // console.log("Matched Date", dateMatchedTask);

    //Time
    // tasks.map((item) => {
    //   console.log("Time", item.dueTime, moment(new Date()).format("hh:mm"));
    // });
  };

  const handleDelete = async (e, taskId) => {
    try {
      const taskDelete = await deleteTask(taskId);
      const newTask = tasks.filter((item) => item._id !== taskId);
      setTasks(newTask);
    } catch (error) {
      console.log("Error from Show Task delete function", error);
    }
  };

  return (
    <>
      {tasks.length === 0 ? (
        <h1 className="text-4xl text-center mt-7">No Task Added</h1>
      ) : (
        <>
          <h1 className="text-center font-bold text-3xl mt-4">
            All Task for you
          </h1>
          {tasks?.map((item) => {
            return (
              <Tasks
                key={item._id}
                item={item}
                handleDelete={(e) => handleDelete(e, item._id)}
              />
            );
          })}
        </>
      )}
    </>
  );
}

export default ShowTask;
