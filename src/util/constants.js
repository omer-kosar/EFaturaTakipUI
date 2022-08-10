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
  Corporate: 2,
};
const mapUserType = new Map([
  [userType.admin, "Admin"],
  [userType.taxPayer, "Mükellef"],
  [userType.accountant, "Muhasebeci"],
]);

export { userType, mapUserType, TaxValueAdded, Unit, CompanyType };
