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

    isSignedIn () {
      return this.$store.getters.isSignedIn
    }

  },

  mounted () {
    // The callback will run when nhost-js has successfully or unsuccessfully finished with signing the user in or out
    nhost.auth.onAuthStateChanged(() => {
      this.$store.dispatch('refreshAuthStatus')
    })

    // FIXME: bug in nhost-js forces us to manually update logged-in state
    // https://github.com/nhost/nhost-js/issues/27
    setTimeout(() => {
      this.$store.dispatch('refreshAuthStatus')
    }, 3 * 1000)
  }

}
</script>

<template>
  <div class="app">
    <div class="routed-content">
      <!-- NOTE: can be transitioned -->
      <HeaderArea
        v-if="isSignedIn"
        class="routed-content-header"
      />

      <!-- Routed content for logged-in users only -->
      <div class="routed-content-main">
        <RouterView v-if="isSignedIn" />
        <LoginScreen v-else />
      </div>
    </div>

    <!-- NOTE: can be transitioned -->
    <div
      v-if="isSignedIn"
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
  padding-bottom: calc(4 * var(--line-height-em));
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
  background-color: var(--very-dark);

  box-shadow: var(--shadow-dark-3), 0 16px 16px 4px var(--very-very-dark);
}

</style>
