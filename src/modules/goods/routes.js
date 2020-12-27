export default [
  {
    path: "index",
    name: "goods",
    component: () =>
      import(/* webpackChunkName: 'goodsIndex' */ "./pages/Index.vue")
  }
];
