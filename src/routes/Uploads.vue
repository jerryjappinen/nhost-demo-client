<script>
import Uploader from '@/components/Uploader'
import UploadTeaser from '@/components/UploadTeaser'

import formatFileSize from '@/util/formatFileSize'

export default {

  components: {
    Uploader,
    UploadTeaser
  },

  data () {
    return {

      // Fake data
      uploads: [
        {
          id: 'fake-id-345678',
          name: 'file-name.pdf',
          fileSize: 987432
        },
        {
          id: 'fake-id-987654',
          name: 'another-file.doc',
          fileSize: 15237872
        },
        {
          id: 'fake-id-987654',
          name: 'another-file.doc',
          fileSize: 15237872
        },
        {
          id: 'fake-id-987654',
          name: 'another-file.doc',
          fileSize: 15237872
        }
      ]

    }
  },

  computed: {

    // FIXME: a view shouldn't calculate this. Can I get this from store or server?
    totalFileSize () {
      return this.uploads.reduce((totalSize, upload) => {
        return totalSize + upload.fileSize
      }, 0)
    },

    formattedTotalFileSize () {
      return formatFileSize(this.totalFileSize)
    }

    // uploads () {
    //   this.$store.getters.uploadsByAuthor
    // }

  }

}
</script>

<template>
  <div>
    <!-- Show total file size in header -->
    <teleport to="#header-area-controls">
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
