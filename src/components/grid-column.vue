<template>
  <div class="grid-column">
    <slot />
  </div>
</template>

<script>
export default {
  name: "gridColumn"
};
</script>

<style lang="scss" scoped>
.grid-column {
  width: 100%;
}
</style>
