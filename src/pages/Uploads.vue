<script>
import fetchUploads from '@/api/fetchUploads'

import Uploader from '@/components/Uploader'
import UploadTeaser from '@/components/UploadTeaser'

import formatFileSize from '@/util/formatFileSize'

export default {

  components: {
    Uploader,
    UploadTeaser
  },

  computed: {

    uploads () {
      return this.$store.getters.uploads
    },

    // FIXME: a view shouldn't calculate this. Can I get this from store or server?
    totalFileSize () {
      return this.uploads.reduce((totalSize, upload) => {
        return totalSize + upload.files.reduce((file) => {
          return file.size
        }, 0)
      }, 0)
    },

    formattedTotalFileSize () {
      return formatFileSize(this.totalFileSize)
    }

  },

  created () {
    this.fetchUploads()
  },

  methods: {

    async fetchUploads () {
      // Get upload data from API
      const uploads = await fetchUploads()

      // Store fetched data in store, since rendered data comes from there
      this.$store.commit('storeUploads', uploads)
    }

  }

}
</script>

<template>
  <div>
    <!-- Show total file size in header -->
    <teleport
      v-if="totalFileSize"
      to="#header-area-controls"
    >
      {{ formattedTotalFileSize }}
    </teleport>

    <!-- File list -->
    <Uploader />

    <div
      v-for="upload in uploads"
      :key="upload.id"
      class="list-item"
    >
      <UploadTeaser :upload="upload" />
    </div>
  </div>
</template>

<style scoped>

.list-item {
  margin-top: 1em;
}

</style>
