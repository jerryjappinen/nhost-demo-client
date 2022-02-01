<script>
import Logo from '@/components/Logo'

export default {

  components: {
    Logo
  },

  props: {
    padding: {
      type: Boolean,
      default: false
    }
  }

}
</script>

<template>
  <div class="header-area">
    <router-link
      :to="{
        name: 'uploads'
      }"
    >
      <Logo class="logo" />
    </router-link>

    <div class="spacer" />

    <div id="header-area-controls" />
  </div>
</template>

<style scoped>

.header-area {
  display: flex;
  align-items: center;
}

.spacer {
  flex-grow: 1;
  flex-shrink: 1;
}

.logo {
  height: calc((4/3) * var(--line-height-em));
}

</style>
