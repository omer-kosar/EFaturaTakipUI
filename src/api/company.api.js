import { api } from "boot/axios";

const createCompany = (company) => api.post(`Companies/CreateCompany`, company);
const updateCompany = (companyId, company) =>
  api.put(`Companies/${companyId}`, company);

const getList = () => api.get("Companies/getList");
const companyDelete = (id) => api.delete(`Companies/delete/${id}`);
const getCompanyItem = (id) => api.get(`Companies/${id}`);
const getCompanyTitle = (vergiNo) =>
  api.get(`Companies/getCompanyTitle?vergiNo=${vergiNo}`);
export {
  createCompany,
  getList,
  companyDelete,
  getCompanyItem,
  updateCompany,
  getCompanyTitle,
};
