const columnsInvoice = [
  {
    name: "invoiceNo",
    required: true,
    label: "FAT. NO/FAT. ID",
    align: "left",
    field: (row) => row.eFaturaNo,
    sortable: true,
  },
  {
    name: "targetVknTckn",
    required: true,
    label: "GÖNDEREN VKN-TCKN/UNVAN",
    align: "left",
    sortable: true,
    field: (row) => row.targetTitle,
  },
  {
    name: "scenario",
    required: true,
    label: "SENARYO/TÜRÜ",
    align: "left",
    sortable: false,
  },
  {
    name: "status",
    required: true,
    label: "DURUMU",
    align: "left",
    sortable: false,
  },
  {
    name: "date",
    required: true,
    label: "DÜZ. TARİHİ",
    align: "left",
    sortable: true,
    field: (row) => row.createDate,
  },
  {
    name: "kdv",
    required: true,
    label: "KDV",
    align: "left",
    sortable: true,
    field: (row) => row.totalTaxF,
  },
  {
    name: "total",
    required: true,
    label: "GENEL TOPLAM",
    align: "left",
    sortable: true,
    field: (row) => row.payableAmount,
    sort: (a, b) => {
      return parseFloat(a, 10) - parseFloat(b, 10);
    },
  },

  {
    name: "actions",
    required: true,
    label: "",
    align: "left",
    sortable: false,
  },
];

const columnsInvoiceMobile = [
  {
    name: "invoiceNo",
    required: true,
    label: "FAT. NO/FAT. ID",
    align: "left",
    field: (row) => row.eFaturaNo,
    sortable: false,
  },
];

export { columnsInvoice, columnsInvoiceMobile };
