<template>
  <div class="app" id="app">
    <div class="app__configuration">
      <label for="rate">Rate delta</label>
      <input type="text" v-model="rate" id="rate" />

      <label for="period">Update period</label>
      <input
        type="text"
        v-model="updateInterval"
        id="period"
        @change="initUpdater"
      />
    </div>

    <message-list class="app__messages" :messages="messages" />
    <router-view />
  </div>
</template>

<style lang="scss">
@import "styles/global";
@import "styles/adaptive";

.app {
  &__messages {
    position: fixed;
  }
}

@include adaptive("phone") {
  .app {
    &__messages {
      width: 100px;
      bottom: 5px;
      right: 5px;
    }
  }
}

@include adaptive("tablet") {
  .app {
    &__messages {
      width: 150px;
      bottom: 10px;
      right: 10px;
    }
  }
}

@include adaptive("desktop") {
  .app {
    &__messages {
      width: 350px;
      bottom: 15px;
      right: 15px;
    }
  }
}
</style>

<script>
import { mapActions, mapMutations } from "vuex";
import { MUTATIONS } from "./modules/basket/store";
import { ACTIONS } from "./modules/goods/store/constants";
import MessageList from "./components/message-list";

export default {
  name: "Application",
  components: { MessageList },
  data() {
    return {
      messages: [],
      rate: 1,
      timer: null,
      updateInterval: 15
    };
  },
  methods: {
    ...mapActions("goods", {
      loadItems: ACTIONS.LOAD_ITEMS,
      syncProperties: ACTIONS.SYNC_PROPERTIES
    }),
    ...mapMutations("basket", {
      restoreBasket: MUTATIONS.RESTORE
    }),
    applyMessageRemoveTimer(id) {
      const { length } = this.messages;
      setTimeout(() => {
        this.$set(
          this,
          "messages",
          this.messages.filter(({ id: messageId }) => messageId !== id)
        );
      }, 1000 * length);
    },
    messageListener(message) {
      this.messages.push(message);
      this.applyMessageRemoveTimer(message.id);
    },
    initUpdater() {
      if (this.timer) {
        this.destroyUpdater();
      }

      this.timer = setInterval(() => {
        this.syncProperties(this.rate);
      }, this.updateInterval * 1000);
    },
    destroyUpdater() {
      if (this.timer) {
        clearInterval(this.timer);
      }
    }
  },
  mounted() {
    const [{ add }] = this.$message;
    add(this.messageListener);
    this.initUpdater();
  },
  beforeDestroy() {
    const [{ remove }] = this.$message;
    remove(this.messageListener);
    this.destroyUpdater();
  },
  async created() {
    await this.loadItems();
    await this.syncProperties(this.rate);
    this.restoreBasket();
  }
};
</script>
