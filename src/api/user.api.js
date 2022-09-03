import { api } from "boot/axios";

const createUser = (userModel) => {
  return api.post("user/", { ...userModel });
};
const getList = () => api.get("user/getList");
const updateUser = (userId, user) => api.put(`user/${userId}`, user);
const getUserItem = (id) => api.get(`user/${id}`);
const userDelete = (id) => api.delete(`user/delete/${id}`);
const searchFinancialAdvisor = (name) =>
  api.get(`user/searchfinancialadvisor?name=${name}`);
const changeFinancialAdvisor = (advisorId, companyId) =>
  api.get(
    `user/changeFinancialAdvisor?advisorId=${advisorId}&companyId=${companyId}`
  );
export {
  createUser,
  getList,
  updateUser,
  getUserItem,
  userDelete,
  searchFinancialAdvisor,
  changeFinancialAdvisor,
};
