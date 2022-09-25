import { api } from "boot/axios";
const createInvoice = (invoice) =>
  api.post(`Invoices/CreateInvoice`, { ...invoice });
const getList = () => api.get("invoices/getList");

export { createInvoice, getList };
