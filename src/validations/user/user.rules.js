const rulesFirstName = (val) => (val && val.length > 0) || "Ad boş olamaz";

const rulesLastName = (val) => (val && val.length > 0) || "Ad boş olamaz";

const rulesPhone = (val) => (val && val.length > 0) || "Telefon boş olamaz";

const rulesPassword = (val) => (val && val.length > 0) || "Şifre boş olamaz";

export { rulesFirstName, rulesLastName, rulesPhone, rulesPassword };
