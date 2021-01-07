import Base from "../../layouts/Base";
import routes from "./routes";

export default {
  name: "basket",
  path: "/basket",
  layout: Base,
  routes,
  baseComponent: () =>
    import(/* webpackChunkName: 'basketBase' */ "./Basket.vue"),
  store: () => import(/* webpackChunkName: 'basketStore' */ "./store")
};
