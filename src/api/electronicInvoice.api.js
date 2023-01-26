import { api } from "boot/axios";
const getInboxInvoiceList = (
  pageIndex = 0,
  pageSize = 10,
  baslangicTarihi,
  bitisTarihi
) => {
  let request = `electronicInvoices/inboxInvoiceList?pageIndex=${pageIndex}&pageSize=${pageSize}`;
  if (baslangicTarihi)
    request = `${request}&baslangicTarihi=${baslangicTarihi}`;
  if (bitisTarihi) {
    request = `${request}&bitisTarihi=${bitisTarihi}`;
  }
  return api.get(request);
};
const getOutboxInvoiceList = (
  pageIndex = 0,
  pageSize = 10,
  baslangicTarihi,
  bitisTarihi
) => {
  let request = `electronicInvoices/outBoxInvoiceList?pageIndex=${pageIndex}&pageSize=${pageSize}`;
  if (baslangicTarihi)
    request = `${request}&baslangicTarihi=${baslangicTarihi}`;
  if (bitisTarihi) {
    request = `${request}&bitisTarihi=${bitisTarihi}`;
  }
  return api.get(request);
};

const approveInboxInvoices = (invoiceIdList) =>
  api.post("electronicInvoices/approveInboxInvoices", invoiceIdList);

const declineInboxInvoices = (invoiceIdList) =>
  api.post("electronicInvoices/declineInboxInvoices", invoiceIdList);

const sendInvoiceEMail = (invoiceEMail) =>
  api.post(
    `electronicInvoices/sendMail/${invoiceEMail.invoiceId}`,
    invoiceEMail
  );

const sendOutBoxInvoiceEMail = (invoiceEMail) =>
  api.post(
    `electronicInvoices/SendOutBoxInvoiceMail/${invoiceEMail.invoiceId}`,
    invoiceEMail
  );

const getInboxInvoiceListByCompanyId = (
  companyId,
  pageIndex = 0,
  pageSize = 10,
  baslangicTarihi,
  bitisTarihi
) => {
  let request = `electronicinvoices/getInboxInvoiceListByCompanyId/${companyId}?pageIndex=${pageIndex}&pageSize=${pageSize}`;
  if (baslangicTarihi)
    request = `${request}&baslangicTarihi=${baslangicTarihi}`;
  if (bitisTarihi) {
    request = `${request}&bitisTarihi=${bitisTarihi}`;
  }
  return api.get(request);
};
const getOutboxInvoiceListByCompanyId = (
  companyId,
  pageIndex = 0,
  pageSize = 10,
  baslangicTarihi,
  bitisTarihi
) => {
  let request = `electronicinvoices/getOutboxInvoiceListByCompanyId/${companyId}?pageIndex=${pageIndex}&pageSize=${pageSize}`;
  if (baslangicTarihi)
    request = `${request}&baslangicTarihi=${baslangicTarihi}`;
  if (bitisTarihi) {
    request = `${request}&bitisTarihi=${bitisTarihi}`;
  }
  return api.get(request);
};
const convertInvoiceToElectronicInvoice = (
  invoiceId,
  invoiceScenarioType,
  invoiceType
) =>
  api.get(
    `electronicinvoices/convertInvoiceToElectronicInvoice?invoiceId=${invoiceId}&invoiceScenarioType=${invoiceScenarioType}&invoiceType=${invoiceType}`
  );
export {
  getInboxInvoiceList,
  getOutboxInvoiceList,
  approveInboxInvoices,
  declineInboxInvoices,
  sendInvoiceEMail,
  sendOutBoxInvoiceEMail,
  getInboxInvoiceListByCompanyId,
  getOutboxInvoiceListByCompanyId,
  convertInvoiceToElectronicInvoice,
};
