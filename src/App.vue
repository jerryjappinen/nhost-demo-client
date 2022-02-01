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
      <RouterView v-if="isLoggedIn" />
      <LoginScreen v-else />
    </div>

    <!-- NOTE: can be transitioned -->
    <div
      v-if="isLoggedIn"
      class="navigation"
    >
      <MainMenu class="navigation-content" />
    </div>
  </div>
</template>

<style>
@import url('./styles/global.css');

.routed-content {
  margin-left: auto;
  margin-right: auto;
  max-width: 24em;
  position: relative;
  z-index: 1;

  padding: var(--line-height-em) var(--line-height-em) calc(6 * var(--line-height-em)) var(--line-height-em);
}

.routed-content-header {
  margin-bottom: var(--line-height-em);
}

.navigation {
  position: fixed;
  z-index: 2;

  width: 100%;
  left: 0;
  bottom: 0;

  box-shadow: var(--shadow-dark-2);
  background-color: var(--dark);
}

</style>
