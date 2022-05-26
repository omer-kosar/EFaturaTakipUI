import { getItemFromStorage } from "src/util/local-storage";

export default function () {
  let savedUser = getItemFromStorage("user");
  return {
    activeUser: savedUser || {},
  };
}
