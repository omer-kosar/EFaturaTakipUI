import { api } from "boot/axios";
const getInboxInvoiceList = (pageIndex = 0, pageSize = 5) =>
  api.get("invoice/inboxInvoiceList");

const approveInboxInvoices = (invoiceIdList) =>
  api.post("invoice/approveInboxInvoices", invoiceIdList);

const declineInboxInvoices = (invoiceIdList) =>
  api.post("invoice/declineInboxInvoices", invoiceIdList);

export { getInboxInvoiceList, approveInboxInvoices, declineInboxInvoices };
