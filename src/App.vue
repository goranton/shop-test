<template>
  <div id="app">
    <message-resolver />
    <router-view />
  </div>
</template>

<style lang="scss">
@import "styles/global";
</style>

<script>
import MessageResolver from "./modules/message/components/message-resolver";
export default {
  name: "Application",
  components: { MessageResolver },
  methods: {
    messageListener(payload) {
      console.log(payload);
    }
  },
  mounted() {
    const [{ add }] = this.$message;
    add(this.messageListener);
  },
  beforeDestroy() {
    const [{ remove }] = this.$message;
    remove(this.messageListener);
  }
};
</script>
