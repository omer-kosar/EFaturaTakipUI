import { Role } from "src/constants/user/role";

const routes = [
  {
    path: "/",
    component: () => import("layouts/MainLayout.vue"),
    children: [
      {
        path: "",
        component: () => import("pages/Index.vue"),
        meta: { authorize: [Role.Admin] },
      },

      {
        path: "/userlist",
        component: () => import("pages/UserList.vue"),
        meta: { authorize: [Role.Admin] },
      },
      {
        path: "/inboxinvoicelist",
        component: () => import("pages/InboxInvoiceList.vue"),
        meta: { authorize: [Role.Admin] },
      },

      {
        path: "/showInvoice",
        component: () => import("pages/ShowInvoice.vue"),
        meta: { authorize: [Role.Admin] },
      },

      {
        path: "/saveStock/:id?",
        component: () => import("pages/SaveStock.vue"),
        name: "save-stock",
        meta: { authorize: [Role.Admin] },
      },
      {
        path: "/stocklist",
        component: () => import("pages/StockList.vue"),
        meta: { authorize: [Role.Admin] },
      },
    ],
  },
  { path: "/login", component: () => import("pages/Login.vue") },
  { path: "/accessdenied", component: () => import("pages/AccessDenied.vue") },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: "/:catchAll(.*)*",
    component: () => import("pages/Error404.vue"),
  },
];

export default routes;
