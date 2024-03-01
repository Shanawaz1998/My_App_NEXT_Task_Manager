import httpAxios from "@/helper/httpAxios";

export const addTask = async (task) => {
  const result = await httpAxios
    .post("/api/tasks", task)
    .then((response) => response.data);
  return result;
};

export const getTaskByUserId = async (userId) => {
  console.log("User id from service", userId);
  const result = await httpAxios
    .get(`/api/user/${userId}/task`)
    .then((response) => response.data);
  return result;
};

export const deleteTask = async (taskId) => {
  const result = await httpAxios
    .delete(`/api/tasks/${taskId}`)
    .then((response) => response.data);
  return result;
};
