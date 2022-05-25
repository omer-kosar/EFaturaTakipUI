import { api } from "boot/axios";

const createUser = (userModel) => {
  return api.post("user/", { ...userModel });
};

export { createUser };
