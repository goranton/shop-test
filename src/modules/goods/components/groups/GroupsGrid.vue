<template>
  <div class="groups-grid">
    <grid :items="groups">
      <template v-slot:columns="{ columns }">
        <grid-column v-for="{ id, items } in columns" :key="id">
          <block-expansion
            v-for="group in items"
            :key="group.id"
            :header="group.name"
            expanded
          >
            <template v-slot:default>
              <goods-inline-list>
                <good-inline
                  v-for="item in getItems(group.id)"
                  :key="item.id"
                  :title="item.name"
                  :price="item.price"
                  :status="item.status"
                  @click.native="() => pushToBasket(item.id, item.count)"
                />
              </goods-inline-list>
            </template>
          </block-expansion>
        </grid-column>
      </template>
    </grid>
  </div>
</template>

<script>
import Grid from "../../../../components/grid";
import GridColumn from "../../../../components/grid-column";
import BlockExpansion from "../../../../components/block-expansion";
import GoodsInlineList from "../goods/GoodsInlineList";
import GoodInline from "../goods/GoodInline";
export default {
  props: {
    groups: {
      type: Array,
      default: () => []
    },
    getItems: {
      type: Function,
      default: () => () => []
    }
  },
  name: "GroupsGrid",
  components: { GoodInline, GoodsInlineList, BlockExpansion, GridColumn, Grid },
  methods: {
    pushToBasket(id, total) {
      this.$emit("push-basket", { id, total });
    }
  }
};
</script>

<style scoped></style>
