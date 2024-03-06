import httpAxios from "@/helper/httpAxios";

export const addUser = async (user) => {
  const result = await httpAxios
    .post("/api/user", user)
    .then((response) => response.data);
  return result;
};

export const getAllUsers = async () => {
  const result = await httpAxios
    .get("/api/user")
    .then((response) => response.data);
  return result;
};

export const addMobileNo = async (userData) => {
  const result = await httpAxios
    .put("/api/user", userData)
    .then((response) => response.data);
  return result;
};
