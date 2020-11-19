import client from "./apiClient";
const endpointLogin = "/api/auth";
const login = ({email,password}) => {

  console.log("request",email);
  const response = client.post(endpointLogin, { email, password });
  return response;
};

export default {
  login,
};
