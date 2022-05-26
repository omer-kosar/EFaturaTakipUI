/*
export function someAction (context) {
}
*/
export function setUser({ commit }, user) {
  return new Promise((resolve) => {
    commit("SET_USER", user);
    resolve();
  });
}
