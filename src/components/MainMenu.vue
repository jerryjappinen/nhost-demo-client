<script>
export default {

  data () {
    return {
      links: [

        {
          label: 'Uploads',
          to: {
            name: 'uploads'
          }
        },

        {
          label: 'Profile',
          to: {
            name: 'profile'
          }
        }

      ]
    }
  },

  methods: {

    linkIsActive (to) {
      return this.$route.name === to.name
    }

  }

}
</script>

<template>
  <div class="menu">
    <router-link
      v-for="{ label, to } in links"
      :key="label"
      :to="to"
      :class="{
        active: linkIsActive(to)
      }"
      class="link"
    >
      {{ label }}
    </router-link>
  </div>
</template>

<style scoped>

.menu {
  display: flex;
  width: 100%;
}

.link {
  flex-grow: 1;
  flex-shrink: 1;
  padding-top: 1em;
  padding-bottom: 1em;
  text-align: center;
}

.link:not(:first-child) {
  box-shadow:
    inset 0.5px 0 0 0 var(--white-translucent-very-light),
    -0.5px 0 0 0 var(--white-translucent-very-light);
}

.link:not(.active) {
  color: var(--grey);
}

</style>
