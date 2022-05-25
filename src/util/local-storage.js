import { LocalStorage } from "quasar";

const saveItemToStorage = (itemName, data) => {
  LocalStorage.set(itemName, data);
};

const getItemFromStorage = (itemName) => {
  return LocalStorage.getItem(itemName);
  // if (LocalStorage.has(itemName))
  // return {};
};
export { saveItemToStorage, getItemFromStorage };
