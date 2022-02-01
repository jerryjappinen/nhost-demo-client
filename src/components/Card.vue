<script>
export default {
  props: {
    padding: {
      type: Boolean,
      default: false
    }
  }
}
</script>

<template>
  <div
    :class="{
      padding
    }"
    class="card"
  >
    <slot />
  </div>
</template>

<style scoped>

.card {
  background-color: var(--dark);
  border-radius: var(--radius-medium);
}

.padding {
  padding: var(--line-height-tight-em) var(--line-height-tight-em);
}

</style>
