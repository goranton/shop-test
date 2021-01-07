export const CONSTANTS = {};

export default {
  state() {
    return {
      navigation: [
        {
          id: 1,
          label: "Главная",
          routeName: "goods"
        },
        {
          id: 2,
          label: "Корзина",
          routeName: "basket"
        }
      ],
      messages: []
    };
  }
};
