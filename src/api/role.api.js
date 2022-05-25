import { api } from "boot/axios";
const getRoles = () => api.get("roles/");

export { getRoles };
