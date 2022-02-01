<script>
import nhost from '@/util/nhost'

import Card from './Card'

export default {

  components: {
    Card
  },

  data () {
    return {
      files: []
    }
  },

  computed: {

    fileCount () {
      return this.files.length
    }

  },

  mounted () {
    if (this.$refs.fileInput) {
      this.$refs.fileInput.addEventListener('change', this.refreshFiles)
    }
  },

  beforeUnmount () {
    if (this.$refs.fileInput) {
      this.$refs.fileInput.removeEventListener('change', this.refreshFiles)
    }
  },

  methods: {

    refreshFiles () {
      if (this.$refs.fileInput) {
        this.files = this.$refs.fileInput.files
      }
    },

    async uploadFile () {
      await nhost.storage.upload()
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
      <template v-if="fileCount">
        {{ fileCount }} files selected
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
