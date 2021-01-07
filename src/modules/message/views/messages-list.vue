<template>
  <div class="messages">
    <message-resolver
      v-for="{ id, type, payload } in messages"
      :key="id"
      :type="type"
      :payload="payload"
    />
  </div>
</template>

<script>
import MessageResolver from "../components/message-resolver";
export default {
  components: { MessageResolver },
  name: "messagesList"
};
</script>

<style scoped></style>
