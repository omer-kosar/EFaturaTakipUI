import { Role } from "src/constants/user/role";
import { userType } from "src/util/constants";

const routes = [
  {
    path: "/",
    component: () => import("layouts/MainLayout.vue"),
    children: [
      {
        path: "",
        component: () => import("pages/Index.vue"),
        // meta: { authorize: [] },
      },
      {
        path: "/saveUser/:id?",
        component: () => import("pages/SaveUser.vue"),
        name: "save-user",
        meta: { permissions: [userType.admin] },
      },
      {
        path: "/userlist",
        component: () => import("pages/UserList.vue"),
        meta: { permissions: [userType.admin] },
        name: "user-list",
      },
      {
        path: "/inboxinvoicelist",
        component: () => import("pages/InboxInvoiceList.vue"),
        meta: { permissions: [userType.taxPayer] },
      },
      {
        path: "/outboxinvoicelist",
        component: () => import("pages/OutBoxInvoiceList.vue"),
        meta: { permissions: [userType.taxPayer] },
      },

      {
        path: "/financialadvisorinboxinvoicelist",
        component: () => import("src/pages/InboxInvoiceListByCompanies.vue"),
        meta: {
          permissions: [userType.admin, userType.accountant],
        },
      },
      {
        path: "/outboxinvoicelistbycompanies",
        component: () => import("src/pages/OutboxInvoiceListByCompanies.vue"),
        meta: {
          permissions: [userType.admin, userType.accountant],
        },
      },

      {
        path: "/showInvoice",
        component: () => import("pages/ShowInvoice.vue"),
        // meta: { authorize: [] },
      },

      {
        path: "/saveStock/:id?",
        component: () => import("pages/SaveStock.vue"),
        name: "save-stock",
        meta: { permissions: [userType.taxPayer] },
      },

      {
        path: "/saveCompany/:id?",
        component: () => import("pages/SaveCompany.vue"),
        name: "save-company",
        meta: {
          permissions: [userType.admin, userType.taxPayer],
        },
      },

      {
        path: "/stocklist",
        component: () => import("pages/StockList.vue"),
        meta: { permissions: [userType.taxPayer] },
        name: "stock-list",
      },

      {
        path: "/companylist",
        component: () => import("pages/CompanyList.vue"),
        meta: { permissions: [userType.admin] },
        name: "company-list",
      },

      {
        path: "/customerlist",
        component: () => import("pages/CustomerList.vue"),
        meta: { permissions: [userType.taxPayer] },
        name: "customer-list",
      },

      {
        path: "/finiancialadvisor",
        component: () => import("pages/MatchCompanyAndAdvisor.vue"),
        meta: { permissions: [userType.admin] },
        name: "match-company-advisor",
      },
      {
        path: "/accessdenied",
        component: () => import("pages/AccessDenied.vue"),
      },
      {
        path: "/changepassword",
        component: () => import("pages/ChangePassword.vue"),
        meta: {
          permissions: [userType.admin, userType.taxPayer, userType.accountant],
        },
        name: "change-password",
      },
      {
        path: "/companyinfo",
        component: () => import("pages/CompanyInfo.vue"),
        meta: {
          permissions: [userType.admin, userType.taxPayer, userType.accountant],
        },
        name: "company-info",
      },
    ],
  },
  { path: "/login", name: "login", component: () => import("pages/Login.vue") },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: "/:catchAll(.*)*",
    component: () => import("pages/Error404.vue"),
  },
];

export default routes;
