"use client";
import { sendMsg } from "@/services/msgServices";
import { addTask } from "@/services/taskServices";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

function AddTask() {
  const session = useSession();
  const router = useRouter();
  const [enterMobileno, setEnterMobileno] = useState(false);

  const [task, setTask] = useState({
    title: "",
    shortDesc: "",
    dueDate: new Date(),
    userId: "",
  });

  useEffect(() => {
    if (!session?.data?.user?.mobileno) {
      console.log("Not Credentials", session?.data?.user?.provider);
      setEnterMobileno(true);
    } else {
      console.log("Inside Credentials");
      setEnterMobileno(false);
    }
  }, [session]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Task", session?.data?.user);
    const addedTask = await addTask({
      ...task,
      userId: session?.data?.user?.id,
    });
    if (addedTask) {
      let mobileno = session?.data?.user?.mobileno;
      mobileno = `+91${mobileno}`;
      await sendMsg({ ...task, mobileno });
    }
  };

  // if (enterMobileno) {
  //   return <EnterMobileno />;
  // }

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

            <div className="flex justify-center mb-3">
              <DatePicker
                className="text-center w-full px-24 py-1 text-xl"
                selected={task.dueDate}
                onChange={(event) => {
                  setTask({
                    ...task,
                    dueDate: event,
                  });
                }}
                minDate={new Date()}
              />
            </div>

            {/* <input
              type="date"
              name="dueDate"
              className="my-3 p-2"
              onChange={(event) => {
                setTask({
                  ...task,
                  dueDate: event.target.value,
                });
              }}
            /> */}

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

export default AddTask;
