<script>
import createUpload from '@/api/createUpload'
import fetchUpload from '@/api/fetchUpload'
import updateFileUploadId from '@/api/updateFileUploadId'
import uploadMultipleFiles from '@/api/uploadMultipleFiles'

import Card from './Card'


export default {

  components: {
    Card
  },

  data () {
    return {
      localFiles: [],
      uploadedFiles: [],
      isUploading: false
    }
  },

  computed: {

    localFileCount () {
      return this.localFiles.length
    },

    uploadedFileCount () {
      return this.uploadedFiles.length
    }

  },

  watch: {

    async localFiles (localFiles) {
      if (localFiles && localFiles.length) {
        // Update component state
        this.isUploading = true

        // In this app, files are attached to objects called "uploads". Let's create before upload
        let upload = await createUpload(this.$store.getters.currentUser.id)

        // Upload all files selected by user
        const uploadedFiles = await uploadMultipleFiles(localFiles)

        // Link each uploaded file to "upload" object
        const uploadedFilesWithUploadId = await Promise.all(
          uploadedFiles.map(async (uploadedFile) => {
            return updateFileUploadId(uploadedFile.id, upload.id)
          })
        )

        // Re-fetch upload object, as it now has new file ID references
        upload = await fetchUpload(upload.id)

        // Update local component state
        this.uploadedFiles = uploadedFilesWithUploadId
        this.isUploading = false

        // Update store, so other parts of the app can render the upload
        this.$store.dispatch('storeUpload', upload)
      }
    }

  },

  mounted () {
    if (this.$refs.fileInput) {
      this.$refs.fileInput.addEventListener('change', this.refreshLocalFiles)
    }
  },

  beforeUnmount () {
    if (this.$refs.fileInput) {
      this.$refs.fileInput.removeEventListener('change', this.refreshLocalFiles)
    }
  },

  methods: {

    refreshLocalFiles () {
      if (this.$refs.fileInput) {
        this.localFiles = [...this.$refs.fileInput.files]
      }
    }

  }

}
</script>

<template>
  <Card
    :padding="true"
    class="card"
  >
    <input
      ref="fileInput"
      type="file"
      multiple
      class="input"
    >

    <div class="content">
      <template v-if="localFileCount">
        {{ localFileCount }} files {{ isUploading ? 'uploading' : 'selected' }}
      </template>

      <template v-else-if="uploadedFileCount">
        {{ uploadedFileCount }} files uploaded
      </template>

      <template v-else>
        Choose files to upload
      </template>
    </div>
  </Card>
</template>

<style scoped>

.card {
  position: relative;
  cursor: pointer;
}

.input {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 2;

  opacity: 0.01;
}

.content {
  position: relative;
  z-index: 1;
  text-align: center;
  pointer-events: none;
}

</style>
