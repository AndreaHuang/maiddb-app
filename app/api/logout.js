import client from "./apiClient";
const endpoint = "/logout";

const logout = async (styleSession) => {
  const data = new FormData();
  const response = await client.post(endpoint, data);
  return response;
};

export default {
  logout,
};
