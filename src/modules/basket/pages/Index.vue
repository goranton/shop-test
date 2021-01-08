<template>
  <section class="basket">
    <header>
      <h1>Basket</h1>
    </header>
    <div class="basket__wrapper">
      <div
        class="basket-item"
        v-for="{
          id,
          count,
          data: { name, price, count: total }
        } in itemsWithData"
        :key="id"
      >
        <div class="basket-item__remove" @click="removeItem({ goodId: id })">
          x
        </div>
        <div class="basket-item__name">{{ name }}</div>
        <div class="basket-item__price">{{ price }}</div>
        <div class="basket-item__full">{{ count * price }}</div>
        <div class="basket-item__count">
          <label :for="`count${id}`">Кол-во товара</label>
          <input
            :id="`count${id}`"
            type="number"
            :min="0"
            :max="total"
            :value="count"
            @input="e => updateCounter(e, id, total)"
          />
          <button
            name="changeCount"
            @click="() => updateItem(id, total, count)"
          >
            Изменить
          </button>
        </div>
      </div>
      <footer class="basket__footer">
        <div class="basket__total">{{ totalCount }} шт.</div>
        <div class="basket__price">{{ totalPrice }}</div>
      </footer>
    </div>
  </section>
</template>

<script>
import { mapGetters, mapMutations } from "vuex";
import { GETTERS, MUTATIONS } from "../store";
import { GETTERS as GOODS_GETTERS } from "../../goods/store/constants";

export default {
  name: "BasketIndex",
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
      return this.items.reduce((result, { count }) => result + count, 0);
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
    updateItem(goodId, total, count) {
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
