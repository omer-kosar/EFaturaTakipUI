import { api } from "boot/axios";

const login = (loginModel) => {
  return api.post("authentication/", { ...loginModel });
};

export { login };
