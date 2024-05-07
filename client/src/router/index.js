import Vue from "vue";
import VueRouter from "vue-router";
import store from "../store";

Vue.use(VueRouter);

const routes = [
  {
    path: "/index",
    name: "index",
    component: () => import("../views/index.vue"),
    meta: {
      requiresAuth: false,
    },
  },
  {
    path: "/",
    name: "SignUp",
    component: () => import("../views/sign/up/index.vue"),
    meta: {
      requiresAuth: false,
    },
  },
  {
    path: "/signin",
    name: "SignIn",
    component: () => import("../views/sign/in/index.vue"),
    meta: {
      requiresAuth: false,
    },
  },
  {
    path: "/setup",
    name: "Setuppage",
    component: () => import("../views/sign/up/setup.vue"),
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/companies",
    name: "Companies",
    component: () => import("../views/homePage/companiesPage/index.vue"),
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/bills",
    name: "Bills",
    component: () => import("../views/homePage/billsPage/index.vue"),
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/contracts",
    name: "Contracts",
    component: () => import("../views/homePage/contractsPage/index.vue"),
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/users",
    name: "Users",
    component: () => import("../views/homePage/usersPage/index.vue"),
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/settings",
    name: "Settings",
    component: () => import("../views/homePage/settingsPage/index.vue"),
    meta: {
      requiresAuth: true,
    },
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach((to, from, next) => {
  const isLoggedIn = !!store.state.userToken && !!store.state.myCompanyToken;
  const localStorageUserToken = localStorage.getItem("userToken");
  const localStorageCompanyToken = localStorage.getItem("companyToken");
  const localStorageAuthorityId = localStorage.getItem("authorityId");
  if (
    !!localStorageUserToken &&
    !!localStorageCompanyToken &&
    !!localStorageAuthorityId &&
    !isLoggedIn &&
    to.meta.requiresAuth === false
  ) {
    console.log("İF İÇİNDE");
  } else {
    console.log("ELSE İÇİNDE");
    return next();
  }
  if (to.meta.requiresAuth === false && isLoggedIn) {
    store.dispatch("clearAuth");
    return next({ name: "SignIn" });
  }
  if (to.meta.requiresAuth && !isLoggedIn) {
    return next({ name: "SignIn" });
  }
  next();
});

export default router;
