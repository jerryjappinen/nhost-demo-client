<script>
import Card from '@/components/Card'
import ClickButton from '@/components/ClickButton'

export default {

  components: {
    Card,
    ClickButton
  },

  data () {
    return {
      inputEmail: ''
    }
  },

  computed: {

    isLoggingIn () {
      return this.$store.state.isLoggingIn
    }

  },

  methods: {

    onLoginClick () {
      if (!this.isLoggingIn) {
        this.$store.dispatch('logIn')
      }
    }

  }

}
</script>

<template>
  <div>
    <p>
      {{ $store.getters.currentUser }}
    </p>

    <!-- Login options -->
    <div>
      <p>
        {{ isLoggingIn ? '...' : 'Please log in to continue' }}
      </p>

      <Card :padding="true">
        <p>
          <input
            v-bind="inputEmail"
            placeholder="Email"
          >
        </p>

        <ClickButton
          :disabled="isLoggingIn"
          @click="onLoginClick"
        >
          Send Login Link
        </ClickButton>
      </Card>
    </div>

    <!-- Disclaimer -->
    <p>
      <a href="./">
        secureupload.io
      </a>
    </p>
  </div>
</template>
