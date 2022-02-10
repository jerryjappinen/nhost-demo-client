<script>
import formatFileSize from '@/util/formatFileSize'
import formatRelativeTime from '@/util/formatRelativeTime'

export default {

  props: {
    upload: {
      type: Object,
      required: true
    }
  },

  methods: {
    formatFileSize,
    formatRelativeTime
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
    <div
      v-for="file in upload.files"
      :key="file.id"
      class="file"
    >
      <div class="file-main">
        <div>{{ file.name }}</div>
        <div>{{ formatFileSize(file.size) }}</div>
      </div>

      <div class="file-secondary">
        24 Mb
      </div>
    </div>

    <div
      v-if="upload.created_at"
      class="date"
    >
      {{ formatRelativeTime(new Date(upload.created_at)) }}
    </div>
  </router-link>
</template>

<style scoped>

.teaser {
  padding: calc(var(--line-height-em) * (2/3));
  border-radius: var(--radius-medium);
  background-color: var(--very-dark);
  display: block;
}

.date {
  text-align: right;
  font-size: var(--body-small);
  opacity: 0.4;
}



/* Each file */

.file {
  display: flex;
  align-items: center;
}

.file-main {
  flex-grow: 1;
  flex-shrink: 1;
}

.file-secondary {
  flex-grow: 0;
  flex-shrink: 0;
}

</style>
