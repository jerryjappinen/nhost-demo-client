<script>
import Card from '@/components/Card'
import ClickButton from '@/components/ClickButton'

import { nhostBackendUrl } from '@/config'

export default {

  components: {
    Card,
    ClickButton
  },

  data () {
    return {
      nhostBackendUrl,
      inputEmail: '',
      emailSent: false
    }
  },

  computed: {

    domain () {
      if ((typeof window) !== 'undefined') {
        return window.location.host
      }

      return ''
    },

    isLoading () {
      return this.$store.state.currentUserIsLoading
    }

  },

  methods: {

    onSubmit () {
      if (!this.isLoading) {
        this.$store.dispatch('sendLoginEmail', this.inputEmail)
        this.emailSent = true
      }
    }

  }

}
</script>

<template>
  <div>
    <img
      src="/svg/logo.svg"
      class="logo"
    >

    <Card
      :padding="true"
      class="card"
    >
      <h3 class="headline">
        <span
          v-if="emailSent"
          class="headline-info"
        >
          We sent a login link to your email
        </span>

        <template v-else-if="isLoading">
          ...
        </template>

        <template v-else>
          Please log in to continue
        </template>
      </h3>

      <form @submit.prevent="onSubmit">
        <p>
          <input
            v-model="inputEmail"
            placeholder="Enter email"
            :disabled="emailSent"
            type="email"
            name="email"
            class="input"
          >
        </p>

        <ClickButton
          :disabled="!!(isLoading || emailSent)"
          type="submit"
        >
          Send Login Link
        </ClickButton>
      </form>
    </Card>

    <!-- Disclaimer -->
    <p class="disclaimer">
      <a href="/">
        {{ domain }}
      </a>
    </p>

    <p class="disclaimer">
      {{ nhostBackendUrl }}
    </p>
  </div>
</template>

<style scoped>

.logo {
  display: block;
  height: 2em;
  margin-left: auto;
  margin-right: auto;
  margin-bottom: var(--line-height-em);
}

.card,
.disclaimer {
  text-align: center;
}

.headline {
  margin-top: 0;
}

.headline-info {
  color: var(--yellow);
}

.input {
  padding: calc(var(--line-height-tight-em) / 2) var(--line-height-tight-em);
  border-radius: var(--radius-small);
  background-color: var(--white-translucent-very-very-light);
  box-shadow: inset 0 0 1px 0 var(--white-translucent-very-very-light);
}

.input:focus,
.input:hover {
  box-shadow: inset 0 0 2px 1px var(--white-translucent-very-light);
}

.input::placeholder {
  color: var(--grey);
}

.disclaimer {
  color: var(--dark-grey);
}

</style>
