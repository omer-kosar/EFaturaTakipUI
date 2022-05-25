const userType = {
  admin: 1,
  taxPayer: 2,
  accountant: 3,
};

const mapUserType = new Map([
  [userType.admin, "Admin"],
  [userType.taxPayer, "Mükellef"],
  [userType.accountant, "Muhasebeci"],
]);

export { userType, mapUserType };
