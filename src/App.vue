<script>
import HeaderArea from '@/components/HeaderArea'
import LoginScreen from '@/components/LoginScreen'
import MainMenu from '@/components/MainMenu'

import nhost from '@/util/nhost'

export default {

  components: {
    HeaderArea,
    LoginScreen,
    MainMenu
  },

  computed: {

    isLoggedIn () {
      return this.$store.getters.isLoggedIn
    }

  },

  mounted () {
    // Hook up to login provider
    nhost.auth.onAuthStateChanged(() => {
      this.$store.dispatch('refreshLoginStatus')
    })

    setTimeout(() => {
      console.log('Timeout')
      this.$store.dispatch('refreshLoginStatus')
    }, 5 * 1000)
  }

}
</script>

<template>
  <div class="app">
    <div class="routed-content">
      <!-- NOTE: can be transitioned -->
      <HeaderArea
        v-if="isLoggedIn"
        class="routed-content-header"
      />

      <!-- Routed content for logged-in users only -->
      <div class="routed-content-main">
        <RouterView v-if="isLoggedIn" />
        <LoginScreen v-else />
      </div>
    </div>

    <!-- NOTE: can be transitioned -->
    <div
      v-if="isLoggedIn"
      class="navigation"
    >
      <MainMenu />
    </div>
  </div>
</template>

<style>
@import url('./styles/global.css');

.routed-content {
  margin-left: auto;
  margin-right: auto;
  max-width: 26em;
  position: relative;
  z-index: 1;

  padding: var(--line-height-em);
}

/* .routed-content-header {} */

.routed-content-main {
  padding-top: calc(2 * var(--line-height-em));
  padding-bottom: calc(8 * var(--line-height-em));
}

.navigation {
  position: fixed;
  z-index: 2;

  width: calc(100% - 2em);
  max-width: 26em;
  left: 50%;
  transform: translateX(-50%);
  bottom: 1em;

  border-radius: var(--radius-medium);
  box-shadow: var(--shadow-dark-3);
  background-color: var(--very-dark);
}

</style>
