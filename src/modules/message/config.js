export default {
  name: "message",
  isStatic: true,
  store: () => import(/* webpackChunkName: 'messageStore' */ "./store")
};
