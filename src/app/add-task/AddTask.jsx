"use client";
import { sendMsg } from "@/services/msgServices";
import { addTask } from "@/services/taskServices";
import { useSession } from "next-auth/react";
import { getServerSession } from "next-auth/next";
import React, { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
// import { scheduleJob } from "node-schedule";
import schedule from "node-schedule";
// const schedule = require("node-schedule");
import Datetime from "react-datetime";
import "react-datetime/css/react-datetime.css";
import moment from "moment";
import DateTimePicker from "react-datetime-picker";

function AddTask() {
  const { data: session, status } = useSession();
  const [remindAt, setRemindAt] = useState();
  const [task, setTask] = useState({
    title: "",
    shortDesc: "",
    dueDate: new Date(),
    dueTime: "",
    isCompleted: false,
    userId: "",
  });
  console.log("Task from add task", task);

  // useEffect(() => {
  //   if (!session?.user?.mobileno) {
  //     console.log("Not Credentials", session?.user?.provider);
  //   } else {
  //     console.log("Inside Credentials");
  //   }
  // }, [session]);

  // const substractHours = (date, hours, min) => {
  //   date.setHours(date.getHours() - hours);
  //   date.setMinutes(date.getMinutes() - min);
  //   return date;
  // };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // const newDate = substractHours(task.dueDate, 5, 30);
    const addedTask = await addTask({
      ...task,
      userId: session?.user?.id,
    });
    // if (addedTask) {
    //   let mobileno = session?.user?.mobileno;
    //   mobileno = `+91${mobileno}`;
    //   await sendMsg({ ...task, mobileno });
    // }
  };

  // if (enterMobileno) {
  //   return <EnterMobileno />;
  // }

  // const date = new Date(Date.now() + 500);
  // const job = schedule.scheduleJob(date, () => {
  // console.log("@@@The world is going to end today.");
  // });

  if (status === "authenticated") {
    return (
      <div className="grid grid-cols-12 mt-24">
        <div className="col-span-6 col-start-4 border-2 rounded-lg border-gray-600 p-20">
          <h1 className="flex justify-center text-4xl mb-5 font-bold">
            Add Your Task
          </h1>
          <form onSubmit={handleSubmit}>
            <div className="flex flex-col">
              <input
                type="text"
                name="task"
                placeholder="Enter your Task"
                className="my-3 p-2"
                onChange={(event) => {
                  setTask({
                    ...task,
                    title: event.target.value,
                  });
                }}
              />
              <input
                type="text"
                name="shortDesc"
                placeholder="Enter Your Task Description(Optional)"
                className="my-3 p-2"
                onChange={(event) => {
                  setTask({
                    ...task,
                    shortDesc: event.target.value,
                  });
                }}
              />
              <input
                type="date"
                onChange={(event) => {
                  setTask({
                    ...task,
                    dueDate: event.target.value,
                  });
                }}
              />
              <input
                type="time"
                onChange={(event) => {
                  const newTime = event.target.value;
                  console.log("New Time", newTime);
                  setTask({
                    ...task,
                    dueTime: event.target.value,
                  });
                }}
              />
              <button
                type="submit"
                className="border-2 border-indigo-100 bg-indigo-200 rounded p-1"
              >
                Add Task
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }
  return <h1>Please Login first</h1>;
}

export default AddTask;
