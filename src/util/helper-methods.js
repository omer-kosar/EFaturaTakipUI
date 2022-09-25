const convertDecimal = (value) => {
  value = value.toString().replace(/,/g, ".");
  if (!isNaN(value)) {
    return Number.parseFloat(Number.parseFloat(value).toFixed(2));
  }

  return value;
};
function formatMoney(price) {
  var currency_symbol = "₺";

  var formattedOutput = new Intl.NumberFormat("tr-TR", {
    style: "currency",
    currency: "TRY",
    minimumFractionDigits: 2,
  });

  return (
    formattedOutput.format(price).replace(currency_symbol, "") +
    " " +
    currency_symbol
  );
}

const formatDate = (val) => {
  if (val === undefined || val === "" || val === null) return "";
  return val.split(".").reverse().join("-");
};
export { convertDecimal, formatMoney, formatDate };
