<template>
  <div class="field-counter">
    <div
      class="field-counter__action field-counter__decrement"
      v-if="withActions"
      @click.stop="decrement"
    >
      -
    </div>
    <input
      type="number"
      @input="onChangeValue"
      :value="value"
      :min="minValue"
      class="input input--small input__number field-counter__input"
    />
    <div
      class="field-counter__action field-counter__increment"
      v-if="withActions"
      @click.stop="increment"
    >
      +
    </div>
  </div>
</template>

<script>
export default {
  props: {
    value: {
      type: Number,
      default: () => 0
    },
    maxValue: {
      type: Number,
      default: () => -1
    },
    minValue: {
      type: Number,
      default: () => 0
    },
    withActions: {
      type: Boolean,
      default: () => true
    }
  },
  name: "fieldCounter",
  methods: {
    onChangeValue({ data, target }) {
      if (Number.isInteger(data)) {
        this.updateValue(target.value);
      }
    },
    validateValue(value) {
      return (
        value >= this.minValue &&
        (value <= this.maxValue || this.maxValue === -1)
      );
    },
    updateValue(value) {
      const normalizeValue = +value;

      if (this.validateValue(normalizeValue)) {
        this.$emit("input", normalizeValue);
      }
    },
    increment() {
      this.updateValue(this.value + 1);
    },
    decrement() {
      this.updateValue(this.value - 1);
    }
  }
};
</script>

<style lang="scss" scoped>
.field-counter {
  display: flex;
  justify-content: space-between;
  align-items: center;

  &__action,
  &__input {
    width: 100%;
    height: 100%;
    min-height: 100%;
  }

  &__action {
    display: block;
    background-color: #e4e4e4;
    cursor: pointer;
  }
}
</style>
