import { userType } from "src/util/constants";

export function getUser(state) {
  return state.activeUser;
}

export function getUserName(state) {
  return `${state.activeUser?.firstName} ${state.activeUser?.lastName}`;
}

export function getUserId(state) {
  return state.activeUser.id;
}

export function userIsAdmin(state) {
  return state.activeUser.type === userType.admin;
}

export function getUserType(state) {
  return state.activeUser.type;
}
