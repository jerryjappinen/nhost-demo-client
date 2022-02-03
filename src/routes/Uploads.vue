<script>
import Uploader from '@/components/Uploader'
import UploadTeaser from '@/components/UploadTeaser'

import formatFileSize from '@/util/formatFileSize'
import nhost from '@/util/nhost'

export default {

  components: {
    Uploader,
    UploadTeaser
  },

  data () {
    return {

      uploadData: [],

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

  },

  created () {
    this.fetchUploads()
  },

  methods: {

    async fetchUploads () {
      const { data, error } = await nhost.graphql.request(`{
        uploads(where: {owner_user_id: {_eq: "${this.$store.getters.currentUser.id}"}}) {
          __typename
          id
          files {
            __typename
            id
            name
            mimeType
            updatedAt
          }
        }
      }`)

      if (error) {
        throw error
      }

      this.uploadData = data.uploads

      console.log(this.uploadData)
    }

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
