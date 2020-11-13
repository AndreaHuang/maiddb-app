import client from "./apiClient";
const endpointLogin = "/login";
const login = (id, password) => {
  const response = client.post(endpointLogin, { id, password });
  return response;
};

export default {
  login,
};
