import client from "./apiClient";
const endpoint = "/register";
const register = async () => {
  const data = new FormData();
  const response = await client.post(endpoint, data);
  return response;
};

export default {
  register,
};
