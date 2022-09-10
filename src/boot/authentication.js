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
const hasUserPermission = (pageAllowedPermissions, user) => {
  return pageAllowedPermissions.some((userType) => userType === user.type);
};
export default boot(({ app, router }) => {
  router.beforeEach((to, from, next) => {
    let isPageRequiredAuthentication = to.matched.some(
      (route) => route.meta.permissions
    );
    if (isPageRequiredAuthentication) {
      let user = getItemFromStorage("user");
      if (!isUserExist() && to.name != "login") {
        next("/login");
        return false;
      }
      if (!hasUserPermission(to.meta.permissions, user)) {
        next("/accessdenied");
        return false;
      }
    }
    next();
  });
});
