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

    disabled: {
      type: Boolean,
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
        disabled: !!this.disabled,
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
      ['c-click-button-' + color]: color,
      ['c-click-button-' + color + '-disabled']: color && disabled,
      ['c-click-button-enabled']: !disabled,
      ['c-click-button-disabled']: disabled
    }"
    class="c-click-button"
  >
    <slot />
  </component>
</template>

<style>

.c-click-button {
  text-align: center;
}

.c-click-button-enabled {
  cursor: pointer;
}

.c-click-button-secondary,
.c-click-button-primary {
  padding: calc(var(--line-height-tight-em) / 2) var(--line-height-tight-em);
  border-radius: var(--radius-small);
}

.c-click-button-primary {
  color: var(--white);
  background-color: var(--purple);
}

.c-click-button-secondary,
.c-click-button-link {
  color: var(--purple-light);
}

.c-click-button-primary-disabled {
  color: var(--white-translucent);
}

.c-click-button-primary-secondary-disabled,
.c-click-button-link-disabled {
  color: var(--purple-translucent);
}

</style>
