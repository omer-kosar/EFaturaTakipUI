export function getUser(state) {
  return state.activeUser;
}

export function getUserName(state) {
  return `${state.activeUser?.firstName} ${state.activeUser?.lastName}`;
}
