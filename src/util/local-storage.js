import { LocalStorage } from "quasar";

const saveItemToStorage = (itemName, data) => {
  LocalStorage.set(itemName, data);
};

const getItemFromStorage = (itemName) => {
  return LocalStorage.getItem(itemName);
  // if (LocalStorage.has(itemName))
  // return {};
};
const removeItemFromStorage = (name) => {
  if (LocalStorage.has(name)) {
    LocalStorage.remove(name);
  }
};
export { saveItemToStorage, getItemFromStorage, removeItemFromStorage };
