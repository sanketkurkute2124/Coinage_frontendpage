    import api from "./api";

export const register = async (data) => {
  const response = await api.post("/Customer/RegisterCustomer", data);
  return response.data;
};

export const login = async (data) => {
  const response = await api.post("/Customer/Login", data);
  return response.data;
};