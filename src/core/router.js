import Vue from "vue";
import VueRouter from "vue-router";

export function getRouterInstance(
  base = process.env.BASE_URL,
  mode = "history",
  options = {}
) {
  Vue.use(VueRouter);
  return new VueRouter({
    mode,
    base,
    ...options
  });
}
