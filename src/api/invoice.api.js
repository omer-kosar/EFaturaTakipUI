import { api } from "boot/axios";
const createInvoice = (invoice) =>
  api.post(`Invoices/CreateInvoice`, { ...invoice });
const getList = () => api.get("invoices/getList");
const getInvoiceItemList = (invoiceId) =>
  api.get(`invoices/getInvoiceItems/${invoiceId}`);
const invoiceDelete = (id) => api.delete(`invoices/delete/${id}`);
export { createInvoice, getList, invoiceDelete, getInvoiceItemList };
