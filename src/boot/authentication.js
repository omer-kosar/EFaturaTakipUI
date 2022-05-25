import { boot } from "quasar/wrappers";
import { getItemFromStorage } from "src/util/local-storage";

// "async" is optional;
// more info on params: https://v2.quasar.dev/quasar-cli/boot-
const isUserExist = () => {
  let user = getItemFromStorage("user");
  let token = user?.token;

  if (!token || !user) return false;
  return true;
};
const hasUserPermission = (pageAllowedRoles, userRoles) => {
  return true;
};
export default boot(({ app, router }) => {
  router.beforeEach((to, from, next) => {
    let isPageRequiredAuthentication = to.matched.some(
      (route) => route.meta.authorize
    );
    if (isPageRequiredAuthentication) {
      if (!isUserExist()) {
        next("/login");
        return;
      }
      if (!hasUserPermission([], [])) {
        next("/accessdenied");
        return;
      }
    }
    next();
  });
});
