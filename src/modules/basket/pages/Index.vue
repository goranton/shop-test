<template>
  <section class="basket">
    <header>
      <h1>Basket</h1>
    </header>
    <div class="basket__wrapper">
      <basket-item
        v-for="{
          id,
          count,
          data: { name, price, count: total }
        } in itemsWithData"
        :key="id"
        :id="id"
        :name="name"
        :item-price="+price"
        :item-total="+total"
        :value="+count"
        @input="updateItem"
        @remove="removeItem"
      />
      <basket-footer :total-count="+totalCount" :total-price="+totalPrice" />
    </div>
  </section>
</template>

<script>
import { mapGetters, mapMutations } from "vuex";
import { GETTERS, MUTATIONS } from "../store";
import { GETTERS as GOODS_GETTERS } from "../../goods/store/constants";
import BasketFooter from "../components/BasketFooter";
import BasketItem from "../components/BasketItem";

export default {
  name: "BasketIndex",
  components: { BasketItem, BasketFooter },
  data() {
    return {
      counters: {}
    };
  },
  computed: {
    ...mapGetters("basket", {
      items: GETTERS.GET_ITEMS
    }),
    ...mapGetters("goods", {
      getItemsById: GOODS_GETTERS.GET_ITEMS_BY_ID
    }),
    itemsWithData() {
      return this.items.map(({ id, count }) => {
        return {
          id,
          count,
          data: this.getItemsById(id)
        };
      });
    },
    totalCount() {
      return this.items.reduce(
        (result, { count }) => result + parseInt(count),
        0
      );
    },
    totalPrice() {
      return this.itemsWithData.reduce(
        (result, { count, data: { price } }) => result + count * price,
        0
      );
    }
  },
  methods: {
    ...mapMutations("basket", {
      removeItem: MUTATIONS.REMOVE,
      _updateItem: MUTATIONS.UPDATE
    }),
    updateCounter({ target: { value } }, id, total) {
      const normalizeValue = +value;
      this.counters[id] = total > normalizeValue ? +normalizeValue : total;
    },
    updateItem({ goodId, total, count }) {
      this._updateItem({
        goodId,
        total,
        count: this.counters[goodId] ?? count
      });
    }
  }
};
</script>

<style scoped></style>
