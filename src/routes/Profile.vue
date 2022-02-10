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
    },

    updateDisplayName () {}

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
    <div class="profile-details">
      <img
        v-if="currentUser.avatarUrl"
        :src="currentUser.avatarUrl"
        :alt="currentUser.displayName || currentUser.email"
        :title="currentUser.displayName || currentUser.email"
        class="profile-details-avatar"
      >

      <!-- Details -->
      <div class="profile-details-main">
        <div
          v-if="currentUser.displayName && currentUser.displayName !== currentUser.email"
          class="profile-details-name"
        >
          {{ currentUser.displayName }}
        </div>

        <div class="profile-details-email">
          {{ currentUser.email }}
        </div>
      </div>
    </div>

    <!-- Settings -->
    <Card
      :padding="true"
      class="options"
    >
      <p>This would be a great place for user preferences.</p>

      <p>
        <ClickButton
          disabled
          class="main-button"
        >
          And Buttons
        </ClickButton>
      </p>
    </Card>
  </div>
</template>

<style scoped>

.profile-details {
  display: flex;
  align-items: center;

  margin-bottom: var(--line-height-em);
}

.profile-details-avatar {
  display: block;
  margin-right: 2em;

  width: 4em;
  border-radius: 1000em;
}

.profile-details-name {
  font-size: 1.667em;
}

.options {
  text-align: center;
  color: var(--white-translucent);
}

</style>
