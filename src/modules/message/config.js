export default {
  name: "message",
  isStatic: true,
  store: () => import(/* webpackChunkName: 'goodsStore' */ "./store")
};
