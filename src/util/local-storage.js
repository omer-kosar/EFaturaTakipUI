import { LocalStorage } from "quasar";

const saveItemToStorage = (itemName, data) => {
  LocalStorage.set(itemName, data);
};

const getItemFromStorage = (itemName) => {
  if (LocalStorage.has(itemName)) return LocalStorage.getItem(itemName);
  return {};
};
export { saveItemToStorage, getItemFromStorage };
