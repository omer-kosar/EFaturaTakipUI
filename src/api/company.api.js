import { api } from "boot/axios";

  const createCompany = (company) => api.post(`Companies/CreateCompany`, company);
const updateCompany = (companyId, company) =>
  api.put(`Companies/${companyId}`, company);

const getList = () => api.get("Companies/getList");
const getCompanies = () => api.get("Companies/getCompanies");
const getCustomerList = () => api.get("Companies/getcustomerlist");
const companyDelete = (id) => api.delete(`Companies/delete/${id}`);
const getCompanyItem = (id) => api.get(`Companies/${id}`);
const getAdvisorCompanies = (id) =>
  api.get(`Companies/GetAdvisorCompanies/${id}`);
const getCompanyTitle = (vergiNo) =>
  api.get(`Companies/getCompanyTitle?vergiNo=${vergiNo}`);
const search = (name, count) => {
  if (count)
    return api.get(`Companies/searchcompany?name=${name}&count=${count}`);
  return api.get(`Companies/searchcompany?name=${name}`);
};
const searchCustomer = (name, count) => {
  if (count)
    return api.get(`Companies/SearchCustomer?name=${name}&count=${count}`);
  return api.get(`Companies/SearchCustomer?name=${name}`);
};

const changeCompaniesAdvisor = (advisorId, companyList) =>
  api.post(`Companies/changeCompaniesAdvisor/${advisorId}`, companyList);

export {
  createCompany,
  getList,
  companyDelete,
  getCompanyItem,
  updateCompany,
  getCompanyTitle,
  search,
  searchCustomer,
  getCustomerList,
  getAdvisorCompanies,
  getCompanies,
  changeCompaniesAdvisor,
};
