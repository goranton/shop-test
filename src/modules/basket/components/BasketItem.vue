<template>
  <div class="basket-item">
    <div class="basket-item__remove" @click="removeItem(id)">
      x
    </div>
    <div class="basket-item__name">{{ name }}</div>
    <div class="basket-item__price">{{ itemPrice }}</div>
    <div class="basket-item__full">{{ value * itemPrice }}</div>
    <div class="basket-item__count">
      <label :for="`count${id}`">Кол-во товара</label>
      <input
        :id="`count${id}`"
        type="number"
        :min="0"
        :max="itemTotal"
        v-model="counter"
      />
      <button name="changeCount" @click="updateItem">
        Изменить
      </button>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    id: {
      type: Number,
      required: true
    },
    name: {
      type: String,
      required: true
    },
    itemPrice: {
      type: Number,
      required: true
    },
    value: {
      type: Number,
      required: true
    },
    itemTotal: {
      type: Number,
      required: true
    }
  },
  name: "BasketItem",
  data() {
    return {
      counter: this.value
    };
  },
  methods: {
    removeItem() {
      this.$emit("remove", { goodId: this.id });
    },
    updateItem() {
      this.$emit("input", {
        goodId: this.id,
        total: this.total,
        count: this.counter
      });
    }
  }
};
</script>

<style scoped></style>
