<script>
export default {

  props: {

    href: {
      type: String,
      default: null
    },

    to: {
      type: [Object, String],
      default: null
    },

    color: {
      type: String,
      default: 'primary'
    }

  },

  computed: {

    is () {
      if (this.to) {
        return 'router-link'
      } else if (this.href) {
        return 'a'
      }

      return 'button'
    },

    bind () {
      return {
        ...this.$attrs,
        color: undefined
      }
    }

  }

}
</script>

<template>
  <component
    :is="is"
    v-bind="bind"
    :class="{
      ['c-click-button-' + color]: !!color
    }"
    class="c-click-button"
  >
    <slot />
  </component>
</template>

<style>

.c-click-button {
  text-decoration: center;
  cursor: pointer;
}

.c-click-button-secondary,
.c-click-button-primary {
  padding: calc(var(--line-height-tight-em) / 2) var(--line-height-tight-em);
  border-radius: var(--radius-small);
}

.c-click-button-secondary,
.c-click-button-link {
  color: var(--purple-light);
}

.c-click-button-primary {
  color: var(--white);
  background-color: var(--purple);
}

</style>
