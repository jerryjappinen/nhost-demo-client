<script>
import Card from '@/components/Card'
import ClickButton from '@/components/ClickButton'

export default {

  components: {
    Card,
    ClickButton
  },

  computed: {

    currentUser () {
      return this.$store.getters.currentUser
    }

  },

  methods: {

    onLogOut () {
      this.$store.dispatch('logOut')
    }

  }

}
</script>

<template>
  <div>
    <!-- Header controls -->
    <teleport to="#header-area-controls">
      <ClickButton
        color="link"
        @click="onLogOut"
      >
        Log out
      </ClickButton>
    </teleport>

    <!-- Avatar -->
    <div v-if="currentUser.avatarUrl">
      <img
        :src="currentUser.avatarUrl"
        :alt="currentUser.name || currentUser.email"
        :title="currentUser.name || currentUser.email"
        class="avatar"
      >
    </div>

    <!-- Details -->
    <div>
      <h3 v-if="currentUser.name">
        {{ currentUser.name }}
      </h3>

      <p>
        {{ currentUser.email }}
      </p>
    </div>

    <!-- Settings -->
    <Card :padding="true">
      <div>
        Default expiration
      </div>

      <div>
        Auto delete expired files
      </div>

      <div>
        Email notifications
      </div>
    </Card>

    <!-- Settings -->
    <p>
      <ClickButton disabled>
        Set Login PIN
      </ClickButton>
    </p>
  </div>
</template>

<style scoped>

.avatar {
  width: 8em;
}

</style>
