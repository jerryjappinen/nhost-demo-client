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
      inputEmail: 'eiskis@gmail.com',
      emailSent: false
    }
  },

  computed: {

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
    <!-- Login options -->
    <div>
      <Card
        :padding="true"
        class="card"
      >
        <p>
          {{
            emailSent
              ? 'We sent a login link to your email'
              : isLoading
                ? '...'
                : 'Please log in to continue'
          }}
        </p>

        <form @submit.prevent="onSubmit">
          <p>
            <input
              v-model="inputEmail"
              placeholder="Email"
              :disabled="emailSent"
              type="email"
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
    </div>

    <!-- Disclaimer -->
    <p class="disclaimer">
      <a href="./">
        secureupload.vercel.app
      </a>
    </p>
  </div>
</template>

<style scoped>

.input {
  padding: calc(var(--line-height-tight-em) / 2) var(--line-height-tight-em);
  border-radius: var(--radius-small);
  background-color: var(--white-translucent-very-light);
}

.card,
.disclaimer {
  text-align: center;
}

</style>
