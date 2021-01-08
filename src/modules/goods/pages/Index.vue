<template>
  <div>
    <groups-grid
      :groups="groups"
      :get-items="getItems"
      @push-basket="pushToBasket"
    />
  </div>
</template>

<script>
import { mapGetters, mapMutations } from "vuex";
import { GETTERS } from "../store/constants";
import GroupsGrid from "../components/groups/GroupsGrid";
import { MUTATIONS } from "../../basket/store";
import { successSkeleton } from "../../../core/messageBus";

export default {
  name: "GoodsIndexPage",
  components: { GroupsGrid },
  computed: mapGetters("goods", {
    groups: GETTERS.GET_GROUPS,
    getItems: GETTERS.GET_ITEMS_FOR_GROUP
  }),
  methods: {
    ...mapMutations("basket", {
      _pushToBasket: MUTATIONS.PUSH
    }),
    pushToBasket({ id, total }) {
      // eslint-disable-next-line no-unused-vars
      const [_, notify] = this.$message;

      notify(successSkeleton("Push to basket!"));

      this._pushToBasket({
        goodId: id,
        count: 1,
        total
      });
    }
  }
};
</script>

<style scoped></style>
