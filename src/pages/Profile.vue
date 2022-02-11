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

    // Calls the signOut routine from store.js
    onSignOut () {
      this.$store.dispatch('signOut')
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
        @click="onSignOut"
      >
        Sign out
      </ClickButton>
    </teleport>

    <!-- Avatar -->
    <div class="profile-details">
      <div class="profile-details-avatar-container">
        <img
          v-if="currentUser.avatarUrl"
          :src="currentUser.avatarUrl"
          :alt="currentUser.displayName || currentUser.email"
          :title="currentUser.displayName || currentUser.email"
          class="profile-details-avatar"
        >

        <img
          v-else
          src="../svg/user.svg"
          class="profile-details-icon"
        >
      </div>

      <!-- Details -->
      <div class="profile-details-main">
        <!-- displayName defaults to email with passwordless sign-up -->
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

.profile-details-avatar-container {
  position: relative;
  overflow: hidden;

  width: 4em;
  height: 4em;
  margin-right: var(--line-height-em);

  border-radius: 1000em;
  background-color: var(--very-dark);
}

.profile-details-avatar {
  position: absolute;
  width: 100%;
  height: 100%;
  left: 0;
  top: 0;
  object-fit: cover;
}

.profile-details-icon {
  position: absolute;
  width: 1em;
  height: 1em;
  left: 50%;
  top: 50%;
  transform: translateX(-50%) translateY(-50%);
}

.profile-details-name {
  font-size: 1.667em;
}

.options {
  text-align: center;
  color: var(--grey);
}

</style>
