import httpAxios from "@/helper/httpAxios";

export const sendMsg = async (data) => {
  const result = await httpAxios
    .post("/api/sendMsg", data)
    .then((response) => response.data);
  return result;
};
