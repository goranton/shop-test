import Base from "../../layouts/Base";
import routes from "./routes";

export default {
  name: "goods",
  path: "/goods",
  layout: Base,
  routes,
  baseComponent: () =>
    import(/* webpackChunkName: 'goodsBase' */ "./Goods.vue"),
  store: () => import(/* webpackChunkName: 'goodsStore' */ "./store")
};
