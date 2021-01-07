export default {
  async loadItems() {
    return (
      await import(
        /* webpackChunkName: "goods" */
        "../../../assets/data.json"
      )
    )?.default;
  },
  async loadNames() {
    return (
      await import(
        /* webpackChunkName: "goods-names" */
        "../../../assets/names.json"
      )
    )?.default;
  }
};
