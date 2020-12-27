<template>
  <div class="grid">
    <slot name="columns" v-bind="{ columnsCount, columns }" />
  </div>
</template>

<script>
import {
  DESKTOP,
  PHONE,
  TABLET,
  TABLET_LANDSCAPE
} from "../constants/adaptive";

import uuidGenerator from "short-uuid";

export default {
  props: {
    items: {
      type: Array,
      required: true
    },
    adaptive: {
      type: Array,
      default: () => [
        [PHONE, 1],
        [TABLET, 2],
        [TABLET_LANDSCAPE, 2],
        [DESKTOP, 3]
      ]
    }
  },
  name: "grid",
  data() {
    return {
      columnsCount: 1
    };
  },
  computed: {
    columns() {
      const itemsInColumn = Math.ceil(this.items.length / this.columnsCount);
      return new Array(this.columnsCount).fill([]).map((column, index) => {
        const endItemIndex = itemsInColumn * (index + 1);
        const startItemIndex = endItemIndex - itemsInColumn;

        return {
          id: uuidGenerator.generate(),
          items: this.items.slice(startItemIndex, endItemIndex)
        };
      });
    }
  },
  methods: {
    calculateColumnsCount() {
      const windowWidth = window.innerWidth;
      this.columnsCount =
        this.adaptive.find(([breakpoint]) => {
          const [min, max] = breakpoint;
          return windowWidth >= min && (windowWidth <= max || max === 0);
        })[1] ?? 1;
    }
  },
  mounted() {
    window.addEventListener("resize", this.calculateColumnsCount);
    this.calculateColumnsCount();
  },
  destroyed() {
    window.removeEventListener("resize", this.calculateColumnsCount);
  }
};
</script>

<style lang="scss" scoped>
.grid {
  display: flex;
  justify-content: space-between;
}
</style>
