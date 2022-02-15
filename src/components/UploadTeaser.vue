<script>
import ClickButton from '@/components/ClickButton'

import deleteFile from '@/api/deleteFile'
import deleteUpload from '@/api/deleteUpload'

import formatRelativeTime from '@/util/formatRelativeTime'

import FileTeaser from './FileTeaser'

export default {

  components: {
    ClickButton,
    FileTeaser
  },

  props: {
    upload: {
      type: Object,
      required: true
    }
  },

  computed: {

    timestampText () {
      return formatRelativeTime(new Date(this.upload.created_at))
    }

  },

  methods: {
    formatRelativeTime,

    async deleteUpload () {
      // Optimistically remove local data from store immediately
      this.$store.commit('unstoreUpload', this.upload.id)

      // Remove each file in the backend
      await Promise.all(
        this.upload.files.map((file) => {
          return deleteFile(file.id)
        })
      )

      // Remove upload object itself in the backend
      return deleteUpload(this.upload.id)
    }
  }

}
</script>

<template>
  <div class="teaser">
    <!-- List each file in the upload -->
    <FileTeaser
      v-for="file in upload.files"
      :key="file.id"
      :file="file"
      class="file"
    />

    <!-- Display upload data -->
    <div class="details">
      <div
        v-if="upload.created_at"
        class="date"
      >
        {{ timestampText }}
      </div>

      <ClickButton
        color="link"
        @click="deleteUpload"
      >
        Remove
      </ClickButton>
    </div>
  </div>
</template>

<style scoped>

.teaser {
  padding: calc(var(--line-height-em) * (2/3));
  border-radius: var(--radius-medium);
  background-color: var(--very-dark);
  display: block;
}

.file {
  margin-bottom: 1em;
}

.details {
  display: flex;
  align-items: center;
}

.date {
  flex-grow: 1;
  flex-shrink: 1;

  font-size: var(--body-small);
  color: var(--grey)
}

.date:first-letter {
  text-transform: capitalize;
}

</style>
