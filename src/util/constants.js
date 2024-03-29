const userType = {
  admin: 1,
  taxPayer: 2,
  accountant: 3,
};
const TaxValueAdded = {
  OnSekiz: 18,
  Sekiz: 8,
  Bir: 1,
  Sifir: 0,
};
const Unit = {
  Piece: 0,
  Kilogram: 1,
  Metre: 2,
};

const CompanyType = {
  Person: 1,
  PrivateCompany: 2,
  Corporate: 3,
};
const mapUserType = new Map([
  [userType.admin, "Admin"],
  [userType.taxPayer, "Mükellef"],
  [userType.accountant, "Muhasebeci"],
]);

const companyMenu = [
  {
    title: "Gelen Elektronik Faturalar",
    icon: "receipt_long",
    routeLink: "/inboxinvoicelist",
  },
  {
    title: "Giden Elektronik Faturalar",
    icon: "receipt_long",
    routeLink: "/outboxinvoicelist",
  },
  {
    title: "Fatura Listesi",
    icon: "receipt_long",
    routeLink: "/invoicelist",
  },

  {
    title: "Firma Kaydet",
    icon: "add_business",
    routeLink: "/savecompany",
  },

  {
    title: "Fatura Kaydet",
    icon: "post_add",
    routeLink: "/saveinvoice",
  },
  {
    title: "Firma Listesi",
    icon: "view_list",
    routeLink: "/customerlist",
  },
  {
    title: "Stok Kaydet",
    icon: "local_grocery_store",
    routeLink: "/savestock",
  },
  {
    title: "Stok Listesi",
    icon: "view_list",
    routeLink: "/stocklist",
  },
  {
    title: "Firma Bilgileri",
    icon: "info",
    routeLink: "/companyinfo",
  },
];
const adminMenu = [
  {
    title: "Gelen Faturalar",
    icon: "receipt_long",
    routeLink: "/financialadvisorinboxinvoicelist",
  },

  {
    title: "Giden Faturalar",
    icon: "receipt_long",
    routeLink: "/outboxinvoicelistbycompanies",
  },
  {
    title: "Kullanıcı Kaydet",
    icon: "person_add",
    routeLink: "/saveuser",
  },
  {
    title: "Kullanıcı Listesi",
    icon: "view_list",
    routeLink: "/userlist",
  },
  {
    title: "Firma Kaydet",
    icon: "add_business",
    routeLink: "/savecompany",
  },
  {
    title: "Firma Listesi",
    icon: "view_list",
    routeLink: "/companylist",
  },
  {
    title: "Firma Müşavir Eşleştir",
    icon: "swap_horiz",
    routeLink: "/finiancialadvisor",
  },
];
const finiancialadvisorMenu = [
  {
    title: "Gelen Faturalar",
    icon: "receipt_long",
    routeLink: "/financialadvisorinboxinvoicelist",
  },

  {
    title: "Giden Faturalar",
    icon: "receipt_long",
    routeLink: "/outboxinvoicelistbycompanies",
  },
];
const guessMenu = [
  {
    title: "Giriş Yap",
    icon: "login",
    routeLink: "/login",
  },
];
const currencyOptions = {
  precision: 2,
  prefix: "₺ ",
  suffix: "",
  decimal: ",",
  thousand: ".",
  acceptNegative: false,
  isInteger: false,
};
const taxValueOptions = [
  { label: "%18", value: TaxValueAdded.OnSekiz },
  { label: "%8", value: TaxValueAdded.Sekiz },
  { label: "%1", value: TaxValueAdded.Bir },
  { label: "%0", value: TaxValueAdded.Sifir },
];
const invoiceScenarioType = {
  baseInvoice: 0,
  comercialInvoice: 1,
  invoiceWithPassanger: 2,
  export: 3,
  eArchive: 4,
  hal: 5,
  kamu: 6,
};
const invoiceScenarioTypeOptions = [
  { label: "Temel", value: invoiceScenarioType.baseInvoice },
  { label: "Ticari", value: invoiceScenarioType.comercialInvoice },
  { label: "Yolcu", value: invoiceScenarioType.invoiceWithPassanger },
  { label: "İhracat", value: invoiceScenarioType.export },
  { label: "E-Arşiv", value: invoiceScenarioType.eArchive },
  { label: "Hal", value: invoiceScenarioType.hal },
  { label: "Kamu", value: invoiceScenarioType.kamu },
];
const invoiceType = {
  satis: 0,
  idade: 1,
  tevkifat: 2,
  istisna: 3,
  ozelMatrah: 4,
  ihracKayitli: 6,
  sgk: 7,
  komisyoncu: 8,
  tevkifatIade: 11,
};
const invoiceTypeOptions = [
  { label: "Seçiniz", value: "" },
  { label: "Satış", value: invoiceType.satis },
  { label: "İade", value: invoiceType.idade },
  { label: "Tevkifat", value: invoiceType.tevkifat },
  { label: "İstisna", value: invoiceType.istisna },
  { label: "Özel Matrah", value: invoiceType.ozelMatrah },
  { label: "İhraç Kayıtlı", value: invoiceType.ihracKayitli },
  { label: "Sgk", value: invoiceType.sgk },
  { label: "Komisyoncu", value: invoiceType.komisyoncu },
  { label: "Tevkifat İade", value: invoiceType.tevkifatIade },
];
export {
  userType,
  mapUserType,
  TaxValueAdded,
  Unit,
  CompanyType,
  companyMenu,
  adminMenu,
  finiancialadvisorMenu,
  guessMenu,
  currencyOptions,
  taxValueOptions,
  invoiceScenarioType,
  invoiceTypeOptions,
  invoiceType,
  invoiceScenarioTypeOptions,
};
