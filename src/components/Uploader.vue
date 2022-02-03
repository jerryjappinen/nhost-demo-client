<script>
import nhost from '@/util/nhost'

import Card from './Card'

export default {

  components: {
    Card
  },

  data () {
    return {
      localFiles: [],
      uploadedFiles: [],
      uploadPromises: []
    }
  },

  computed: {

    localFileCount () {
      return this.localFiles.length
    }

  },

  watch: {

    async localFiles (localFiles) {
      if (localFiles && localFiles.length) {
        await this.createUpload()

        await this.uploadAll()
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
    },

    async createUpload () {
      const { data, error } = await nhost.graphql.request(`mutation {
        insert_uploads (
          objects: [
            {
              owner_user_id: "${this.$store.getters.currentUser.id}"
            }
          ]
        ) {
          returning {
            id
          }
        }
      }`)

      if (error) {
        throw error
      }

      console.log('inserted data', data)

      return data.insert_uploads.returning[0].id
    },

    async uploadOne (localFile) {
      const { fileMetadata, error } = await nhost.storage.upload({
        file: localFile
      })

      if (error) {
        throw error
      }

      this.uploadedFiles.push(fileMetadata)

      console.log(fileMetadata)

      return fileMetadata
    },

    // async uploadOne (localFile) {
    //   const remoteFile = await nhost.storage.upload(localFile)
    //   this.uploadedFiles.push(remoteFile)
    //   return remoteFile
    // },

    async uploadAll () {
      if (this.localFiles && this.localFiles.length) {
        await Promise.all(this.localFiles.map((localFile) => {
          return this.uploadOne(localFile)
        }))

        this.localFiles = []

        console.log('Files uploaded')
      }

      return []
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
        {{ localFileCount }} files selected
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
