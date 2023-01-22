import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router";
import SearchLoginView from "../views/SearchLogin.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "SearchLogin",
    component: SearchLoginView,
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
