<script>
import UploadTeaser from '@/components/UploadTeaser'

export default {

  components: {
    UploadTeaser
  },

  props: {
    uploadId: {
      type: String,
      required: true
    }
  },

  computed: {

    // Fake data
    upload () {
      return {
        id: this.uploadId,
        name: 'file-name.pdf',
        fileSize: 987432
      }

      // this.$store.getters.uploadsByAuthor
    }

  }

}
</script>

<template>
  <div>
    <UploadTeaser :upload="upload" />
  </div>
</template>
