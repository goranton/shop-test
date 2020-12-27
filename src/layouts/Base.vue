<template>
  <div>
    <navigation :items="navigation" />
    <router-view />
  </div>
</template>

<script>
import Navigation from "../components/navigation";
import { mapState } from "vuex";
export default {
  name: "BaseLayout",
  components: { Navigation },
  computed: mapState({
    navigation: state => state.navigation ?? []
  })
};
</script>
