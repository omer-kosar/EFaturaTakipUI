import { api } from "boot/axios";
const getInboxInvoiceList = (pageIndex = 0, pageSize = 5) =>
  api.get("invoices/inboxInvoiceList");

const approveInboxInvoices = (invoiceIdList) =>
  api.post("invoices/approveInboxInvoices", invoiceIdList);

const declineInboxInvoices = (invoiceIdList) =>
  api.post("invoices/declineInboxInvoices", invoiceIdList);

const sendInvoiceEMail = (invoiceEMail) =>
  api.post(`invoices/sendMail/${invoiceEMail.invoiceId}`, invoiceEMail);
const getInboxInvoiceListByCompanyId = (
  companyId,
  pageIndex = 0,
  pageSize = 10
) =>
  api.get(
    `invoices/getInboxInvoiceListByCompanyId/${companyId}?pageIndex=${pageIndex}&pageSize=${pageSize}`
  );

export {
  getInboxInvoiceList,
  approveInboxInvoices,
  declineInboxInvoices,
  sendInvoiceEMail,
  getInboxInvoiceListByCompanyId,
};
