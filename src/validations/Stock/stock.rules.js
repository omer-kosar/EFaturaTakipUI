const rulesName = (val) => (val && val.length > 0) || "Stok adı boş olamaz.";
const rulesPrice = (val) => (val && val.length > 0) || "Fiyat boş olamaz.";
const rulesUnit = (val) => {
  val = val.toString();
  if (val && val.length > 0) return "";
  return "birim boş olamaz--";
};
// const rulesUnit = (val) => (val && val.length > 0) || "Birim boş olamaz.";
const rulesValueAddedTax = (val) => {
  val = val.toString();
  if (val && val.length > 0) return "";
  return "KDV boş olamaz.";
};

export { rulesName, rulesPrice, rulesUnit, rulesValueAddedTax };
