import { api } from "boot/axios";
const createInvoice = (invoice) =>
  api.post(`Invoices/CreateInvoice`, { ...invoice });
const getList = () => api.get("invoices/getList");
const getInvoiceItemList = (invoiceId) =>
  api.get(`invoices/getInvoiceItems/${invoiceId}`);

const invoiceDelete = (id) => api.delete(`invoices/delete/${id}`);

const getInvoice = (invoiceId) => api.get(`invoices/getInvoice/${invoiceId}`);
const updateInvoice = (invoiceId, invoice) =>
  api.put(`invoices/${invoiceId}`, invoice);
export {
  createInvoice,
  getList,
  invoiceDelete,
  getInvoiceItemList,
  getInvoice,
  updateInvoice,
};
