<template>
  <div>
    <groups-grid :groups="groups" :get-items="getItems" />
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { GETTERS } from "../store/constants";
import GroupsGrid from "../components/groups/GroupsGrid";

export default {
  name: "GoodsIndexPage",
  components: { GroupsGrid },
  computed: mapGetters("goods", {
    groups: GETTERS.GET_GROUPS,
    getItems: GETTERS.GET_ITEMS_FOR_GROUP
  })
};
</script>

<style scoped></style>
