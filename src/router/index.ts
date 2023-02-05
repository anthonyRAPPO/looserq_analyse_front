import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router";
import SearchLoginView from "../views/SearchLogin.vue";
import DisplayGamesView from "../views/DisplayGames.vue";
import DisplayStatsView from "../views/DisplayStats.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "SearchLogin",
    component: SearchLoginView,
  },
  {
    path: "/",
    name: "DisplayGames",
    component: DisplayGamesView,
  },
  {
    path: "/",
    name: "DisplayStats",
    component: DisplayStatsView,
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
