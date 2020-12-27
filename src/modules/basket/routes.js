export default [
  {
    path: "index",
    name: "basket",
    component: () =>
      import(/* webpackChunkName: 'basketIndex' */ "./pages/Index.vue")
  }
];
