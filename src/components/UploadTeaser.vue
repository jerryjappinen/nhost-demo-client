<script>
import formatFileSize from '@/util/formatFileSize'

export default {

  props: {
    upload: {
      type: Object,
      required: true
    }
  },

  computed: {

    name () {
      return this.upload.name
    },

    relativeExpirationTime () {
      return '24 min'
    },

    fileSize () {
      return formatFileSize(this.upload.fileSize)
    }

  }

}
</script>

<template>
  <router-link
    :to="{
      name: 'upload',
      params: {
        uploadId: upload.id
      }
    }"
    class="teaser"
  >
    <div class="main">
      <div>{{ name }}</div>
      <div>{{ fileSize }}</div>
    </div>

    <div class="secondary">
      {{ relativeExpirationTime }}
    </div>
  </router-link>
</template>

<style scoped>

.teaser {
  display: flex;
  align-items: center;

  padding: calc(var(--line-height-em) * (2/3));

  background-color: var(--dark);
  border-radius: var(--radius-medium);
}

.main {
  flex-grow: 1;
  flex-shrink: 1;
}

</style>
