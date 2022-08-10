import { api } from "boot/axios";

const createCompany = (company) => api.post(`Companies/CreateCompany`, company);
const updateCompany = (companyId, company) =>
  api.put(`Companies/${companyId}`, company);

const getList = () => api.get("Companies/getList");
const companyDelete = (id) => api.delete(`Companies/delete/${id}`);
const getCompanyItem = (id) => api.get(`Companies/${id}`);
export { createCompany, getList, companyDelete, getCompanyItem, updateCompany };
